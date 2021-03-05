const data = require("../data");
const helper = require("../helper");

async function ErrorHandler(handlerInput, error) {
    console.log(`~~~~ Error handled: ${error.stack}`);
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const stack = await data.putError(sessionAttributes.user.fields.RecordId, error.stack);
    const speakOutput = await data.getRandomSpeech(data.speechTypes.ERROR, helper.getLocale(handlerInput));

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = ErrorHandler;