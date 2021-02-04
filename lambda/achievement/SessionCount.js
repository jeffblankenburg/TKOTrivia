const achievements = require("../data/achievements");
const getSpecificAchievement = require("../data/getSpecificAchievement");

async function SessionCount(count, locale) {
    switch (count) {
        case 2: return await getSpecificAchievement(achievements.SESSION_2, locale);
        case 5: return await getSpecificAchievement(achievements.SESSION_5, locale);
        case 10: return await getSpecificAchievement(achievements.SESSION_10, locale);
        case 25: return await getSpecificAchievement(achievements.SESSION_25, locale);
        default: return undefined;
    }
}

module.exports = SessionCount;