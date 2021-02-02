const data = require("../data");
const helper = require("../helper");

async function AnswerIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const wrongSpokenWords = helper.getSpokenWords(handlerInput, "wrong");
    const spokenWords = helper.getSpokenWords(handlerInput, "answer");
    const resolvedAnswer = helper.getResolvedWords(handlerInput, "answer");
    let speakOutput, outcomeSound, speechcon, answer, answerNote;
    const actionQuery = await data.getRandomSpeech(data.speechTypes.ACTION_QUERY, helper.getLocale(handlerInput));
    
    if (wrongSpokenWords) {
        //let [someResult, anotherResult] = await Promise.all([someCall(), anotherCall()]);
        //let [wrongSpeechcon, wrongAnswer, actionQuery] = await Promise.all(
        if (sessionAttributes.currentQuestionInstanceId) {
            const questionInstance = await data.updateQuestionInstance(sessionAttributes.currentQuestionInstanceId, sessionAttributes.currentQuestionId, sessionAttributes.user.fields.RecordId, false, wrongSpokenWords);
            speechcon = await data.getRandomSpeech(data.speechTypes.SPEECHCON_WRONG, helper.getLocale(handlerInput));
            answer = (await data.getRandomSpeech(data.speechTypes.WRONG_ANSWER, helper.getLocale(handlerInput))).replace("[WRONG_ANSWER]", wrongSpokenWords);
            answerNote = `The answer was ${sessionAttributes.currentQuestion.fields.VoiceAnswer}. `;
            if (sessionAttributes.currentQuestion.fields?.VoiceAnswerNote) answerNote += sessionAttributes.currentQuestion.fields.VoiceAnswerNote + ". ";
            //);
            outcomeSound = `<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_01"/>`;
        }
        else {
            speakOutput = `I heard you say, ${wrongSpokenWords}, but I'm not sure what you want me to do. ${actionQuery}`;
        }

    } 
    else if (resolvedAnswer[0].value.id = sessionAttributes.currentQuestionId) {
        const questionInstance = await data.updateQuestionInstance(sessionAttributes.currentQuestionInstanceId, sessionAttributes.currentQuestionId, sessionAttributes.user.fields.RecordId, true, spokenWords);
        speechcon = await data.getRandomSpeech(data.speechTypes.SPEECHCON_CORRECT, helper.getLocale(handlerInput));
        answer = await data.getRandomSpeech(data.speechTypes.CORRECT_ANSWER, helper.getLocale(handlerInput));
        answerNote = `The answer was ${sessionAttributes.currentQuestion.fields.VoiceAnswer}. `;
        if (sessionAttributes.currentQuestion.fields?.VoiceAnswerNote) answerNote += sessionAttributes.currentQuestion.fields.VoiceAnswerNote + ". ";
        sessionAttributes.user.fields.CorrectCount++;
        outcomeSound = `<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_01"/>`;
    }

    const achievementSpeech = await data.getAchievementSpeech(sessionAttributes.user, helper.getLocale(handlerInput));

    if (speakOutput === undefined) {
        speakOutput = [outcomeSound, speechcon, answer, answerNote, achievementSpeech, actionQuery].join(" ");
    }

    

    // if (result.achievements && result.achievements.length > 0) {
    //     speakOutput += '<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_01"/>';
    //     if (result.achievements.length === 1) speakOutput += `<amazon:emotion name="excited" intensity="high">You got an achievement!</amazon:emotion> `;
    //     else speakOutput += `<amazon:emotion name="excited" intensity="high">You got ${result.achievements.length} achievements!</amazon:emotion> `;
    //     speakOutput += `<amazon:emotion name="excited" intensity="medium">`;
    //     result.achievements.forEach(a => speakOutput += `${a.fields.Description} You get ${a.fields.Bonus} bonus coins! `);
    //     speakOutput += `</amazon:emotion>`;
    // }

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