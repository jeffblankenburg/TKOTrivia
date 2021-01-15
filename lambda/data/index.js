const getRandomQuestion = require("./getRandomQuestion");
const getRandomSpeech = require("./getRandomSpeech");
const getUserByUserId = require("./getUserByUserId");
const updateQuestionInstance = require("./updateQuestionInstance");
const putQuestionInstance = require("./putQuestionInstance");
const speechTypes = require("./speechTypes");

module.exports = {
    getRandomQuestion,
    getRandomSpeech,
    getUserByUserId,
    putQuestionInstance,
    speechTypes,
    updateQuestionInstance
}