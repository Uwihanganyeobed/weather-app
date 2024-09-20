const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const config = require('../config');
const translations = require('./translations');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/ussd', async (req, res) => {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;
    console.log(`Received request: ${JSON.stringify(req.body)}`);

    let response = '';
    const textArray = text.split('*');
    const userInput = textArray[textArray.length - 1];

    let language = 'en';  // default language

    if (text === '') {
        response = `CON ${translations[language].welcome}`;
    } else if (textArray[0] === '1' || textArray[0] === '2' || textArray[0] === '3') {
        // Language selection
        switch (textArray[0]) {
            case '1': language = 'en'; break;
            case '2': language = 'rw'; break;
            case '3': language = 'fr'; break;
        }

        if (textArray.length === 1) {
            response = `CON ${translations[language].enterCountry}`;
        } else if (textArray.length === 2) {
            response = `CON ${translations[language].enterCity}`;
        } else if (textArray.length === 3) {
            response = `CON ${translations[language].enterDistrict}`;
        } else if (textArray.length === 4) {
            const country = textArray[1];
            const city = textArray[2];
            const district = userInput;
            const location = `${city}, ${district}, ${country}`;
            try {
                const weather = await getWeather(location);
                response = `END ${translations[language].weather(location, weather.description, weather.temp)}`;
            } catch (error) {
                response = `END ${translations[language].error} ${location}`;
            }
        }
    } else {
        response = `END ${translations[language].invalidOption}`;
    }

    res.set('Content-Type', 'text/plain');
    res.send(response);
});

const getWeather = async (location) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${config.weatherApiKey}&units=metric`;
    const response = await axios.get(url);
    const { weather, main } = response.data;
    return {
        description: weather[0].description,
        temp: main.temp
    };
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
