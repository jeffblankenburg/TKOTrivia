//const data = require("../data");
// const getRandomSpeech = require("../data/getRandomSpeech");
// const speechTypes = require("../data/speechTypes");
const getLocale = require("./getLocale");

async function buildQuestion(categoryName, question, handlerInput, data) {
    const soundEffect = `<audio src="https://tko-trivia.s3.amazonaws.com/audio/${categoryName.replace(new RegExp(" ", 'g'), "_").toLowerCase()}.mp3" />`;
    const holdTimer = `<audio src="https://tko-trivia.s3.amazonaws.com/audio/15secondtimer.mp3" />`;
    const questionSpeech = question.fields.VoiceQuestion;
    const categoryIntroduction = (await data.getRandomSpeech(data.speechTypes.CATEGORY_INTRO, getLocale(handlerInput))).replace("[CATEGORY_NAME]", categoryName);
    const answerPrompt = await data.getRandomSpeech(data.speechTypes.ANSWER_PROMPT, getLocale(handlerInput));
    return [categoryIntroduction, soundEffect, questionSpeech, holdTimer, answerPrompt].join(" ");
}

module.exports = buildQuestion;