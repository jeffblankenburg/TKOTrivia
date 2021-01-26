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
    const speakOutput = "This is where a question should be."; //await helper.buildQuestion(categoryName, question, handlerInput)
    const questionInstance = await data.putQuestionInstance(question.fields.RecordId, userId);
    


    sessionAttributes.currentQuestionId = question.fields.RecordId;
    sessionAttributes.currentQuestionInstanceId = questionInstance.fields.RecordId;
    sessionAttributes.currentQuestion = question;


    const answerDirective = {
        type: "Dialog.UpdateDynamicEntities",
        updateBehavior: "REPLACE",
        types: [
            {
                name: "Answer",
                values: [
                    helper.getSlotObject(question.fields.VoiceAnswer, question.fields.RecordId, question.fields.AnswerSynonyms)
                ]
            }
        ]
    };

    //console.log({answerDirective});


    //const speakOutput = await data.getRandomSpeech(data.speechTypes., helper.getLocale(handlerInput));
    //const speakOutput = categoryIntroduction + " This is the question intent.";
    //SOUND EFFECT
    //CATEGORY INTRODUCTION
    //QUESTION
    //HOLD MUSIC
    //TRAINING FOR INTERRUPTION
    //WHAT IS YOUR ANSWER?

    //IF THE USER INDICATES A CATEGORY,
        //IF THE USER OWNS THE CATEGORY, GIVE THEM THE QUESTION
        //ELSE OFFER THE USER THE ABILITY TO PURCHASE THE CATEGORY.

    //ELSE IF THE USER DOES NOT INDICATE A CATEGORY, SELECT A RANDOM CATEGORY, AND GIVE A QUESTION FROM THAT CATEGORY.
    //const speakOutput = 
    
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .addDirective(answerDirective)
        .getResponse();
}

module.exports = QuestionIntent;