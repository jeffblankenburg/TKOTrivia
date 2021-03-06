const buildQuestion = require("./buildQuestion");
const getLocale = require("./getLocale");
const getPollyVoice = require("./getPollyVoice");
const getRandom = require("./getRandom");
const getRandomItem = require("./getRandomItem");
const getResolvedWords = require("./getResolvedWords");
const getSlotObject = require("./getSlotObject");
const getSpokenWords = require("./getSpokenWords");
const getUserId = require("./getUserId");
const shuffleArray = require("./shuffleArray");
const supportsAPL = require("./supportsAPL");

module.exports = {
    buildQuestion,
    getLocale,
    getPollyVoice,
    getRandom,
    getRandomItem,
    getResolvedWords,
    getSlotObject,
    getSpokenWords,
    getUserId,
    shuffleArray,
    supportsAPL
}