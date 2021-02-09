const data = require("../data");
const helper = require("../helper");

async function QuestionIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const spokenCategory = helper.getSpokenWords(handlerInput, "category");
    const wrongCategory = helper.getSpokenWords(handlerInput, "wrong");
    const resolvedCategory = helper.getResolvedWords(handlerInput, "category");

    let categoryName;
    let categoryId;
    //THEY SAID A CATEGORY WE DON'T HAVE
    if (!resolvedCategory && (wrongCategory != undefined)) {
        const wrongCategoryInstance = await data.putCategoryInstance(wrongCategory, sessionAttributes.user.fields.RecordId);
        const randomSpeech = await data.getRandomSpeech(data.speechTypes.UNKNOWN_CATEGORY, helper.getLocale(handlerInput));
        const noCategorySpeech = randomSpeech.replace("[CATEGORY_NAME]", wrongCategory);
        const actionQuery = await data.getRandomSpeech(data.speechTypes.ACTION_QUERY, helper.getLocale(handlerInput));
        return handlerInput.responseBuilder.speak(noCategorySpeech + " " + actionQuery).reprompt(actionQuery).getResponse();
    }
    //THEY ASKED FOR A RANDOM CATEGORY
    else if (!resolvedCategory && wrongCategory == undefined) {
        const categoryList = await data.getCategoryList();
        const randomCategory = helper.getRandomItem(categoryList);
        categoryName = randomCategory.fields.Name;
        categoryId = randomCategory.fields.RecordId;
    }
    //THEY MATCHED AN EXISTING CATEGORY.
    else {
        categoryName = resolvedCategory[0].value.name;
        categoryId = resolvedCategory[0].value.id;
    }
    
    const userId = sessionAttributes.user.fields.RecordId;
    const question = await data.getRandomQuestion(categoryId, helper.getLocale(handlerInput));
    
    return await data.askQuestion(question, handlerInput, data);
}

module.exports = QuestionIntent;