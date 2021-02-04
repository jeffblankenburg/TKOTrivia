const achievements = require("../data/achievements");
const getSpecificAchievement = require("../data/getSpecificAchievement");

async function AchievementCount(user, locale) {
    const count = user.fields.AchievementCount;
    const userId = user.fields.RecordId;

    if (count >= 100) return await getSpecificAchievement(achievements.ACHIEVEMENT_100, userId, locale);
    if (count >= 50) return await getSpecificAchievement(achievements.ACHIEVEMENT_50, userId, locale);
    if (count >= 25) return await getSpecificAchievement(achievements.ACHIEVEMENT_25, userId, locale);
    if (count >= 10) return await getSpecificAchievement(achievements.ACHIEVEMENT_10, userId, locale);
    if (count >= 5) return await getSpecificAchievement(achievements.ACHIEVEMENT_5, userId, locale);
    return undefined;
}

module.exports = AchievementCount;