import React, { useRef, useState, useEffect } from "react";
import './CSS/App.css';
import CanvasJSReact from "@canvasjs/react-charts";

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function App() {
  const [message, setMessage] = useState({
    address: "",
    date: "",
    temp: "",
    description: "",
    icon: "",
    temp_f: "",
    temp_h_c: [],
    temp_h_f: [],
    datetime_c: [],
    feelslike_c: [],
    icon_c: [],
    conditions_c: []
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

  // Weather Table section: Fixing
  // const options = {
  //   animationEnabled: true,
  //   theme: "light2",
  //   title:{
  //     text: ""
  //   },
  //   axisX:{
  //     valueFormatString: "hh",
  //     crosshair: {
  //       enabled: true,
  //       snapToDataPoint: true
  //     }
  //   },
  //   axisY: {
  //     title: "",
  //     valueFormatString: "",
  //     crosshair: {
  //       enabled: true,
  //       snapToDataPoint: true,
  //       labelFormatter: function(e) {
  //         return CanvasJS.formatNumber(e.value, "##00");
  //       }
  //     }
  //   },
  //   data: [{
  //     type: "area",
  //     xValueFormatString: "hh",
  //     yValueFormatString: "##00",
  //     dataPoints: [
  //       { x: new Date(message.datetime_c[0]), y: message.temp_h_c[0]},
  //       { x: new Date(message.datetime_c[1]), y: message.temp_h_c[1]},
  //       { x: new Date(message.datetime_c[2]), y: message.temp_h_c[2]},
  //       { x: new Date(message.datetime_c[3]), y: message.temp_h_c[3]},
  //       { x: new Date(message.datetime_c[4]), y: message.temp_h_c[4]},
  //       { x: new Date(message.datetime_c[5]), y: message.temp_h_c[5]},
  //       { x: new Date(message.datetime_c[6]), y: message.temp_h_c[6]},
  //       { x: new Date(message.datetime_c[7]), y: message.temp_h_c[7]},
  //       { x: new Date(message.datetime_c[8]), y: message.temp_h_c[8]},
  //       { x: new Date(message.datetime_c[9]), y: message.temp_h_c[9]},
  //       { x: new Date(message.datetime_c[10]), y: message.temp_h_c[10]},
  //       { x: new Date(message.datetime_c[11]), y: message.temp_h_c[11]},
  //       { x: new Date(message.datetime_c[12]), y: message.temp_h_c[12]},
  //       { x: new Date(message.datetime_c[13]), y: message.temp_h_c[13]},
  //       { x: new Date(message.datetime_c[14]), y: message.temp_h_c[14]},
  //       { x: new Date(message.datetime_c[15]), y: message.temp_h_c[15]},
  //       { x: new Date(message.datetime_c[16]), y: message.temp_h_c[16]},
  //       { x: new Date(message.datetime_c[17]), y: message.temp_h_c[17]},
  //       { x: new Date(message.datetime_c[18]), y: message.temp_h_c[18]},
  //       { x: new Date(message.datetime_c[19]), y: message.temp_h_c[19]},
  //       { x: new Date(message.datetime_c[20]), y: message.temp_h_c[20]},
  //       { x: new Date(message.datetime_c[21]), y: message.temp_h_c[21]},
  //       { x: new Date(message.datetime_c[22]), y: message.temp_h_c[22]},
  //       { x: new Date(message.datetime_c[23]), y: message.temp_h_c[23]}
  //     ]
  //   }]
  // }

  return (
    <div className="app">
      {/* <div>
        <CanvasJSChart options = {options} 
        />
      </div> */}


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