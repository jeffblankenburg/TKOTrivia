const Airtable = require("airtable");
const keys = require("../keys");

async function updateQuizStatus(quizId) {
     const values = { IsActive: false };
     const airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
     return new Promise((resolve, reject) => {
        airtable("Quiz").update(quizId, values, (err, record) => {
            if (err) {
                console.error(err);
                return;
            }
            resolve(record);
        });
     });
}

module.exports = updateQuizStatus;