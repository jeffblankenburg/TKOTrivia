const data = require("../data");
const helper = require("../helper");

async function QuizIntent(handlerInput, preSpeech = "") {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const quiz = await data.getActiveQuiz(sessionAttributes.user.fields.RecordId);
    //TODO: WHEN WE GET TO THE FINAL QUESTION OF A QUIZ...THE WHEELS FALL OFF THE BUS.
    const categoryIdList = quiz.fields?.CategoryList.split(",");
    const quizQuestionList = quiz.fields?.QuizQuestionList.split(",");
    const question = await data.getRandomQuestion(categoryIdList[0], helper.getLocale(handlerInput));
    sessionAttributes.currentQuiz = quiz;
    return data.askQuestion(question, handlerInput, data, quizQuestionList, preSpeech);
}

module.exports = QuizIntent;