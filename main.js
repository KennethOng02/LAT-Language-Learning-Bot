'use strict'

import { imageText } from './image-text.js';
import { textToSpeech } from './text-to-speech.js';
import { processTranslate } from './translate.js';

$(document).ready(function(){
    $("#analyzeButton").click(function(){
        imageText();
    });
    $("#translateLanguage").change(function() {
        var targetLanguage = $(this).val();
        processTranslate(targetLanguage);
    });
    $("#audioPlayButton").click(function() {
        var text = document.getElementById("imageText").value;
        textToSpeech(text);
    });
});