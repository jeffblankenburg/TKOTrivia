const data = require("../data");
const helper = require("../helper");

async function SpecificQuestionIntent(handlerInput) {
    const questionNumber = helper.getSpokenWords(handlerInput, "question");

    const question = await data.getSpecificQuestion(questionNumber, helper.getLocale(handlerInput));
    return await data.askQuestion(question, handlerInput, data);
}

module.exports = SpecificQuestionIntent;