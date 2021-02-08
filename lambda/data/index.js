const achievements = require("./achievements");
const awardAchievement = require("./awardAchievement");
const getAchievementSpeech = require("./getAchievementSpeech");
const getActiveQuiz = require("./getActiveQuiz");
const getCategoryList = require("./getCategoryList");
const getQuiz = require("./getQuiz");
const getRandomQuestion = require("./getRandomQuestion");
const getRandomSpeech = require("./getRandomSpeech");
const getSpecificAchievement = require("./getSpecificAchievement");
const getSpecificQuestion = require("./getSpecificQuestion");
const getUserByUserId = require("./getUserByUserId");
const updateQuestionInstance = require("./updateQuestionInstance");
const putCategoryInstance = require("./putCategoryInstance");
const putQuiz = require("./putQuiz");
const putQuizQuestions = require("./putQuizQuestions");
const putQuestionInstance = require("./putQuestionInstance");
const putUserSession = require("./putUserSession");
const speechTypes = require("./speechTypes");

module.exports = {
    achievements,
    awardAchievement,
    getAchievementSpeech,
    getActiveQuiz,
    getCategoryList,
    getQuiz,
    getRandomQuestion,
    getRandomSpeech,
    getSpecificAchievement,
    getSpecificQuestion,
    getUserByUserId,
    putCategoryInstance,
    putQuiz,
    putQuizQuestions,
    putQuestionInstance,
    putUserSession,
    speechTypes,
    updateQuestionInstance
}