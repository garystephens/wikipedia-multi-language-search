const googleTranslateUrl = `https://translate.google.com/translate?hl=&sl=%LANGUAGE%&tl=en&u=%URL%`;

function openGoogleTranslateTab(language, pageUrl) {
    const urlEncodedPageUrl = encodeURIComponent(pageUrl);
    window.open(
        googleTranslateUrl
            .replace(/%LANGUAGE%/, language)
            .replace(/%URL%/, urlEncodedPageUrl)
    );
}

export { openGoogleTranslateTab };
