import { useState } from "react";
import "./App.css";
import { FiSearch } from "react-icons/fi";

const stores = [
  {
    storeID: 1234,
    urls: [
      "https://example1.com",
      "https://example2.com",
      "https://example3.com",
      "https://example4.com",
    ],
  },
  {
    storeID: 5678,
    urls: [
      "https://example5.com",
      "https://example6.com",
      "https://example7.com",
      "https://example8.com",
    ],
  },
  {
    storeID: 9101,
    urls: [
      "https://example9.com",
      "https://example10.com",
      "https://example11.com",
      "https://example12.com",
    ],
  },
  {
    storeID: 1121,
    urls: [
      "https://example13.com",
      "https://example14.com",
      "https://example15.com",
      "https://example16.com",
    ],
  },
  {
    storeID: 3141,
    urls: [
      "https://example17.com",
      "https://example18.com",
      "https://example19.com",
      "https://example20.com",
    ],
  },
];

function App() {
  const [storeNumber, setStoreNumber] = useState("");
  const [foundStore, setFoundStore] = useState(null);

  const handleSearch = () => {
    const store = stores.find((s) => s.storeID.toString() === storeNumber);
    setFoundStore(store);
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
            value={storeNumber}
            onChange={(e) => setStoreNumber(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <FiSearch className="searchBar" size={35} onClick={handleSearch} color="blue"/>
        </div>
        {foundStore && (
          <div className="linksContainer">
            <h3>Store ID {foundStore.storeID}:</h3>
            <ul>
              {foundStore.urls.map((url, index) => (
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

export default App;
