const Airtable = require("airtable");
const keys = require("../keys");

async function putQuestionInstance(questionId, userId, quizId = undefined) {
    const values = { Question: [questionId], User: [userId], QuizQuestion: [quizId]};
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