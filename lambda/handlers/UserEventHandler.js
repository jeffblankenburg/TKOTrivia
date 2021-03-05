const data = require("../data");
const helper = require("../helper");

async function UserEventHandler(handlerInput) {
    const categoryId = handlerInput.requestEnvelope.request.arguments[0];
    const question = await data.getRandomQuestion(categoryId, helper.getLocale(handlerInput));
    return await data.askQuestion(question, handlerInput, data);
}

module.exports = UserEventHandler;