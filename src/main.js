﻿import $ from 'jquery';

import { languageNameFromCode } from './languageList';
import { generateTitleVariations } from './titleVariations';
import { wikiDataSearch } from './wikiDataSearch';
import { openGoogleTranslateTab } from './googleTranslate';

import 'normalize.css';
import './general.css';
import './index.css';

$(function () {
    setIframeHeight();
    createEventHandlers();
});

$(window).on('resize', function () {
    setIframeHeight();
});

function createEventHandlers() {
    $('#search').on('click', search);
    $('#translate').on('click', translatePage);
    $('#wikipedia_page_iframe').on('load', iframeHasLoaded);
}

function setIframeHeight() {
    $('#wikipedia_page_iframe').height(
        $(window).height() -
            $('#header').outerHeight() -
            $('#footer').outerHeight()
    );
}

function search() {
    const searchKeywords = $('#searchKeywords').val().trim();
    const titleVariations = generateTitleVariations(searchKeywords);

    $('#languageLinks').text('Searching...');
    setIframeHeight();

    wikiDataSearch(titleVariations, displayResults);
}

function changeIframeContents($element, url) {
    $element.attr('src', 'about:blank');
    setTimeout(function () {
        $element.attr('src', url);
    }, 10);
}

function removeHightlightingOfSelectedLanguage() {
    $('a.languageLink').css('text-decoration', '');
    $('a.languageLink').css('color', '');
    $('a.languageLink').css('cursor', '');
}

function createLanguageLink(languageCode, title) {
    const url = `https://${languageCode}.wikipedia.org/wiki/${title}`;
    const $languageLink = $(
        `<a href="javascript:void(0)" class="languageLink language_${languageCode}" title=${languageNameFromCode(
            languageCode
        )}>${languageNameFromCode(languageCode)}</a>`
    );
    $languageLink.on('click', function () {
        iframeLoadCount = 0;
        $('#translate').css('visibility', '');
        changeIframeContents($('#wikipedia_page_iframe'), url);
        $('#languageCode').val(languageCode);

        removeHightlightingOfSelectedLanguage();

        $(this).css('text-decoration', 'none');
        $(this).css('color', '#DD1122');
        $(this).css('cursor', 'auto');

        $('#translate').prop('disabled', $(this).attr('title') === 'English');
    });
    return $languageLink;
}

let iframeLoadCount = 0;
function iframeHasLoaded() {
    iframeLoadCount++;
    if (iframeLoadCount > 2) {
        $('#translate').css('visibility', 'hidden');
        removeHightlightingOfSelectedLanguage();
    }
}

function displayResultsNoneFound() {
    $('#languageLinks').text(
        'No results found. (The search is sometimes case-sensitive. Try capitalising the page title exactly as in Wikipedia.)'
    );
    $('#wikipedia_page_iframe').attr('src', 'about:blank');
    $('#languageCode').val('');
}

function displayResults(results) {
    if (results.length === 0) {
        displayResultsNoneFound();
    } else {
        $('#languageLinks').empty();
        results.forEach(function (result, index) {
            const $link = createLanguageLink(result.languageCode, result.title);
            $('#languageLinks').append($link);
            if (index < results.length - 1) {
                $('#languageLinks').append(' / ');
            }
            if (result.languageCode === 'en') {
                $link.trigger('click');
            }
        });
    }

    setIframeHeight();
}

function translatePage() {
    const languageCode = $('#languageCode').val();
    openGoogleTranslateTab(
        languageCode,
        $('#wikipedia_page_iframe').attr('src')
    );
}