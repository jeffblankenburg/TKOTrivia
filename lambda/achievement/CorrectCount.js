const achievements = require("../data/achievements");
const getSpecificAchievement = require("../data/getSpecificAchievement");

async function CorrectCount(count, locale) {
    switch (count) {
        case 1:
            return await getSpecificAchievement(achievements.CORRECT_ANSWERS_1, locale);
        break;
        case 5:
            return await getSpecificAchievement(achievements.CORRECT_ANSWERS_5, locale);
        break;
        case 10:
            return await getSpecificAchievement(achievements.CORRECT_ANSWERS_10, locale);
        break;
        default:
            return undefined;
        break;
    }
}

module.exports = CorrectCount;