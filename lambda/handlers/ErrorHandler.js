function ErrorHandler(handlerInput) {
    console.log(`~~~~ Error handled: ${error.stack}`);
    const speakOutput = `Jeff, you broke something.`;

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = ErrorHandler;