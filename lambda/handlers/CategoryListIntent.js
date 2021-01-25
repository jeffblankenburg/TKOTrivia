const data = require("../data");
const helper = require("../helper");

async function CategoryListIntent(handlerInput) {
    let categoryList = await data.getCategoryList();
    const categoryListIntro = await data.getRandomSpeech(data.speechTypes.CATEGORY_LIST_INTRO, helper.getLocale(handlerInput));
    let speakOutput = `${categoryListIntro} `;
    const categoryQuery = await data.getRandomSpeech(data.speechTypes.CATEGORY_QUERY, helper.getLocale(handlerInput));
    const categoryListPrompt = await data.getRandomSpeech(data.speechTypes.CATEGORY_FULL_LIST_PROMPT, helper.getLocale(handlerInput));
    speakOutput += `${categoryListPrompt} ${categoryQuery}`;
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = CategoryListIntent;