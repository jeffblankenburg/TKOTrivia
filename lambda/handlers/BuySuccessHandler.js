async function BuySuccessHandler(handlerInput) {
    //TODO: RETRIEVE THE PERSISTED CATEGORY, AND ASK THE USER A QUESTION.
    return handlerInput.responseBuilder
        .speak("You did it!")
        .reprompt("You did it!")
        .getResponse();
}

module.exports = BuySuccessHandler;