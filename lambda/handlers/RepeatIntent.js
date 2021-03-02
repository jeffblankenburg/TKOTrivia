const data = require("../data");
const helper = require("../helper");

async function RepeatIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    let speakOutput = "";
    let repromptOutput = "";
    console.log("CURRENT QUESTION = " + JSON.stringify(sessionAttributes.currentQuestion));
    if (sessionAttributes.currentQuestion) {
        speakOutput = await data.getRandomSpeech(data.speechTypes.NO_REPEAT, helper.getLocale(handlerInput));
        repromptOutput = await data.getRandomSpeech(data.speechTypes.ANSWER_PROMPT, helper.getLocale(handlerInput));

        speakOutput = [speakOutput, repromptOutput].join(" ");
    }
    else {
        speakOutput = sessionAttributes.previousSpeak;
        repromptOutput = sessionAttributes.previousReprompt
    }

    //IF THEY HAVE A CURRENT QUESTION, MAKE THEM ANSWER THE QUESTION.  DON'T REPEAT IT.

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(repromptOutput)
        .getResponse();
}

module.exports = RepeatIntent;