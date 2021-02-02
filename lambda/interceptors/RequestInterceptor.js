const data = require("../data");
const helper = require("../helper");

async function RequestInterceptor(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    //System.person.personId is the speaker identifier.
    const user = await data.getUserByUserId(helper.getUserId(handlerInput));
    if (sessionAttributes?.user?.fields?.isFirstTime) user.fields.isFirstTime = true;
    sessionAttributes.user = user;
    if (handlerInput.requestEnvelope.request?.type != "IntentRequest" || handlerInput.requestEnvelope.request?.intent?.name != "AnswerIntent") {
        sessionAttributes.currentQuestionId = undefined;
        sessionAttributes.currentQuestionInstanceId = undefined;
        sessionAttributes.currentQuestion = undefined;
    }
    //console.log({user});
};

module.exports = RequestInterceptor;