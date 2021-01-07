const data = require("../data");
const helper = require("../helper");

async function LaunchRequest(handlerInput) {
    const speakOutput = await data.getRandomSpeech(data.speechTypes.WELCOME, helper.getLocale(handlerInput));
    
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = LaunchRequest;