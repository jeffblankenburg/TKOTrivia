const achievements = require("../data/achievements");
const getSpecificAchievement = require("../data/getSpecificAchievement");

async function CorrectCount(user, locale) {
    const count = user.fields.CorrectCount;
    const userId = user.fields.RecordId;
    switch (count) {
        case 1: return await getSpecificAchievement(achievements.CORRECT_ANSWERS_1, userId, locale);
        case 5: return await getSpecificAchievement(achievements.CORRECT_ANSWERS_5, userId, locale);
        case 10: return await getSpecificAchievement(achievements.CORRECT_ANSWERS_10, userId, locale);
        case 25: return await getSpecificAchievement(achievements.CORRECT_ANSWERS_25, userId, locale);
        case 50: return await getSpecificAchievement(achievements.CORRECT_ANSWERS_50, userId, locale);
        case 100: return await getSpecificAchievement(achievements.CORRECT_ANSWERS_100, userId, locale);
        default: return undefined;
    }
}

module.exports = CorrectCount;