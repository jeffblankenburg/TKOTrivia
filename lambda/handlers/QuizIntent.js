const data = require("../data");
const helper = require("../helper");

async function QuizIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const quiz = await data.getActiveQuiz(sessionAttributes.user.fields.RecordId);
    const categoryIdList = quiz.fields.CategoryList.split(",");
    const categoryNameList = quiz.fields.CategoryNameList.split(",");
    const quizQuestionList = quiz.fields.QuizQuestionList.split(",");
    const question = await data.getRandomQuestion(categoryIdList[0], helper.getLocale(handlerInput));
    console.log({question});
    const speakOutput = await helper.buildQuestion(categoryNameList[0], question, handlerInput, data)
    const questionInstance = await data.putQuestionInstance(question.fields.RecordId, sessionAttributes.user.fields.RecordId, quizQuestionList[0]);
    
    sessionAttributes.currentQuestionId = question.fields.RecordId;
    sessionAttributes.currentQuestionInstanceId = questionInstance.fields.RecordId;
    sessionAttributes.currentQuestion = question;

    const answerDirective = {
        type: "Dialog.UpdateDynamicEntities",
        updateBehavior: "REPLACE",
        types: [
            {
                name: "Answer",
                values: [
                    helper.getSlotObject(question.fields.VoiceAnswer, question.fields.RecordId, question.fields.AnswerSynonyms)
                ]
            }
        ]
    };


    //const speechType = (sessionAttributes.user.fields.isFirstTime) ? data.speechTypes.FIRST_WELCOME : data.speechTypes.WELCOME;

    // const [achievementSpeech, welcome, actionQuery] = 
    //     await Promise.all([data.getAchievementSpeech(sessionAttributes.user, helper.getLocale(handlerInput)),
    //                        data.getRandomSpeech(speechType, helper.getLocale(handlerInput)), 
    //                        data.getRandomSpeech(data.speechTypes.ACTION_QUERY, helper.getLocale(handlerInput))]);

    // const speakOutput = [welcome, achievementSpeech, actionQuery].join(" ");

    //const speakOutput = "Would you like to play a game? ";
    
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .addDirective(answerDirective)
        .getResponse();
}

module.exports = QuizIntent;