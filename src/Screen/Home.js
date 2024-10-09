import React, { useState } from "react";
import "../App.css";
import { FiSearch } from "react-icons/fi";

function Home() {
  const [searchID, setSearchID] = useState("");
  const [storeID, setStoreID] = useState("");
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search/${searchID}`
      );

      if (!response.ok) {
        throw new Error("SearchID not found or an error occurred");
      }

      const data = await response.json();
      setStoreID(data.searchID);
      setUrls(data.urls);
      setSearchID("");
      setError("");
    } catch (error) {
      setError("SearchID not found or an error occurred");
      setUrls([]);
    }
  };
  return (
    <div className="App">
      <div className="findContainer">
        <h2>Store Details</h2>
        <div className="input_box">
          <input
            type="text"
            placeholder="Enter your Store Number"
            name="storenumber"
            autoComplete="storenumber"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FiSearch
            className="searchBar"
            size={35}
            onClick={handleSearch}
            color="blue"
          />
        </div>
        {error && <p>{error}</p>}
        {storeID && (
          <div className="linksContainer">
            <h3>Store ID {storeID}:</h3>
            <ul>
              {urls.map((url, index) => (
                <li key={index}>
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;