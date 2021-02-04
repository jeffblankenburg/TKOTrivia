const achievements = require("../data/achievements");
const getSpecificAchievement = require("../data/getSpecificAchievement");

async function SessionCount(user, locale) {
    const count = user.fields.SessionCount;
    const userId = user.fields.RecordId;
    switch (count) {
        case 2: return await getSpecificAchievement(achievements.SESSION_2, userId, locale);
        case 5: return await getSpecificAchievement(achievements.SESSION_5, userId, locale);
        case 10: return await getSpecificAchievement(achievements.SESSION_10, userId, locale);
        case 25: return await getSpecificAchievement(achievements.SESSION_25, userId, locale);
        default: return undefined;
    }
}

module.exports = SessionCount;