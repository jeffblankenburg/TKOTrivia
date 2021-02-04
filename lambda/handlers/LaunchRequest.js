const data = require("../data");
const helper = require("../helper");

async function LaunchRequest(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const speechType = (sessionAttributes.user.fields.isFirstTime) ? data.speechTypes.FIRST_WELCOME : data.speechTypes.WELCOME;
    const achievementSpeech = await data.getAchievementSpeech(sessionAttributes.user, helper.getLocale(handlerInput));
    const welcome = await data.getRandomSpeech(speechType, helper.getLocale(handlerInput));
    const actionQuery = await data.getRandomSpeech(data.speechTypes.ACTION_QUERY, helper.getLocale(handlerInput));
    const speakOutput = [welcome, achievementSpeech, actionQuery].join(" ");
    
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = LaunchRequest;