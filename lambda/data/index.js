const achievements = require("./achievements");
const askQuestion = require("./askQuestion");
const awardAchievement = require("./awardAchievement");
const getAchievementSpeech = require("./getAchievementSpeech");
const getActiveQuiz = require("./getActiveQuiz");
const getCategoryList = require("./getCategoryList");
const getRandomQuestion = require("./getRandomQuestion");
const getRandomSpeech = require("./getRandomSpeech");
const getSpecificAchievement = require("./getSpecificAchievement");
const getSpecificCategory = require("./getSpecificCategory");
const getSpecificQuestion = require("./getSpecificQuestion");
const getSpecificQuiz = require("./getSpecificQuiz");
const getUserByUserId = require("./getUserByUserId");
const getUserCategory = require("./getUserCategory");
const putCategoryInstance = require("./putCategoryInstance");
const putError = require("./putError");
const putQuiz = require("./putQuiz");
const putQuizQuestions = require("./putQuizQuestions");
const putQuestionInstance = require("./putQuestionInstance");
const putUserCategory = require("./putUserCategory");
const putUserSession = require("./putUserSession");
const speechTypes = require("./speechTypes");
const updateQuestionInstance = require("./updateQuestionInstance");
const updateQuizStatus = require("./updateQuizStatus");

module.exports = {
    achievements,
    askQuestion,
    awardAchievement,
    getAchievementSpeech,
    getActiveQuiz,
    getCategoryList,
    getRandomQuestion,
    getRandomSpeech,
    getSpecificAchievement,
    getSpecificCategory,
    getSpecificQuestion,
    getSpecificQuiz,
    getUserByUserId,
    getUserCategory,
    putCategoryInstance,
    putError,
    putQuiz,
    putQuizQuestions,
    putQuestionInstance,
    putUserCategory,
    putUserSession,
    speechTypes,
    updateQuestionInstance,
    updateQuizStatus
}