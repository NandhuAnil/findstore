import React, { useState } from "react";

function UploadData() {
  const [searchID, setSearchID] = useState("");
  const [urls, setUrls] = useState([]);
  const [urlInput, setUrlInput] = useState("");

  const addUrl = () => {
    if (urlInput.trim() !== "") {
      setUrls([...urls, urlInput]);
      setUrlInput("");
    }
  };

  const handleSubmit = async () => {
    if (!searchID || urls.length === 0) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchID, urls }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setSearchID("");
        setUrls([]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error. Please try again later.");
    }
  };
  return (
    <div style={styles.main}>
      <div style={styles.container}>
        <h1 style={styles.title}>Upload Search Data</h1>
        <div style={styles.inputContainer}>
            <input
            type="text"
            placeholder="Enter Search ID"
            value={searchID}
            onChange={(e) => setSearchID(e.target.value)}
            style={styles.input}
            />
        </div>
        <div style={styles.inputContainer}>
            <input
            type="text"
            placeholder="Enter URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            style={styles.input}
            />
        </div>
        <button onClick={addUrl} style={styles.button}>
          Add URL
        </button>

        <ul style={styles.urlList}>
          {urls.map((url, index) => (
            <li key={index} style={styles.urlItem}>
              {url}
            </li>
          ))}
        </ul>

        <button onClick={handleSubmit} style={styles.submitButton}>
          Submit
        </button>
      </div>
    </div>
  );
}

const styles = {
  main: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    fontFamily: "Poppins, system-ui",
  },
  container: {
    width: "600px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "1px 8px 10px 2px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#FFFFFF",
    fontFamily: "Poppins, system-ui",
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "20px",
  },
  inputContainer: {
    width: "100%",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "0.5px solid #000",
    borderRadius: "5px",
    marginBottom: "15px"
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "5px",
    fontSize: "16px",
    border: "none",
    outline: "none",
    fontFamily: "Poppins, system-ui",
  },
  button: {
    padding: "10px 20px",
    margin: "10px 0",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontFamily: "Poppins, system-ui",
  },
  urlList: {
    listStyleType: "none",
    padding: "0",
    marginBottom: "20px",
    fontFamily: "Poppins, system-ui",
  },
  urlItem: {
    padding: "8px",
    backgroundColor: "#e0e0e0",
    marginBottom: "5px",
    borderRadius: "4px",
    fontFamily: "Poppins, system-ui",
  },
  submitButton: {
    padding: "10px 20px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
    fontFamily: "Poppins, system-ui",
  },
};

export default UploadData;
