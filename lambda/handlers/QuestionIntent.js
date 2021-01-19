const data = require("../data");
const helper = require("../helper");

async function QuestionIntent(handlerInput) {
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const spokenCategory = helper.getSpokenWords(handlerInput, "category");
    const resolvedCategory = helper.getResolvedWords(handlerInput, "category");

    if (!resolvedCategory) {
        const noCategorySpeech = await data.getRandomSpeech(data.speechTypes.UNKNOWN_CATEGORY, helper.getLocale(handlerInput)).replace("[CATEGORY_NAME]", spokenCategory);
        return handlerInput.responseBuilder.speak(noCategorySpeech).reprompt(noCategorySpeech).getResponse();
    }
    const categoryName = resolvedCategory[0].value.name;
    const categoryId = resolvedCategory[0].value.id;
    const soundEffect = `<audio src="https://tko-trivia.s3.amazonaws.com/audio/${categoryName.replace(new RegExp(" ", 'g'), "_").toLowerCase()}.mp3" />`;
    const categoryIntroduction = `Here is a question from the ${categoryName} category. `;
    const holdTimer = `<audio src="https://tko-trivia.s3.amazonaws.com/audio/15secondtimer.mp3" />`;
    const question = await data.getRandomQuestion(categoryId, helper.getLocale(handlerInput));
    //TODO: We should extract everything that "constructs" a question experience into its own function.
    const questionInstance = await data.putQuestionInstance(question.fields.RecordId, sessionAttributes.user.fields.RecordId);
    const answerPrompt = await data.getRandomSpeech(data.speechTypes.ANSWER_PROMPT, helper.getLocale(handlerInput));
    //console.log({question});
    const questionSpeech = question.fields.VoiceQuestion;
    sessionAttributes.currentQuestionId = question.fields.RecordId;
    sessionAttributes.currentQuestionInstanceId = questionInstance.fields.RecordId;


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
    const speakOutput = [categoryIntroduction, soundEffect, questionSpeech, holdTimer, answerPrompt].join(" ");
    
    return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .addDirective(answerDirective)
        .getResponse();
}

module.exports = QuestionIntent;