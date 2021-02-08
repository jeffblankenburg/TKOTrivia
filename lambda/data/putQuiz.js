const Airtable = require("airtable");
const keys = require("../keys");

async function putQuiz(userId) {
    const values = { User: [userId], IsActive: true};
    const airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
    return new Promise((resolve, reject) => {
        airtable("Quiz").create(values, (err, record) => {
            if (err) {
                console.error(err);
                return;
            }
            resolve(record);
        });
    });
}

module.exports = putQuiz;