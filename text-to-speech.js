export function textToSpeech(text,lan) {
    var SpeechSpeechSDK;
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(subscriptionKey_speech, "eastus");


    // The language of the voice that speaks.
   switch(lan)
    {
        case "zh-Hant" :
            speechConfig.speechSynthesisVoiceName = "zh-TW-HsiaoChenNeural";
            break;
        case "en" :
            speechConfig.speechSynthesisVoiceName = "en-US-AshleyNeural";
            break;
        case "fr" :
            speechConfig.speechSynthesisVoiceName = "fr-FR-JacquelineNeural";
            break;
        case "de" :
            speechConfig.speechSynthesisVoiceName = "de-DE-ChristophNeural";
            break;
        case "ja" :
            speechConfig.speechSynthesisVoiceName = "ja-JP-MayuNeural";
            break;
        case "ko" :
            speechConfig.speechSynthesisVoiceName = "ko-KR-JiMinNeural";
            break;
        case "ru" :
            speechConfig.speechSynthesisVoiceName = "ru-RU-DariyaNeural";
            break;
        case "th" :
            speechConfig.speechSynthesisVoiceName = "th-TH-PremwadeeNeural";
            break;
        case "vi" :
            speechConfig.speechSynthesisVoiceName = "vi-VN-HoaiMyNeural";
            break;
        case "ar" :
            speechConfig.speechSynthesisVoiceName = "ar-DZ-IsmaelNeural";
            break;
        case "yue" :
            speechConfig.speechSynthesisVoiceName = "zh-TW-HsiaoChenNeural";
            break;
        default :
            speechConfig.speechSynthesisVoiceName = "zh-TW-HsiaoChenNeural";
            text = "很抱歉，尚未支援辨識此語言" 
            break;
    } 

    // Create the speech synthesizer.
    var synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);

    synthesizer.speakTextAsync(
        text, 
        function (result) {
            if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                console.log("synthesis finished.");
                const blob = new Blob([result.audioData], { type: 'audio/wav' });
                document.querySelector('audio').src = URL.createObjectURL(blob);
            } else {
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
}