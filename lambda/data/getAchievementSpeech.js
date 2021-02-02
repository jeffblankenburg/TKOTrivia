const achievements = require("./achievements");
const awardAchievement = require("./awardAchievement");
const getSpecificAchievement = require("./getSpecificAchievement");

async function getAchievementSpeech(user, locale) {
    //return undefined;
    //return "You got an achievement!  Congratulations! ";
    const achievementSound = `<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02"/>`;
    let achievementSpeech = "";
    let achievementArray = [];
    let achievement;
    console.log({user});
    switch (user.fields.CorrectCount) {
        case 1:
            achievementArray.push(await getSpecificAchievement(achievements.CORRECT_ANSWERS_1, locale));
        break;
        case 5:
            achievementArray.push(await getSpecificAchievement(achievements.CORRECT_ANSWERS_5, locale));
        break;
        case 10:
            achievementArray.push(await getSpecificAchievement(achievements.CORRECT_ANSWERS_10, locale));
        break;
    }

    switch (user.fields.AnsweredCount) {
        case 1:
            achievementArray.push(await getSpecificAchievement(achievements.QUESTIONS_ANSWERED_1, locale));
        break;
        case 5:
            achievementArray.push(await getSpecificAchievement(achievements.QUESTIONS_ANSWERED_5, locale));
        break;
        case 10:
            achievementArray.push(await getSpecificAchievement(achievements.QUESTIONS_ANSWERED_10, locale));
        break;
    }

    if (achievementArray.length > 0) {
        for (const a of achievementArray) {
            if (!user.fields.Achievement || !user.fields.Achievement.includes(a.fields.RecordId)) {
                achievementSpeech = [achievementSpeech, a.fields.VoiceResponse].join(" ");
                const userAchievement = await awardAchievement(a.fields.RecordId, user.fields.RecordId);
            }
        };
        if (achievementSpeech != "") {
            return [achievementSound, achievementSpeech].join(" ");
        }
        
    }

    return undefined;
}

module.exports = getAchievementSpeech;