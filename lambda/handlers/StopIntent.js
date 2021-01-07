function StopIntent(handlerInput) {
    const speakOutput = `Goodbye!`;
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = StopIntent;