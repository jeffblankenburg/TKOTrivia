function CancelIntent(handlerInput) {
    const speakOutput = `This is the cancel intent.`;
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = CancelIntent;