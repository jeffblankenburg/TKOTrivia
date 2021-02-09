const polly = require("../polly");

function ResponseInterceptor(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    //TODO: Handle situations where a user opts to do something else instead of answering the question asked.
    // if (handlerInput.requestEnvelope.request?.type != "IntentRequest" ||
    //     handlerInput.requestEnvelope.request?.intent?.name != "QuestionIntent" ||
    //     handlerInput.requestEnvelope.request?.intent?.name != "QuizIntent") {
    //     const clearDirective = {
    //         "type": "Dialog.UpdateDynamicEntities",
    //         "updateBehavior": "CLEAR"
    //     };
    //     handlerInput.responseBuilder.addDirective(clearDirective);
    // }
    const response = handlerInput.responseBuilder.getResponse();
    handlerInput.responseBuilder.speak(polly.wrapVoice(response.outputSpeech.ssml.replace("<speak>", "").replace("</speak>", ""), polly.voices.BRIAN, polly.rates.FAST));
    sessionAttributes.previousSpeak = response.outputSpeech.ssml.replace("<speak>", "").replace("</speak>", "");
    if (response.reprompt) sessionAttributes.previousReprompt = response.reprompt.outputSpeech.ssml.replace("<speak>", "").replace("</speak>", "");
    else sessionAttributes.previousReprompt = ``;
}

module.exports = ResponseInterceptor;