import { checkForUrl } from './urlChecker';
import { extractTextFromUrl } from './extractTextFromUrl'

const serverURL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('urlForm');
    form.addEventListener('submit', handleSubmit);
});

async function handleSubmit(event) {
    event.preventDefault();
    const formText = document.getElementById('name').value.trim();

    if (checkForUrl(formText)) {
        let result = await extractTextFromUrl(formText);

        if (result.text === '') {
            alert('Empty Result');
        }
        else {
            document.getElementById('results').innerText = 'Loading...';
            sendDataToServer(result.text);
        }
    }
    else {
        alert("Invalid Url")
    }
}

function sendDataToServer(text) {
    fetch(`${serverURL}/submit-form`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text })
    })
        .then((response) => response.json())
        .then((result) => {
            const extractedData = `Sentiment: ${result.sentiment}
                                   Content Type: ${result.sentiment}  
                                   Positive: ${result.sentiment_scores.Positive}
                                   Negative: ${result.sentiment_scores.Negative}
                                   Text: ${result.text}`;

            document.getElementById('results').innerText = extractedData;
        })
        .catch((error) => {
            alert('Something went wrong');
        });
}

export { handleSubmit };
