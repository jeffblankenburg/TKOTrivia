function buildHandlerInputAdapter(handlerInput) {
    const sessionAttributes = handlerInput?.session?.attributes;
    return {
        voice: sessionAttributes?.user?.fields?.Voice,
        //locale: handlerInput.requestEnvelope.request.locale
    }
}

module.exports = buildHandlerInputAdapter;