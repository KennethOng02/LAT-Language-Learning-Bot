'use strict'

import { imageText } from './image-text.js';
import { textToSpeech } from './speech.js';
import { processTranslate } from './translate.js';

$(document).ready(function(){
    $("#analyzeButton").click(function(){
        imageText();
    });

    $("#translateLanguage").change(async function() {
        processTranslate($(this).val());
    });

    $("#audioPlayButton").click(function() {
        
            if ($("#translateLanguage").val() == "zh-Hant")  
                textToSpeech($("#imageText").val(),true);
            else 
                textToSpeech($("#translateResult").val(),false);
            
    });
});