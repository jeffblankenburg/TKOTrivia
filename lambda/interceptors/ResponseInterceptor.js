const polly = require("../polly");

async function ResponseInterceptor(handlerInput) {
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


    const response = await handlerInput.responseBuilder.getResponse();
    console.log({response});
     //const outputSpeech = response.outputSpeech;
     //console.log(outputSpeech);
     //const repromptSpeech = response.reprompt.outputSpeech;
     //console.log(repromptSpeech);

    if (response?.outputSpeech?.ssml) {
        handlerInput.responseBuilder.speak(polly.wrapVoice(response.outputSpeech.ssml.replace("<speak>", "").replace("</speak>", ""), polly.voices.BRIAN, polly.rates.FAST));
        sessionAttributes.previousSpeak = response.outputSpeech.ssml.replace("<speak>", "").replace("</speak>", "");
    }
    if (response?.reprompt?.outputSpeech?.ssml) {
        sessionAttributes.previousReprompt = response.reprompt.outputSpeech.ssml.replace("<speak>", "").replace("</speak>", "");
    }
}

module.exports = ResponseInterceptor;