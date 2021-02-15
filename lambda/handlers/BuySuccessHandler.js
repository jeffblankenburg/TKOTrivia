const data = require("../data");
const helper = require("../helper");

async function BuySuccessHandler(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const categoryId = sessionAttributes.user.fields.PersistedCategory;
    const explanation = await data.getRandomSpeech(data.speechTypes.BUY_ACCEPTED, helper.getLocale(handlerInput));
    const question = await data.getRandomQuestion(categoryId, helper.getLocale(handlerInput));
    
    return await data.askQuestion(question, handlerInput, data, undefined, explanation);
}

module.exports = BuySuccessHandler;