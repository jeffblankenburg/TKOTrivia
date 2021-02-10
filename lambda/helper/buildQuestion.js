const getLocale = require("./getLocale");

async function buildQuestion(question, handlerInput, data, questionNumber = undefined) {
    const categoryName = question.fields.Category[0];
    const soundEffect = `<audio src="https://tko-trivia.s3.amazonaws.com/audio/${categoryName.replace(new RegExp(" ", 'g'), "_").toLowerCase()}.mp3" />`;
    const holdTimer = `<audio src="https://tko-trivia.s3.amazonaws.com/audio/15seconds.mp3" />`;
    const questionSpeech = question.fields.VoiceQuestion;
    let questionNumberSpeech = "";
    if (questionNumber) questionNumberSpeech = (await data.getRandomSpeech(data.speechTypes.QUESTION_NUMBER, getLocale(handlerInput))).replace("[NUMBER]", questionNumber);
    const categoryIntroduction = (await data.getRandomSpeech(data.speechTypes.CATEGORY_INTRO, getLocale(handlerInput))).replace("[CATEGORY_NAME]", categoryName);
    return [questionNumberSpeech, categoryIntroduction, soundEffect, questionSpeech, holdTimer].join(" ");
}

module.exports = buildQuestion;