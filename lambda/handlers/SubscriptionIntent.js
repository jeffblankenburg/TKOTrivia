const data = require("../data");
const helper = require("../helper");

async function SubscriptionIntent(handlerInput) {
    const monetizationSC = handlerInput.serviceClientFactory.getMonetizationServiceClient();
    const ISP = await monetizationSC.getInSkillProducts(helper.getLocale(handlerInput));
    const categoryProduct = ISP.inSkillProducts.filter(record => record.referenceName === "subscription");
    console.log({categoryProduct});
    if (categoryProduct.length > 0 && categoryProduct[0].entitled === "NOT_ENTITLED") {
        return handlerInput.responseBuilder
            .addDirective({
                type: "Connections.SendRequest",
                name: "Upsell",
                payload: {
                    InSkillProduct: {
                        productId: categoryProduct[0].productId,
                    },
                    //TODO: Make this a randomized and customized category message.
                    upsellMessage: await data.getRandomSpeech(data.speechTypes.SUBSCRIPTION_UPSELL, helper.getLocale(handlerInput)),
                },
                
                token: "correlationToken"
            })
            .getResponse();
    }
    
    const locale = helper.getLocale(handlerInput);
    const alreadyPurchased = await data.getRandomSpeech(data.speechTypes.ALREADY_PURCHASED, locale);
    const actionQuery = await data.getRandomSpeech(data.speechTypes.ACTION_QUERY, locale);

    const speakOutput = [alreadyPurchased, actionQuery].join(" ");

    return handlerInput.responseBuilder
    .speak(speakOutput)
    .reprompt(actionQuery)
    .getResponse();
}

module.exports = SubscriptionIntent;