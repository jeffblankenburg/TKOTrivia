const data = require("../data");
const helper = require("../helper");

async function RequestInterceptor(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    //System.person.personId is the speaker identifier.
    const user = await data.getUserByUserId(helper.getUserId(handlerInput));
    if (sessionAttributes?.user?.fields?.isFirstTime) user.fields.isFirstTime = true;
    sessionAttributes.user = user;
    //console.log({user});
};

module.exports = RequestInterceptor;