const data = require("../data");
const helper = require("../helper");

async function BuyCategoryIntent(handlerInput) {
    const wrongCategory = helper.getSpokenWords(handlerInput, "wrong");
    const resolvedCategory = helper.getResolvedWords(handlerInput, "category");
    let categoryName;
    let categoryId;

    if (!resolvedCategory && (wrongCategory != undefined)) {
        const locale = helper.getLocale(handlerInput);
        const unknownCategory = (await data.getRandomSpeech(data.speechTypes.UNKNOWN_CATEGORY, locale)).replace("[CATEGORY_NAME]", wrongCategory);
        const actionQuery = await data.getRandomSpeech(data.speechTypes.ACTION_QUERY, locale);

        const speakOutput = [unknownCategory, actionQuery].join(" ");

        return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(actionQuery)
        .getResponse();
    }

    categoryName = resolvedCategory[0].value.name;
    categoryId = resolvedCategory[0].value.id;

    const monetizationSC = handlerInput.serviceClientFactory.getMonetizationServiceClient();
    const ISP = await monetizationSC.getInSkillProducts(helper.getLocale(handlerInput));
    const categoryProduct = ISP.inSkillProducts.filter(record => record.referenceName === categoryName.replace(new RegExp(" ", 'g'), "_").toLowerCase());

    
    
    return handlerInput.responseBuilder
        .addDirective({
            type: "Connections.SendRequest",
            name: "Buy",
            payload: {
                InSkillProduct: {
                    productId: categoryProduct[0].productId,
                },
            },
            
            token: "correlationToken"
        })
        .getResponse();
}

module.exports = BuyCategoryIntent;