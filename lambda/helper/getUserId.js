function getUserId(handlerInput) {
    return handlerInput.requestEnvelope?.session?.user?.userId;
}

module.exports = getUserId;