const data = require("../data");
const helper = require("../helper");

async function AnswerIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const wrongAnswer = helper.getSpokenWords(handlerInput, "wrong");
    const resolvedAnswer = helper.getResolvedWords(handlerInput, "answer");
    //console.log({resolvedCategory});
    let speakOutput;
    if (wrongAnswer) speakOutput = "Shucks, you got that wrong.  Sorry. ";
    else if (resolvedAnswer[0].value.id = sessionAttributes.currentQuestionId) {
        speakOutput = "Hooray you got that right!";
    }

    //const speakOutput = "This is the answer intent.";

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = AnswerIntent;