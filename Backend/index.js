const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

const Search = require("./Model/SearchSchema");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const dbURI =
  "mongodb+srv://nandhakumar:vasavi1977@materialhandling.my1we4r.mongodb.net/UsersDB?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server connected to MongoDB");
      console.log("Server Running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.log("Unable to connect to Server and/or MongoDB", error);
  });

app.post("/api/search", async (req, res) => {
  const { searchID, urls } = req.body;

  try {
    let search = await Search.findOne({ searchID });
    if (search) {
      return res.status(400).json({ message: "SearchID already exists" });
    }

    search = new Search({
      searchID: searchID.toString(),
      urls,
    });

    await search.save();
    res.status(201).json({ message: "Search stored successfully", search });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET API to retrieve URLs by searchID
app.get("/api/search/:searchID", async (req, res) => {
  const { searchID } = req.params;

  try {
    const search = await Search.findOne({ searchID });
    if (!search) {
      return res.status(404).json({ message: "SearchID not found" });
    }

    res.status(200).json({ searchID, urls: search.urls });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});