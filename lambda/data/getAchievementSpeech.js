const achievement = require("../achievement");
const achievements = require("./achievements");
const awardAchievement = require("./awardAchievement");
const getSpecificAchievement = require("./getSpecificAchievement");

async function getAchievementSpeech(user, locale) {
    //return undefined;
    //return "You got an achievement!  Congratulations! ";
    const achievementSound = `<audio src="soundbank://soundlibrary/ui/gameshow/amzn_ui_sfx_gameshow_positive_response_02"/>`;
    let achievementSpeech = "";
    let achievementArray = [];
    console.log({user});

    const SessionCount = await achievement.SessionCount(user.fields.SessionCount, locale);
    if (SessionCount) achievementArray.push(SessionCount);
    
    const AnswerCount = await achievement.AnswerCount(user.fields.AnswerCount, locale);
    if (AnswerCount) achievementArray.push(AnswerCount);
    
    const CorrectCount = await achievement.CorrectCount(user.fields.CorrectCount, locale);
    if (CorrectCount) achievementArray.push(CorrectCount);

    //TODO: Other achievement ideas:
    //Days since the first play
    //Bigger numbers (up to 100) for existing achievements.
    //Categorical achievements?  How many science questions they've gotten correct, for example?
    //Questions Answered Correctly in the same day?

    

    let newAchievementCount = 0;

    if (achievementArray.length > 0) {
        for (const a of achievementArray) {
            if (!user.fields.Achievement || !user.fields.Achievement.includes(a.fields.RecordId)) {
                newAchievementCount++;
                achievementSpeech = [achievementSpeech, a.fields.VoiceResponse].join(" ");
                const userAchievement = await awardAchievement(a.fields.RecordId, user.fields.RecordId);
            }
        };

        if (achievementSpeech !== "") {
            let achievementCountSpeech = "";
            if (newAchievementCount === 1) achievementCountSpeech = "You just unlocked an achievement! ";
            else achievementCountSpeech = `You just unlocked ${newAchievementCount} achievements! `;
            return [achievementSound, achievementCountSpeech, achievementSpeech].join(" ");
        }
        
    }

    return undefined;
}

module.exports = getAchievementSpeech;