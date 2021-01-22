const data = require("../data");
const helper = require("../helper");

async function CategoryListIntent(handlerInput) {
    let categoryList = await data.getCategoryList();
    let speakOutput = "Here are a couple of categories I'd recommend: ";
    for (let i=0; i<5; i++) {
        const position = helper.getRandom(0, categoryList.length-1);
        if (i === 4) speakOutput += " or ";
        speakOutput += (categoryList[position]).fields.Name + ", ";
        categoryList.splice(position, 1);
    }

    speakOutput += " You can always ask for the full list of categories if you want to hear all twenty of them. Which category would you like to try?";
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = CategoryListIntent;