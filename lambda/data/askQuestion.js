const helper = require("../helper");

async function askQuestion(question, handlerInput, data, quizQuestionList = undefined, preSpeech = "") {
    let questionNumber;
    if (quizQuestionList) questionNumber = 10 - quizQuestionList.length;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const userId = sessionAttributes.user.fields.RecordId;
    const questionSpeech = await helper.buildQuestion(question, handlerInput, data, questionNumber);
    const questionInstance = await data.putQuestionInstance(question.fields.RecordId, userId, quizQuestionList[0]);
    const answerPrompt = await data.getRandomSpeech(data.speechTypes.ANSWER_PROMPT, helper.getLocale(handlerInput));

    sessionAttributes.currentQuestionId = question.fields.RecordId;
    sessionAttributes.currentQuestionInstanceId = questionInstance.fields.RecordId;
    sessionAttributes.currentQuestion = question;
    sessionAttributes.currentQuizQuestionId = quizQuestionList[0];

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

    const speakOutput = [preSpeech, questionSpeech, answerPrompt].join(" ");

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(answerPrompt)
        .addDirective(answerDirective)
        .getResponse();
}

module.exports = askQuestion;