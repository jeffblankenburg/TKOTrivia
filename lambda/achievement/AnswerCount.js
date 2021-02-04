const achievements = require("../data/achievements");
const getSpecificAchievement = require("../data/getSpecificAchievement");

async function AnswerCount(count, locale) {
    switch (count) {
        case 1:
            return await getSpecificAchievement(achievements.QUESTIONS_ANSWERED_1, locale);
        break;
        case 5:
            return await getSpecificAchievement(achievements.QUESTIONS_ANSWERED_5, locale);
        break;
        case 10:
            return await getSpecificAchievement(achievements.QUESTIONS_ANSWERED_10, locale);
        break;
        default:
            return undefined;
        break;
    }
}

module.exports = AnswerCount;