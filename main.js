'use strict'

import { imageText } from './image-text.js';
import { textToSpeech } from './text-to-speech.js';
import { processTranslate } from './translate.js';

$(document).ready(function(){
    $("#analyzeButton").click(function(){
        imageText();
    });
});

$(document).ready(function(){
    $("#goal").change(function() {
        var selectedValue = $(this).val();
        processTranslate(selectedValue);
      });
});

$(document).ready(function(){
    $("#playAudioButton").click(function() {
        var text = document.getElementById("imageText").value;
        textToSpeech(text);
    });
});