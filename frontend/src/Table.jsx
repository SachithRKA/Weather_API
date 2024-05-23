import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Table = () => {
  // Fake temperature data for demonstration
  const temperatureData = [
    [Date.UTC(2024, 4, 1, 0), 20], // May 1, 2024, 00:00 - 20°C
    [Date.UTC(2024, 4, 1, 3), 19], // May 1, 2024, 03:00 - 19°C
    [Date.UTC(2024, 4, 1, 6), 18], // May 1, 2024, 06:00 - 18°C
    // Add more data points as needed...
  ];

  const options = {
    chart: {
      type: 'spline',
    },
    title: {
      text: 'Weather Forecast',
    },
    xAxis: {
      type: 'datetime',
      title: {
        text: 'Time',
      },
    },
    yAxis: {
      title: {
        text: 'Temperature (°C)',
      },
    },
    series: [{
      name: 'Temperature',
      data: temperatureData,
    }],
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default Table;
