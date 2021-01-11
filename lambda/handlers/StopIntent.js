const data = require("../data");
const helper = require("../helper");

async function StopIntent(handlerInput) {
    const speakOutput = await data.getRandomSpeech(data.speechTypes.GOODBYE, helper.getLocale(handlerInput));
    
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .getResponse();
}

module.exports = StopIntent;