'use strict'

import { imageText } from './image-text.js';
import { processTranslate } from './translate.js';

$(document).ready(function(){
    $("#analyzeButton").click(function(){
        imageText();
    });
});

$(document).ready(function(){
    // $("#transButton").click(function(){
    //     processTranslate();
    // });
    $("#goal").change(function() {
        var selectedValue = $(this).val();
        processTranslate(selectedValue);
      });
});