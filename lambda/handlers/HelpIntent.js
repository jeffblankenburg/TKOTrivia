function HelpIntent(handlerInput) {
    const speakOutput = `This is the help intent.`;

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = HelpIntent;