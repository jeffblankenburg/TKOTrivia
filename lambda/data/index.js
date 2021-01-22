const getCategoryList = require("./getCategoryList");
const getRandomQuestion = require("./getRandomQuestion");
const getRandomSpeech = require("./getRandomSpeech");
const getSpecificQuestion = require("./getSpecificQuestion");
const getUserByUserId = require("./getUserByUserId");
const updateQuestionInstance = require("./updateQuestionInstance");
const putQuestionInstance = require("./putQuestionInstance");
const speechTypes = require("./speechTypes");

module.exports = {
    getCategoryList,
    getRandomQuestion,
    getRandomSpeech,
    getSpecificQuestion,
    getUserByUserId,
    putQuestionInstance,
    speechTypes,
    updateQuestionInstance
}