function toTitleCase(str) {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = capitalizeFirstLetter(splitStr[i]);
    }
    return splitStr.join(' ');
}

// Try to convert title to typical capitalisation used by Wikipedia
function normalize(title) {
    return toTitleCase(title)
        .replace(/ Of The /g, ' of the ')
        .replace(/ And The /g, ' and the ')
        .replace(/ Of /g, ' of ');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateTitleVariations(searchTitle) {
    return (
        searchTitle +
        '|' +
        normalize(searchTitle) +
        '|' +
        capitalizeFirstLetter(searchTitle) +
        '|' +
        capitalizeFirstLetter(searchTitle.toLowerCase())
    );
}

export { generateTitleVariations };
