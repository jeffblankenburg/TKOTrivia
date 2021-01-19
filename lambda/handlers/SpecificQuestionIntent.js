const data = require("../data");
const helper = require("../helper");

async function SpecificQuestionIntent(handlerInput) {
    const questionNumber = helper.getSpokenWords(handlerInput, "question");

    const question = await data.getSpecificQuestion(questionNumber, helper.getLocale(handlerInput));
    console.log({question});
    const speakOutput = question.fields.VoiceQuestion;
    //TODO: UNIFY THE QUESTION ASKING EXPERIENCE INTO ONE CONSISTENT FUNCTION.

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = SpecificQuestionIntent;