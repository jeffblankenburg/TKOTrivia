const Airtable = require("airtable");
const keys = require("../keys");

async function updateQuestionInstance(questionInstanceId, questionId, userId, isCorrect, answer) {
     const values = { Question: [questionId], User: [userId], IsCorrect: isCorrect, Answer: answer };
     const airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
     return new Promise((resolve, reject) => {
        airtable("QuestionInstance").update(questionInstanceId, values, (err, record) => {
            if (err) {
                console.error(err);
                return;
            }
            resolve(record);
        });
     });
}

module.exports = updateQuestionInstance;