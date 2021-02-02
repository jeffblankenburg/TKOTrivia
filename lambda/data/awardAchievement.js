const Airtable = require("airtable");
const keys = require("../keys");

async function awardAchievement(achievementId, userId) {
    const values = { Achievement: [achievementId], User: [userId]};
    const airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
    return new Promise((resolve, reject) => {
        airtable("UserAchievement").create(values, (err, record) => {
            if (err) {
                console.error(err);
                return;
            }
            resolve(record);
        });
    });
}

module.exports = awardAchievement;