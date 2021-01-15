const data = require("../data");
const helper = require("../helper");

async function AnswerIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const wrongSpokenWords = helper.getSpokenWords(handlerInput, "wrong");
    const spokenWords = helper.getSpokenWords(handlerInput, "answer");
    const resolvedAnswer = helper.getResolvedWords(handlerInput, "answer");
    let speakOutput;
    const actionQuery = await data.getRandomSpeech(data.speechTypes.ACTION_QUERY, helper.getLocale(handlerInput));
    //IF THERE WASN'T A QUESTION ASKED, WE MIGHT STILL LAND HERE.  WHAT SHOULD WE DO?
    //"I heard you say 'whatevertheysaid' and I wasn't expecting that.  This is a trivia game, what would you like to do?"
    if (wrongSpokenWords) {
        //let [someResult, anotherResult] = await Promise.all([someCall(), anotherCall()]);
        //let [wrongSpeechcon, wrongAnswer, actionQuery] = await Promise.all(
        const questionInstance = await data.updateQuestionInstance(sessionAttributes.currentQuestionInstanceId, sessionAttributes.currentQuestionId, sessionAttributes.user.fields.RecordId, false, wrongSpokenWords);
        const wrongSpeechcon = await data.getRandomSpeech(data.speechTypes.SPEECHCON_WRONG, helper.getLocale(handlerInput));
        const wrongAnswer = (await data.getRandomSpeech(data.speechTypes.WRONG_ANSWER, helper.getLocale(handlerInput))).replace("[WRONG_ANSWER]", wrongSpokenWords);
        //);
        const wrongSound = `<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_negative_response_01"/>`;
        speakOutput = [wrongSound, wrongSpeechcon, wrongAnswer, actionQuery].join(" ");

    } 
    else if (resolvedAnswer[0].value.id = sessionAttributes.currentQuestionId) {
        const questionInstance = await data.updateQuestionInstance(sessionAttributes.currentQuestionInstanceId, sessionAttributes.currentQuestionId, sessionAttributes.user.fields.RecordId, true, spokenWords);
        const correctSpeechcon = await data.getRandomSpeech(data.speechTypes.SPEECHCON_CORRECT, helper.getLocale(handlerInput));
        const correctAnswer = await data.getRandomSpeech(data.speechTypes.CORRECT_ANSWER, helper.getLocale(handlerInput));
        
        const correctSound = `<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_01"/>`;

        speakOutput = [correctSound, correctSpeechcon, correctAnswer, actionQuery].join(" ");
    }

    //CLEAR THE currentQuestionId from the SessionAttributes when we complete this step.
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
    
}

module.exports = AnswerIntent;