export function imageText() {
    //確認區域與所選擇的相同或使用客製化端點網址
    var url = "https://eastus.api.cognitive.microsoft.com/";
    var uriBase = url + "vision/v3.2/read/analyze";
    
    //顯示分析的圖片
    var sourceImageUrl = document.getElementById("inputText").value;
    document.querySelector("#sourceImage").src = sourceImageUrl;

    //送出分析
    $.ajax({
        url: uriBase,

        // Request header
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey_computerVision);
        },

        type: "POST",

        // Request body
        data: JSON.stringify({url: sourceImageUrl}),
    })
    .done(function(data, textStatus, jqXHR) {
        $("#responseTextArea").val("Text submitted. " +
            "Waiting 10 seconds to retrieve the recognized text.");

        // Note: The response may not be immediately available. Text
        // recognition is an asynchronous operation that can take a variable
        // amount of time depending on the length of the text you want to
        // recognize. You may need to wait or retry the GET operation.
        //
        // Wait ten seconds before making the second REST API call.
        setTimeout(function () {
            // "Operation-Location" in the response contains the URI
            // to retrieve the recognized text.
            var operationLocation = jqXHR.getResponseHeader("Operation-Location");

            // Make the second REST API call and get the response.
            $.ajax({
                url: operationLocation,

                // Request headers.
                beforeSend: function(jqXHR){
                    jqXHR.setRequestHeader("Content-Type","application/json");
                    jqXHR.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey_computerVision);
                },

                type: "GET",
            })

            .done(function(data) {
                // Show formatted JSON on webpage.
                $("#responseTextArea").val(JSON.stringify(data, null, 2));
                $("#imageText").empty();
                for(var i = 0; i < data.analyzeResult.readResults.length; ++i) {
                    for(var j = 0; j < data.analyzeResult.readResults[i].lines.length; ++j) {
                        $("#imageText").append(data.analyzeResult.readResults[i].lines[j].text + "&#10;");
                    }
                }
            })

            .fail(function(jqXHR, textStatus, errorThrown) {
                // Display error message.
                var errorString = (errorThrown === "") ? "Error. " :
                    errorThrown + " (" + jqXHR.status + "): ";
                errorString += (jqXHR.responseText === "") ? "" :
                    (jQuery.parseJSON(jqXHR.responseText).message) ?
                        jQuery.parseJSON(jqXHR.responseText).message :
                        jQuery.parseJSON(jqXHR.responseText).error.message;
                alert(errorString);
            });
        }, 10000);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        //丟出錯誤訊息
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
};