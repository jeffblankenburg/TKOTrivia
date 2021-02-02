const achievements = require("./achievements");
const awardAchievement = require("./awardAchievement");
const getAchievementSpeech = require("./getAchievementSpeech");
const getCategoryList = require("./getCategoryList");
const getRandomQuestion = require("./getRandomQuestion");
const getRandomSpeech = require("./getRandomSpeech");
const getSpecificAchievement = require("./getSpecificAchievement");
const getSpecificQuestion = require("./getSpecificQuestion");
const getUserByUserId = require("./getUserByUserId");
const updateQuestionInstance = require("./updateQuestionInstance");
const putCategoryInstance = require("./putCategoryInstance");
const putQuestionInstance = require("./putQuestionInstance");
const speechTypes = require("./speechTypes");

module.exports = {
    achievements,
    awardAchievement,
    getAchievementSpeech,
    getCategoryList,
    getRandomQuestion,
    getRandomSpeech,
    getSpecificAchievement,
    getSpecificQuestion,
    getUserByUserId,
    putCategoryInstance,
    putQuestionInstance,
    speechTypes,
    updateQuestionInstance
}