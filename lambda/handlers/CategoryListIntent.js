const data = require("../data");
const helper = require("../helper");

async function CategoryListIntent(handlerInput) {
    const categoryListIntro = await data.getRandomSpeech(data.speechTypes.CATEGORY_LIST_INTRO, helper.getLocale(handlerInput));
    let speakOutput = `${categoryListIntro} `;
    const categoryQuery = await data.getRandomSpeech(data.speechTypes.CATEGORY_QUERY, helper.getLocale(handlerInput));
    const categoryListPrompt = await data.getRandomSpeech(data.speechTypes.CATEGORY_FULL_LIST_PROMPT, helper.getLocale(handlerInput));
    speakOutput += `${categoryListPrompt} ${categoryQuery}`;

    if (helper.supportsAPL(handlerInput)) {
        const apl = require("../apl/category_list.json");
        const aplDirective = {
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: Math.random() * 999999,
            version: '1.5',
            document: apl
        };
        handlerInput.responseBuilder.addDirective(aplDirective)
    }

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = CategoryListIntent;