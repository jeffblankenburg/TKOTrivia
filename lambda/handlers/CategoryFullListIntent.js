const data = require("../data");
const helper = require("../helper");

async function CategoryFullListIntent(handlerInput) {
    let categoryList = await data.getCategoryList();
    const categoryCount = categoryList.length;
    let speakOutput = "TKO Trivia has twenty categories of questions.  They are: ";
    for (let i=0; i<categoryCount; i++) {
        const position = helper.getRandom(0, categoryList.length-1);
        if (i === categoryCount-1) speakOutput += " or ";
        speakOutput += (categoryList[position]).fields.Name + ", ";
        categoryList.splice(position, 1);
    }

    speakOutput += " Which category would you like to try?";
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .getResponse();
}

module.exports = CategoryFullListIntent;