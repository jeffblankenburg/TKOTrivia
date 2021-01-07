function getLocale(handlerInput) {
    return handlerInput.requestEnvelope.request.locale;
}

module.exports = getLocale;