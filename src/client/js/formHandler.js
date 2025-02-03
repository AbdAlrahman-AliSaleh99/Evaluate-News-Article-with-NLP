import { checkForUrl } from './urlChecker';

const serverURL = 'http://localhost:8000';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('urlForm');
    form.addEventListener('submit', handleSubmit);
});

function handleSubmit(event) {
    event.preventDefault();
    const formText = document.getElementById('name').value.trim();

    if (checkForUrl(formText)) {
        document.getElementById('results').innerText = 'Loading...';

        sendDataToServer(formText);
    }
    else {
        alert("Invalid Url")
    }
}

async function sendDataToServer(formText) {
    try {
        const response = await fetch(`${serverURL}/submit-form`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formData: formText }),
        });

        if (!response.ok) {
            throw new Error();
        }

        const result = await response.json();

        if (result.status?.msg === 'OK') {
            const extractedData = `Polarity: ${result.score_tag}
            Agreement: ${result.agreement}
            Subjectivity: ${result.subjectivity}
            Confidence: ${result.confidence}
            Irony: ${result.irony}`;

            document.getElementById('results').innerText = extractedData;
        } else {
            document.getElementById('results').innerText = `${result.status?.msg}`;
        }
    } catch (error) {
        document.getElementById('results').innerText = 'Error occurred, please try again later.';
    }
}

export { handleSubmit };
