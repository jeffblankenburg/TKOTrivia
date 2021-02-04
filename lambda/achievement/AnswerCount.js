const achievements = require("../data/achievements");
const getSpecificAchievement = require("../data/getSpecificAchievement");

async function AnswerCount(user, locale) {
    const count = user.fields.AnswerCount;
    const userId = user.fields.RecordId;
    switch (count) {
        case 1: return await getSpecificAchievement(achievements.QUESTIONS_ANSWERED_1, userId, locale);
        case 5: return await getSpecificAchievement(achievements.QUESTIONS_ANSWERED_5, userId, locale);
        case 10: return await getSpecificAchievement(achievements.QUESTIONS_ANSWERED_10, userId, locale);
        case 25: return await getSpecificAchievement(achievements.QUESTIONS_ANSWERED_25, userId, locale);
        case 50: return await getSpecificAchievement(achievements.QUESTIONS_ANSWERED_50, userId, locale);
        case 100: return await getSpecificAchievement(achievements.QUESTIONS_ANSWERED_100, userId, locale);
        default: return undefined;
    }
    
}

module.exports = AnswerCount;