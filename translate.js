export function processTranslate(selectedValue) {
    var uriBase = "https://api.cognitive.microsofttranslator.com/translate";
    var params = {
        "api-version": "3.0",
        "to": selectedValue
    };
    //获取要翻译的文字
    var sourceTranslateText = $("#imageText").val();

    //发送翻译请求
    $.ajax({
        url: uriBase + "?" + $.param(params),
        // Request header
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey_translate);
            // 如果不是设置全域，就要加上这一行指定你所选择的区域
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Region", "eastus");
        },
        type: "POST",
        // Request body
        data: JSON.stringify([{"Text": sourceTranslateText}]),
    })
    .done(function(data) {
        //显示 JSON 内容
        $("#responseTextArea").val(JSON.stringify(data, null, 2));
        //修改下面这一行将翻译结果显示于右方
        $("#translateResult").text(data[0].translations[0].text);

    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        //丢出错误信息
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
};