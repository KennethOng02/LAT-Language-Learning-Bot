'use strict'

import { imageText } from './image-text.js';
import { processTranslate } from './translate.js';

$(document).ready(function(){
    $("#analyzeButton").click(function(){
        imageText();
    });
});

$(document).ready(function(){
    //do something
    $("#transButton").click(function(){
        processTranslate();
    });
});