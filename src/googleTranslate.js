const googleTranslateUrl = `https://translate.google.com/translate?hl=&sl=%LANGUAGE%&tl=en&u=%URL%`;

function generateGoogleTranslateURL(language, pageUrl) {
    const urlEncodedPageUrl = encodeURIComponent(pageUrl);
    return googleTranslateUrl
        .replace(/%LANGUAGE%/, language)
        .replace(/%URL%/, urlEncodedPageUrl);
}

function openGoogleTranslateTab(language, pageUrl) {
    const url = generateGoogleTranslateURL(language, pageUrl);
    openTab(url);
}

function openTab(url) {
    window.open(url);
}

export { openGoogleTranslateTab };
