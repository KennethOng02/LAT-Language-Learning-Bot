const speaker = new Map([
    ["zh-Hant", "zh-TW-HsiaoChenNeural"],
    ["zh_chs", "zh-CN-XiaochenNeural"],
    ["en", "en-US-AshleyNeural"],
    ["fr", "fr-FR-JacquelineNeural"],
    ["de", "de-DE-ChristophNeural"],
    ["ja", "ja-JP-MayuNeural"],
    ["ko", "ko-KR-JiMinNeural"],
    ["ru", "ru-RU-DariyaNeural"],
    ["th", "th-TH-PremwadeeNeural"],
    ["vi", "vi-VN-HoaiMyNeural"],
    ["ar", "ar-DZ-IsmaelNeural"],
    ["es","es-ES-DarioNeural"],
    ["it","it-IT-ElsaNeural"],
    ["pt","pt-BR-BrendaNeural"],
    ["zh_cht", "yue-CN-XiaoMinNeural"],
]);

export function textToSpeech(text,picture) {
    var url = "https://ej0qu6.cognitiveservices.azure.com/";
    var uriBase = url + "language/:analyze-text?api-version=2022-05-01";

    $.ajax({
        url: uriBase,

        // Request header
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey_language);
        },

        type: "POST",

        // Request body
        data: `{
            "kind": "LanguageDetection",    
            "parameters": {
                "modelVersion": "latest"
            },
            "analysisInput":{
                "documents":[
                    {
                        "id":"1",
                        "text": "${text}"
                    }
                ]
            }
        }`,
    })
    .done(function(data) {
        console.log(JSON.stringify(data, null, 2));
        console.log(data.results.documents[0].detectedLanguage.iso6391Name);
        if(picture == true)
            var language = data.results.documents[0].detectedLanguage.iso6391Name;
        else
            var language = $("#translateLanguage").val(); 
        const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey_speech, "eastus");
        speechConfig.speechSynthesisVoiceName = speaker.get(language);

        if(language == undefined) {
            speechConfig.speechSynthesisVoiceName = "zh-TW-HsiaoChenNeural";
            text = "很抱歉，尚未支援辨識此語言";
        }
        console.log(language);
        console.log(text);

        var synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);

        synthesizer.speakTextAsync(
            text, 
            function (result) {
                if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                    console.log("synthesis finished.");
                    document.querySelector('audio').src = URL.createObjectURL(
                        new Blob([result.audioData], { type: 'audio/wav' })
                    );
                }else {
                    console.error("Speech synthesis canceled, " + result.errorDetails + "\nDid you set the speech resource key and region values?");
                }
                synthesizer.close();
                synthesizer = undefined;
            },
            function (err) {
                console.trace("err - " + err);
                synthesizer.close();
                synthesizer = undefined;
            }
        );
        console.log("Now synthesizing to: " + "success");
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        //丟出錯誤訊息
        var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
        errorString += (jqXHR.responseText === "") ? "" : jQuery.parseJSON(jqXHR.responseText).message;
        alert(errorString);
    });
}