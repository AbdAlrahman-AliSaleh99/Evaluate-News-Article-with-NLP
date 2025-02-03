var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const cors = require('cors');
const apikey = process.env.API_KEY;

app.use(express.static('dist'))
app.use(cors());
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

app.post('/submit-form', async (req, res) => {
    try {
        const { formData } = req.body; 

        const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${apikey}&lang=auto&url=${formData}&dm=s&sdg=l`, {
            method: 'POST'
        });

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error fetching MeaningCloud API:', error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
})

app.listen(8000, function () {
    console.log('Server listening on port 8000!')
})


