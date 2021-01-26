const data = require("../data");
const helper = require("../helper");

async function AnswerIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const wrongSpokenWords = helper.getSpokenWords(handlerInput, "wrong");
    const spokenWords = helper.getSpokenWords(handlerInput, "answer");
    const resolvedAnswer = helper.getResolvedWords(handlerInput, "answer");
    let speakOutput;
    const actionQuery = await data.getRandomSpeech(data.speechTypes.ACTION_QUERY, helper.getLocale(handlerInput));
    
    if (wrongSpokenWords) {
        //let [someResult, anotherResult] = await Promise.all([someCall(), anotherCall()]);
        //let [wrongSpeechcon, wrongAnswer, actionQuery] = await Promise.all(
        if (sessionAttributes.currentQuestionInstanceId) {
            const questionInstance = await data.updateQuestionInstance(sessionAttributes.currentQuestionInstanceId, sessionAttributes.currentQuestionId, sessionAttributes.user.fields.RecordId, false, wrongSpokenWords);
            const wrongSpeechcon = await data.getRandomSpeech(data.speechTypes.SPEECHCON_WRONG, helper.getLocale(handlerInput));
            const wrongAnswer = (await data.getRandomSpeech(data.speechTypes.WRONG_ANSWER, helper.getLocale(handlerInput))).replace("[WRONG_ANSWER]", wrongSpokenWords);
            let answerNote = `The answer was ${sessionAttributes.currentQuestion.fields.VoiceAnswer}. `;
            if (sessionAttributes.currentQuestion.fields?.VoiceAnswerNote) answerNote += sessionAttributes.currentQuestion.fields.VoiceAnswerNote + ". ";
            //);
            const wrongSound = `<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_01"/>`;
            speakOutput = [wrongSound, wrongSpeechcon, wrongAnswer, answerNote, actionQuery].join(" ");
        }
        else {
            speakOutput = `I heard you say, ${wrongSpokenWords}, but I'm not sure what you want me to do. ${actionQuery}`;
        }

    } 
    else if (resolvedAnswer[0].value.id = sessionAttributes.currentQuestionId) {
        const questionInstance = await data.updateQuestionInstance(sessionAttributes.currentQuestionInstanceId, sessionAttributes.currentQuestionId, sessionAttributes.user.fields.RecordId, true, spokenWords);
        const correctSpeechcon = await data.getRandomSpeech(data.speechTypes.SPEECHCON_CORRECT, helper.getLocale(handlerInput));
        const correctAnswer = await data.getRandomSpeech(data.speechTypes.CORRECT_ANSWER, helper.getLocale(handlerInput));
        let answerNote = `The answer was ${sessionAttributes.currentQuestion.fields.VoiceAnswer}. `;
        if (sessionAttributes.currentQuestion.fields?.VoiceAnswerNote) answerNote += sessionAttributes.currentQuestion.fields.VoiceAnswerNote + ". ";
        const correctSound = `<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_01"/>`;

        speakOutput = [correctSound, correctSpeechcon, correctAnswer, answerNote, actionQuery].join(" ");
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
        .reprompt(speakOutput)
        .addDirective(clearDirective)
        .getResponse();
    
}

module.exports = AnswerIntent;