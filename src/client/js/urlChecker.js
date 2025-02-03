function checkForUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

export { checkForUrl };
