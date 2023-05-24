'use strict'

import { imageText } from './image-text.js';

$(document).ready(function(){
    $("#analyzeButton").click(function(){
        imageText();
    });
});
