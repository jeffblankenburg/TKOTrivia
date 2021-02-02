const polly = require("../polly");

function ResponseInterceptor(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    if (handlerInput.requestEnvelope.request?.type != "IntentRequest" || handlerInput.requestEnvelope.request?.intent?.name != "QuestionIntent") {
        const clearDirective = {
            "type": "Dialog.UpdateDynamicEntities",
            "updateBehavior": "CLEAR"
        };
        handlerInput.responseBuilder.addDirective(clearDirective);
    }
    const response = handlerInput.responseBuilder.getResponse();
    handlerInput.responseBuilder.speak(polly.wrapVoice(response.outputSpeech.ssml.replace("<speak>", "").replace("</speak>", ""), polly.voices.BRIAN, polly.rates.FAST));
    sessionAttributes.previousSpeak = response.outputSpeech.ssml.replace("<speak>", "").replace("</speak>", "");
    if (response.reprompt) sessionAttributes.previousReprompt = response.reprompt.outputSpeech.ssml.replace("<speak>", "").replace("</speak>", "");
    else sessionAttributes.previousReprompt = ``;
}

module.exports = ResponseInterceptor;