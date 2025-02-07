function extractTextFromUrl(url) {
    return fetch(`http://localhost:8000/fetch-html?url=${url}`)
        .then((response) => response.json())
        .then((result) => {
            if (result.text === 'Failed to scrape the URL') {
                alert('Failed to scrape the URL');
                return;
            }
            return result;
        });
}

export { extractTextFromUrl };
