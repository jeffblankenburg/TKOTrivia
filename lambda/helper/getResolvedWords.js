function getResolvedWords(handlerInput, slot) {
    if (handlerInput.requestEnvelope &&
        handlerInput.requestEnvelope.request &&
        handlerInput.requestEnvelope.request.intent &&
        handlerInput.requestEnvelope.request.intent.slots &&
        handlerInput.requestEnvelope.request.intent.slots[slot] &&
        handlerInput.requestEnvelope.request.intent.slots[slot].resolutions &&
        handlerInput.requestEnvelope.request.intent.slots[slot].resolutions.resolutionsPerAuthority) {
        for (var i = 0;i<handlerInput.requestEnvelope.request.intent.slots[slot].resolutions.resolutionsPerAuthority.length;i++) {
          if (
            handlerInput.requestEnvelope.request.intent.slots[slot].resolutions.resolutionsPerAuthority[i] &&
            handlerInput.requestEnvelope.request.intent.slots[slot].resolutions.resolutionsPerAuthority[i].values &&
            handlerInput.requestEnvelope.request.intent.slots[slot].resolutions.resolutionsPerAuthority[i].values[0])
            return handlerInput.requestEnvelope.request.intent.slots[slot].resolutions.resolutionsPerAuthority[i].values;
        }
      } else return undefined;
}

module.exports = getResolvedWords;