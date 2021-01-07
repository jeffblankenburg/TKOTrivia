function RepeatIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    return handlerInput.responseBuilder
        .speak(sessionAttributes.previousSpeak)
        .reprompt(sessionAttributes.previousReprompt)
        .getResponse();
}

module.exports = RepeatIntent;