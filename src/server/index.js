var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cheerio = require('cheerio');

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

app.get('/fetch-html', async (req, res) => {
    const url = req.query.url;

    fetch(url)
        .then((response) => response.text())
        .then((result) => {
            const $ = cheerio.load(result);
            const textContent = $('p').text();
            res.json({ text: textContent.slice(0, 200) });
        })
        .catch(error => {
            res.json({ text: 'Failed to scrape the URL' });
        });
});

app.post('/submit-form', (req, res) => {
    fetch(`https://kooye7u703.execute-api.us-east-1.amazonaws.com/NLPAnalyzer?key=${apikey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
        .then((response) => response.json())
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Failed to process request' });
        });
});

app.listen(8000, function () {
    console.log('Server listening on port 8000!')
})