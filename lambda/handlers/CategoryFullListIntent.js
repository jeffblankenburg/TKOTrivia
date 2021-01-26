const data = require("../data");
const helper = require("../helper");

async function CategoryFullListIntent(handlerInput) {
    const categoryListIntro = await data.getRandomSpeech(data.speechTypes.CATEGORY_FULL_LIST_INTRO, helper.getLocale(handlerInput));
    let speakOutput = `${categoryListIntro}`;
    const categoryQuery = await data.getRandomSpeech(data.speechTypes.CATEGORY_QUERY, helper.getLocale(handlerInput));
    speakOutput += ` ${categoryQuery}`;
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = CategoryFullListIntent;