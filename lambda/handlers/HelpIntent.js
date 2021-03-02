const data = require("../data");
const helper = require("../helper");

async function HelpIntent(handlerInput) {
    //const speakOutput = `This is the help intent.`;
    const help = await data.getRandomSpeech(data.speechTypes.HELP, helper.getLocale(handlerInput));
    const actionQuery = "What would you like to do?";//await data.getRandomSpeech(data.speechTypes.ACTION_QUERY, helper.getLocale(handlerInput));

    const speakOutput = [help, actionQuery].join(" ");

    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(actionQuery)
        .getResponse();
}

module.exports = HelpIntent;