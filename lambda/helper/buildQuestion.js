//const data = require("../data");
const getRandomSpeech = require("../data/getRandomSpeech");
const speechTypes = require("../data/speechTypes");
const getLocale = require("./getLocale")

async function buildQuestion(categoryName, question, handlerInput) {
    const soundEffect = `<audio src="https://tko-trivia.s3.amazonaws.com/audio/${categoryName.replace(new RegExp(" ", 'g'), "_").toLowerCase()}.mp3" />`;
    const categoryIntroduction = (await getRandomSpeech(speechTypes.CATEGORY_INTRO, getLocale(handlerInput))).replace("[CATEGORY_NAME]", categoryName);
    const holdTimer = `<audio src="https://tko-trivia.s3.amazonaws.com/audio/15secondtimer.mp3" />`;
    const answerPrompt = await getRandomSpeech(speechTypes.ANSWER_PROMPT, getLocale(handlerInput));
    const questionSpeech = question.fields.VoiceQuestion;

    return [categoryIntroduction, soundEffect, questionSpeech, holdTimer, answerPrompt].join(" ");
    //return "Hi Jeff.";
}

module.exports = buildQuestion;