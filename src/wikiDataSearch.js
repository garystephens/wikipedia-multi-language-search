import $ from 'jquery';
import { languageNameFromCode } from './languageList';

const WIKIDATA_SEARCH_URL = `https://www.wikidata.org/w/api.php?origin=*&action=wbgetentities&titles=%TITLE_VARIATIONS%&sites=enwiki&format=json&props=sitelinks`;

function generateWikiDataSearchUrl(titleVariations) {
    return WIKIDATA_SEARCH_URL.replace(/%TITLE_VARIATIONS%/, titleVariations);
}

function getLanguageListFromWikiData(titleVariations) {
    return new Promise((resolve) => {
        $.get({
            url: generateWikiDataSearchUrl(titleVariations),
            data: null,
            success: (wikiData) => {
                resolve(convertWikiDataToLanguageList(wikiData));
            },
        });
    });
}

function convertWikiDataToLanguageList(data) {
    const filteredEntities = filterWikiDataEntities(data.entities);
    const languageList = generateLanguageList(filteredEntities);
    const sortedLanguageList = sortLanguageListsByLanguageName(languageList);
    return sortedLanguageList;
}

// Need function name that describes what were are filtering out
function filterWikiDataEntities(entities) {
    const filteredEntities = {};
    for (let name in entities) {
        if (name[0] !== '-') {
            filteredEntities[name] = entities[name];
        }
    }
    return filteredEntities;
}

function sortLanguageListsByLanguageName(languageList) {
    return languageList.sort(function compareByLanguageName(a, b) {
        return a.languageName > b.languageName ? 1 : -1;
    });
}

function generateLanguageList(entities) {
    const languageList = [];
    for (let name in entities) {
        for (let sitelink in entities[name].sitelinks) {
            const languageCode = sitelink.replace('wiki', '');
            const title = entities[name].sitelinks[sitelink].title.replace(
                / /g,
                '_'
            );

            if (languageCode.length === 2) {
                languageList.push({
                    languageCode: languageCode,
                    languageName: languageNameFromCode(languageCode),
                    title: title,
                });
            }
        }
        break;
    }
    return languageList;
}

export { getLanguageListFromWikiData };
