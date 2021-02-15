const data = require("../data");
const helper = require("../helper");

async function BuyDeclinedHandler(handlerInput) {
    const explanation = await data.getRandomSpeech(data.speechTypes.BUY_DECLINED, helper.getLocale(handlerInput));
    const actionQuery = await data.getRandomSpeech(data.speechTypes.ACTION_QUERY, helper.getLocale(handlerInput));

    const speakOutput = [explanation, actionQuery].join(" ");
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(actionQuery)
        .getResponse();
}

module.exports = BuyDeclinedHandler;