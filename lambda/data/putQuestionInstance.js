const Airtable = require("airtable");
const keys = require("../keys");

async function putQuestionInstance(questionId, userId, quizQuestionId = undefined) {
    const values = { Question: [questionId], User: [userId]};
    if (quizQuestionId) values.QuizQuestion = [quizQuestionId];
    const airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
    return new Promise((resolve, reject) => {
        airtable("QuestionInstance").create(values, (err, record) => {
            if (err) {
                console.error(err);
                return;
            }
            resolve(record);
        });
    });
}

module.exports = putQuestionInstance;