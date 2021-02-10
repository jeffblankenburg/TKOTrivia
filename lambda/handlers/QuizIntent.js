const data = require("../data");
const helper = require("../helper");

async function QuizIntent(handlerInput, preSpeech = "") {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const quiz = await data.getActiveQuiz(sessionAttributes.user.fields.RecordId);

    if (quiz.fields.AskedCount < 10) {
        //TODO: WHEN WE GET TO THE FINAL QUESTION OF A QUIZ...THE WHEELS FALL OFF THE BUS.
        const categoryIdList = quiz.fields?.CategoryList.split(",");
        const quizQuestionList = quiz.fields?.QuizQuestionList.split(",");
        const question = await data.getRandomQuestion(categoryIdList[0], helper.getLocale(handlerInput));
        sessionAttributes.currentQuiz = quiz;
        console.log({quiz});
        if (quiz.fields.AskedCount === 0) {
            preSpeech = await data.getRandomSpeech(data.speechTypes.QUIZ_INTRO, helper.getLocale(handlerInput));
        }
        return data.askQuestion(question, handlerInput, data, quizQuestionList, preSpeech);
    }
    else if (quiz.fields.AskedCount === 10) {
        const actionQuery = await data.getRandomSpeech(data.speechTypes.ACTION_QUERY, helper.getLocale(handlerInput));
        let quizSummary;
        switch(quiz.fields.CorrectCount) {
            case 0:
                quizSummary = await data.getRandomSpeech(data.speechTypes.QUIZ_SUMMARY_0, helper.getLocale(handlerInput));
            break;
            case 1: case 2: case 3: case 4:
                quizSummary = (await data.getRandomSpeech(data.speechTypes.QUIZ_SUMMARY_1_4, helper.getLocale(handlerInput))).replace("[CORRECT_COUNT]", quiz.fields.CorrectCount);
            break;
            case 5: case 6: case 7:
                quizSummary = (await data.getRandomSpeech(data.speechTypes.QUIZ_SUMMARY_5_7, helper.getLocale(handlerInput))).replace("[CORRECT_COUNT]", quiz.fields.CorrectCount);
            break;
            case 8: case 9:
                quizSummary = (await data.getRandomSpeech(data.speechTypes.QUIZ_SUMMARY_8_9, helper.getLocale(handlerInput))).replace("[CORRECT_COUNT]", quiz.fields.CorrectCount);
            break;
            case 10:
                quizSummary = await data.getRandomSpeech(data.speechTypes.QUIZ_SUMMARY_10, helper.getLocale(handlerInput));
            break;
        }
        
        const speakOutput = [preSpeech, quizSummary, actionQuery].join(" ");
        const quizStatus = await data.updateQuizStatus(quiz.fields.RecordId);

        sessionAttributes.currentQuizQuestionId = undefined;
        sessionAttributes.currentQuiz = undefined;
        sessionAttributes.currentQuestionId = undefined;
        sessionAttributes.currentQuestionInstanceId = undefined;
        sessionAttributes.currentQuestion = undefined;

        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(actionQuery)
        .getResponse();
    }
}

module.exports = QuizIntent;