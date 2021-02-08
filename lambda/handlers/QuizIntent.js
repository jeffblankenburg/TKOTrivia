const data = require("../data");
const helper = require("../helper");

async function QuizIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    

    //We should start the quiz.
    //We need to select 10 random categories.
    const quiz = await data.getQuiz(sessionAttributes.user.fields.RecordId);
    //const categoryList = (helper.shuffleArray(fullCategoryList)).splice(10, 10);
    //console.log({fullCategoryList});
    //console.log({categoryList});
    //We need to select a random question from each category.
    //We need to save all of this information in a table so that we can retrieve it in the future.


    //const speechType = (sessionAttributes.user.fields.isFirstTime) ? data.speechTypes.FIRST_WELCOME : data.speechTypes.WELCOME;

    // const [achievementSpeech, welcome, actionQuery] = 
    //     await Promise.all([data.getAchievementSpeech(sessionAttributes.user, helper.getLocale(handlerInput)),
    //                        data.getRandomSpeech(speechType, helper.getLocale(handlerInput)), 
    //                        data.getRandomSpeech(data.speechTypes.ACTION_QUERY, helper.getLocale(handlerInput))]);

    // const speakOutput = [welcome, achievementSpeech, actionQuery].join(" ");

    const speakOutput = "Would you like to play a game? " + quiz;
    
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = QuizIntent;