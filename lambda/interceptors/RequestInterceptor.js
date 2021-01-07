function RequestInterceptor(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
};

module.exports = RequestInterceptor;