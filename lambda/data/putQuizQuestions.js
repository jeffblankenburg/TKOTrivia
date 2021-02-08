const Airtable = require("airtable");
const keys = require("../keys");

async function putQuizQuestion(quizId, categoryArray) {
    let values = [];

    for (var i = 0;i<categoryArray.length;i++) {
        values.push({fields: { Quiz: [quizId], Category: [categoryArray[i].fields.RecordId], Order: i}});
    }

    //const values = [{ Quiz: [quizId], Category: [categoryArray[0].fields.RecordId]}];
    const airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
    return new Promise((resolve, reject) => {
        airtable("QuizQuestion").create(values, (err, record) => {
            if (err) {
                console.error(err);
                return;
            }
            resolve(record);
        });
    });
}

module.exports = putQuizQuestion;