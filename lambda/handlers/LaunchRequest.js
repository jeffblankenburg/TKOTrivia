const data = require("../data");
const helper = require("../helper");

async function LaunchRequest(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const speechType = (sessionAttributes.user.fields.isFirstTime) ? data.speechTypes.FIRST_WELCOME : data.speechTypes.WELCOME;

    const speakOutput = await data.getRandomSpeech(speechType, helper.getLocale(handlerInput));
    
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = LaunchRequest;