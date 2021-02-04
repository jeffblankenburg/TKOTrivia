const data = require("../data");
const helper = require("../helper");

async function LaunchRequest(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const speechType = (sessionAttributes.user.fields.isFirstTime) ? data.speechTypes.FIRST_WELCOME : data.speechTypes.WELCOME;

    const [achievementSpeech, welcome, actionQuery] = 
        await Promise.all([data.getAchievementSpeech(sessionAttributes.user, helper.getLocale(handlerInput)),
                           data.getRandomSpeech(speechType, helper.getLocale(handlerInput)), 
                           data.getRandomSpeech(data.speechTypes.ACTION_QUERY, helper.getLocale(handlerInput))]);

    const speakOutput = [welcome, achievementSpeech, actionQuery].join(" ");
    
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = LaunchRequest;