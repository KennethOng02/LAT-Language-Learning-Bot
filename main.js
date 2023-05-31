'use strict'

import { imageText } from './image-text.js';
import { textToSpeech } from './text-to-speech.js';
import { processTranslate } from './translate.js';
import { languageDetection } from './language-detection.js'
var language_detected
$(document).ready(function(){
    $("#analyzeButton").click(function(){
        imageText();
    });
    $("#translateLanguage").change(async function() {
        var targetLanguage = $(this).val();
        language_detected = processTranslate(targetLanguage);
        console.log(language_detected);
    });
    $("#audioPlayButton").click(function() {
        if($("#translateLanguage").val() == "zh-Hant")
        {
            var language = language_detected;
            console.log(language);
            var text = document.getElementById("imageText").value;
        }
        else
        {
            var language = $("#translateLanguage").val();
            var text = $("#translateResult").val();
        }
        textToSpeech(text,language);
    });
});