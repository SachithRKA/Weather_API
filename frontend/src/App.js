import React, { useState, useEffect } from "react";
import './CSS/App.css';

function App() {
  const [message, setMessage] = useState({
    address: "",
    date: "",
    temp: "",
    description: "",
    icon: "",
    temp_f: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [changeTemp, setChangeTemp] = useState("");
  const [selectedUnit, setSelectedUnit] = useState("°C");

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setMessage(data);
        setLoading(false);
        setChangeTemp(data.temp);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function tempChange(unit) {
    if (unit === "°C") {
      setChangeTemp(message.temp_f);
    }
    else {
      setChangeTemp(message.temp);
    }

    setSelectedUnit(unit);
  }

  return (
    <div className="app">
      <div className="card-section">
        <div className="location">
          <span>{message.address.toUpperCase()}</span>
        </div>

        <div className="weather-card">
          <div className="icon">
            <img src={"/images/" + message.icon + ".svg"} alt="weather icon" height="100" />
          </div>

          <div className="number">
            <span>{Math.trunc(changeTemp)}</span>
          </div>

          <div className="unit">
            <button
              className={selectedUnit === "°C" ? "selected" : ""} 
              onClick={() => tempChange("°C")}>°C</button>
            <span>|</span>
            <button
              className={selectedUnit === "°F" ? "selected" : ""} 
              onClick={() => tempChange("°F")}>°F</button>
          </div>
        </div>

        <div className="weather-description">
          <span>{message.description}</span>
        </div>
      </div>
    </div>
  );
}

export default App;