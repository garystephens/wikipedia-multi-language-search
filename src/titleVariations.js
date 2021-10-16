function toTitleCase(str) {
    return str
        .toLowerCase()
        .split(' ')
        .map((word) => capitalizeFirstLetter(word))
        .join(' ');
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
