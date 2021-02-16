const data = require("../data");
const helper = require("../helper");

async function CancelSubscriptionIntent(handlerInput) {
    const monetizationSC = handlerInput.serviceClientFactory.getMonetizationServiceClient();
    const ISP = await monetizationSC.getInSkillProducts(helper.getLocale(handlerInput));
    const categoryProduct = ISP.inSkillProducts.filter(record => record.referenceName === "subscription");
    console.log({categoryProduct});
    if (categoryProduct.length > 0 && categoryProduct[0].entitled === "ENTITLED") {
        return handlerInput.responseBuilder
            .addDirective({
                type: "Connections.SendRequest",
                name: "Cancel",
                payload: {
                    InSkillProduct: {
                        productId: categoryProduct[0].productId,
                    },
                },
                
                token: "correlationToken"
            })
            .getResponse();
    }
    
    const locale = helper.getLocale(handlerInput);
    const notEntitled = await data.getRandomSpeech(data.speechTypes.DO_NOT_OWN_SUBSCRIPTION, locale);
    const actionQuery = await data.getRandomSpeech(data.speechTypes.ACTION_QUERY, locale);

    const speakOutput = [notEntitled, actionQuery].join(" ");

    return handlerInput.responseBuilder
    .speak(speakOutput)
    .reprompt(actionQuery)
    .getResponse();
}

module.exports = CancelSubscriptionIntent;