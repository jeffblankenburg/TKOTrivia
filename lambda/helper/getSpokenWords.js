function getSpokenWords(handlerInput, slot) {
    if (handlerInput.requestEnvelope &&
        handlerInput.requestEnvelope.request &&
        handlerInput.requestEnvelope.request.intent &&
        handlerInput.requestEnvelope.request.intent.slots &&
        handlerInput.requestEnvelope.request.intent.slots[slot] &&
        handlerInput.requestEnvelope.request.intent.slots[slot].value) {
            return handlerInput.requestEnvelope.request.intent.slots[slot].value;
        }
  else return undefined;
}

module.exports = getSpokenWords;