const Alexa = require(`ask-sdk-core`);

function IntentReflector(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}.  You haven't created the handler for it yet.`;

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = IntentReflector;