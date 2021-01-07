function SessionEndedRequest(handlerInput) {
    // Any cleanup logic goes here.
    return handlerInput.responseBuilder.getResponse();
}

module.exports = SessionEndedRequest;