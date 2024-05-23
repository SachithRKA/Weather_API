import express from 'express';
import cors from 'cors';
import axios from "axios";

const app = express();
const port = 8000;

const API_KEY = process.env.API_KEY;
const API_URL_C = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/toronto?unitGroup=metric&key=3QD92WMMYMNMWB8J3VLXHT4XU&contentType=json"
const API_URL_F = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/toronto?unitGroup=us&key=3QD92WMMYMNMWB8J3VLXHT4XU&contentType=json"
const API_URL_Hours = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/toronto/2024-05-22?unitGroup=metric&key=3QD92WMMYMNMWB8J3VLXHT4XU&include=hours&contentType=json"
const API_URL_Hours_f = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/toronto/2024-05-22?unitGroup=us&key=3QD92WMMYMNMWB8J3VLXHT4XU&include=hours&contentType=json"

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));

app.get('/', async (req, res) => {
    try {
        const [result, result_f, result_c, result_h_f] = await Promise.all([
            axios.get(API_URL_C),
            axios.get(API_URL_F),
            axios.get(API_URL_Hours),
            axios.get(API_URL_Hours_f)
        ]);

        const data_c = result.data;
        const data_f = result_f.data;
        const data_hours = result_c.data;
        const data_hours_f = result_h_f.data

        const address = data_c.address;
        const date = data_c.days[0].datetime;
        const temp = data_c.days[0].temp;
        const description = data_c.days[0].conditions;
        const icon = data_c.days[0].icon;
        const temp_f = data_f.days[0].temp;

        const temp_h_c = data_hours.days[0].hours.map(hour => hour.temp);
        const temp_h_f = data_hours_f.days[0].hours.map(hour => hour.temp);
        const datetime_c = data_hours.days[0].hours.map(hour => hour.datetime);
        const feelslike_c = data_hours.days[0].hours.map(hour => hour.feelslike);
        const icon_c = data_hours.days[0].hours.map(hour => hour.icon);
        const conditions_c = data_hours.days[0].hours.map(hour => hour.conditions);

        console.log(temp_h_f);

        res.json({ address, date, temp, description, icon, temp_f, temp_h_c, temp_h_f, datetime_c, feelslike_c, icon_c, conditions_c})
    } catch (error) {
        res.status(500).send("Error while fetching data")
    }
});

app.listen(port, () => {
    console.log('Sever listening on port 8000')
})