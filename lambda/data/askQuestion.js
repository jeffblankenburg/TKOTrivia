const helper = require("../helper");

async function askQuestion(question, handlerInput, data, quizQuestionList = undefined, preSpeech = "") {
    let questionNumber;
    if (quizQuestionList) questionNumber = 11 - quizQuestionList.length;
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const userId = sessionAttributes.user.fields.RecordId;
    let quizQuestion = undefined;
    if (quizQuestionList) {
        quizQuestion = quizQuestionList[0];
        //sessionAttributes.currentQuiz.fields.AskedCount++;
    } 

    const [questionSpeech, questionInstance, answerPrompt] = 
        await Promise.all([helper.buildQuestion(question, handlerInput, data, questionNumber),
                           data.putQuestionInstance(question.fields.RecordId, userId, quizQuestion), 
                           data.getRandomSpeech(data.speechTypes.ANSWER_PROMPT, helper.getLocale(handlerInput))]);

    sessionAttributes.currentQuestionId = question.fields.RecordId;
    sessionAttributes.currentQuestionInstanceId = questionInstance.fields.RecordId;
    sessionAttributes.currentQuestion = question;
    sessionAttributes.currentQuizQuestionId = quizQuestion;

    const categoryName = question.fields.Category[0];
    const categoryPath = categoryName.replace(new RegExp(" ", 'g'), "_").toLowerCase();
    const imageURL = `https://tko-trivia.s3.amazonaws.com/art/icons/${categoryPath}_512.png`;

    if (helper.supportsAPL(handlerInput)) {
        const apl = require("../apl/question.json");
        let aplData = require("../apl/question_data.json");
        
        const questionScreenText = question.fields.ScreenQuestion;
        
        aplData.longTextTemplateData.properties.backgroundImage.sources[0].url = imageURL;
        aplData.longTextTemplateData.properties.title = categoryName;
        aplData.longTextTemplateData.properties.textContent.questionText.text = questionScreenText;
        aplData.longTextTemplateData.properties.textContent.answerText.text = "";
        const aplDirective = {
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: '[SkillProvidedToken]',
            version: '1.5',
            document: apl,
            datasources: aplData
        }; 
        handlerInput.responseBuilder.addDirective(aplDirective)
    }
    else {
        const questionCardText = question.fields.CardQuestion;
        handlerInput.responseBuilder.withStandardCard(categoryName, questionCardText, imageURL, imageURL);
    }



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