const data = require("../data");
const helper = require("../helper");
const QuizIntent = require("./QuizIntent");

async function AnswerIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const wrongSpokenWords = helper.getSpokenWords(handlerInput, "wrong");
    const spokenWords = helper.getSpokenWords(handlerInput, "answer");
    const resolvedAnswer = helper.getResolvedWords(handlerInput, "answer");
    let speakOutput, outcomeSound, speechcon, answer, answerNote;
    const actionQuery = await data.getRandomSpeech(data.speechTypes.ACTION_QUERY, helper.getLocale(handlerInput));
    const locale = helper.getLocale(handlerInput);

    if (wrongSpokenWords) {
        //let [someResult, anotherResult] = await Promise.all([someCall(), anotherCall()]);
        //let [wrongSpeechcon, wrongAnswer, actionQuery] = await Promise.all(
        if (sessionAttributes.currentQuestionInstanceId) {
            const questionInstance = await data.updateQuestionInstance(sessionAttributes.currentQuestionInstanceId, sessionAttributes.currentQuestionId, sessionAttributes.user.fields.RecordId, false, wrongSpokenWords);
            speechcon = await data.getRandomSpeech(data.speechTypes.SPEECHCON_WRONG, helper.getLocale(handlerInput));
            answer = (await data.getRandomSpeech(data.speechTypes.WRONG_ANSWER, locale)).replace("[WRONG_ANSWER]", wrongSpokenWords);
            answerNote = (await data.getRandomSpeech(data.speechTypes.ANSWER_REVEAL, locale)).replace("[ANSWER]", sessionAttributes.currentQuestion.fields.VoiceAnswer);
            if (sessionAttributes.currentQuestion.fields?.VoiceAnswerNote) answerNote += sessionAttributes.currentQuestion.fields.VoiceAnswerNote + ". ";
            outcomeSound = await data.getRandomSpeech(data.speechTypes.SOUND_WRONG_ANSWER, locale);
        }
        else {
            speakOutput = `${(await data.getRandomSpeech(data.speechTypes.ANSWER_CONFUSED, locale)).replace("[WRONG_WORDS]", wrongSpokenWords)} ${actionQuery}`;
        }

    }
    else if (resolvedAnswer[0].value.id == sessionAttributes.currentQuestionId) {
        const questionInstance = await data.updateQuestionInstance(sessionAttributes.currentQuestionInstanceId, sessionAttributes.currentQuestionId, sessionAttributes.user.fields.RecordId, true, spokenWords);
        speechcon = await data.getRandomSpeech(data.speechTypes.SPEECHCON_CORRECT, helper.getLocale(handlerInput));
        answer = await data.getRandomSpeech(data.speechTypes.CORRECT_ANSWER, helper.getLocale(handlerInput));
        answerNote = (await data.getRandomSpeech(data.speechTypes.ANSWER_REVEAL, locale)).replace("[ANSWER]", sessionAttributes.currentQuestion.fields.VoiceAnswer);
        if (sessionAttributes.currentQuestion.fields?.VoiceAnswerNote) answerNote += sessionAttributes.currentQuestion.fields.VoiceAnswerNote + ". ";
        sessionAttributes.user.fields.CorrectCount++;
        outcomeSound = await data.getRandomSpeech(data.speechTypes.SOUND_CORRECT_ANSWER, helper.getLocale(handlerInput));;
    }

    sessionAttributes.user.fields.AnswerCount++;

    const achievementSpeech = await data.getAchievementSpeech(sessionAttributes.user, helper.getLocale(handlerInput), question.fields.Category[0]);

    if (speakOutput === undefined) {
        speakOutput = [outcomeSound, speechcon, answer, answerNote, achievementSpeech].join(" ");
        if (sessionAttributes.currentQuizQuestionId) {
            //TODO: WHAT DO WE DO WHEN THEY ANSWERED THE LAST QUESTION IN THE QUIZ?
            return QuizIntent(handlerInput, speakOutput);
        }
        else speakOutput = [outcomeSound, speechcon, answer, answerNote, achievementSpeech, actionQuery].join(" ");

        if (helper.supportsAPL(handlerInput)) {
            const question = sessionAttributes.currentQuestion;
            const categoryName = question.fields.Category[0];
            const categoryPath = categoryName.replace(new RegExp(" ", 'g'), "_").toLowerCase();
            const imageURL = "";//question.fields.Image[0].url;//`https://tko-trivia.s3.amazonaws.com/art/icons/${categoryPath}_512.png`;
    
            const apl = require("../apl/question.json");
            let aplData = require("../apl/question_data.json");
    
            //const answerScreenText = question.fields.ScreenAnswer;
    
            //aplData.longTextTemplateData.properties.backgroundImage.sources[0].url = imageURL;
            aplData.longTextTemplateData.properties.title = categoryName;
            aplData.longTextTemplateData.properties.textContent.questionText.text = question.fields.ScreenQuestion;
            aplData.longTextTemplateData.properties.textContent.answerText.text = question.fields.ScreenAnswer;
    
            if (wrongSpokenWords && handlerInput.requestEnvelope.context.Extensions.available["alexaext:smartmotion:10"]) {
                console.log("ADDING SMART MOTION COMMAND.");
                apl.extensions = [{"name": "SmartMotion","uri": "alexaext:smartmotion:10"}];
                apl.onMount = [{"type": "SmartMotion:PlayNamedChoreo", "sequencer": "myCustomSequencer", "delay": 500, "name": "ScreenImpactCenter" }];
            }
    
            const aplDirective = {
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: Math.random() * 999999,
                version: '1.5',
                document: apl,
                datasources: aplData,
            };
            handlerInput.responseBuilder.addDirective(aplDirective)
        }
        else {
            //const questionCardText = question.fields.CardQuestion;
            //handlerInput.responseBuilder.withStandardCard(categoryName, questionCardText, imageURL, imageURL);
        }
    }

    sessionAttributes.currentQuestionId = undefined;
    sessionAttributes.currentQuestionInstanceId = undefined;
    sessionAttributes.currentQuestion = undefined;
    const clearDirective = {
        "type": "Dialog.UpdateDynamicEntities",
        "updateBehavior": "CLEAR"
    };

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(actionQuery)
        .addDirective(clearDirective)
        .getResponse();

}

module.exports = AnswerIntent;