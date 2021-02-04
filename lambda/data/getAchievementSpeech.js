const achievement = require("../achievement");
const achievements = require("./achievements");
const speechTypes = require("./speechTypes");
const awardAchievement = require("./awardAchievement");
const getRandomSpeech = require("./getRandomSpeech");

async function getAchievementSpeech(user, locale) {
    
    let achievementSpeech = "";
    let achievementArray = [];
    console.log({user});

    const [AchievementSound, SessionCount, AnswerCount, CorrectCount] = 
        await Promise.all([getRandomSpeech(speechTypes.SOUND_ACHIEVEMENT, locale),
                           achievement.SessionCount(user, locale), 
                           achievement.AnswerCount(user, locale),
                           achievement.CorrectCount(user, locale)]);

    if (SessionCount) achievementArray.push(SessionCount);
    if (AnswerCount) achievementArray.push(AnswerCount);
    if (CorrectCount) achievementArray.push(CorrectCount);


    //THIS NEEDS TO BE THE LAST CHECK.
    user.fields.AchievementCount += achievementArray.length;
    const AchievementCount = await achievement.AchievementCount(user, locale);
    if (AchievementCount) achievementArray.push(AchievementCount)
    //TODO: Other achievement ideas:
    //Days since the first play
    //Bigger numbers (up to 100) for existing achievements.
    //Categorical achievements?  How many science questions they've gotten correct, for example?
    //Questions Answered Correctly in the same day?


    let newAchievementCount = 0;

    if (achievementArray.length > 0) {
        console.log({achievementArray});
        for (const a of achievementArray) {
            if (!user.fields.Achievement || !user.fields.Achievement.includes(a.fields.RecordId)) {
                newAchievementCount++;
                achievementSpeech = [achievementSpeech, a.fields.VoiceResponse].join(" ");
                const userAchievement = await awardAchievement(a.fields.RecordId, user.fields.RecordId);
            }
        };

        if (achievementSpeech !== "") {
            let achievementCountSpeech = "";
            if (newAchievementCount === 1) achievementCountSpeech = await getRandomSpeech(speechTypes.ACHIEVEMENT_UNLOCKED, locale);
            else achievementCountSpeech = (await getRandomSpeech(speechTypes.ACHIEVEMENTS_UNLOCKED, locale)).replace("[COUNT]", newAchievementCount);
            return [AchievementSound, achievementCountSpeech, achievementSpeech].join(" ");
        }
        
    }

    return undefined;
}

module.exports = getAchievementSpeech;