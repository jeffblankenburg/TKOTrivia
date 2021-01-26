const Airtable = require("airtable");
const fetch = require("node-fetch");
const keys = require("../keys");

async function getUserByUserId(userId) {
    const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/User?api_key=${keys.airtable_api_key}&filterByFormula=AND(AlexaUserId%3D"${encodeURIComponent(userId)}")&fields%5B%5D=RecordId&fields%5B%5D=AlexaUserId&fields%5B%5D=QuestionCount&fields%5B%5D=AnswerCount&fields%5B%5D=CorrectCount&fields%5B%5D=AnsweredPercentage&fields%5B%5D=CorrectPercentage`;
    //console.log(`FULL PATH ${url}`);
    const options = { method: "GET" };

    return fetch(url, options)
        .then((res) => res.json())
        .then(async (r) => {
            //console.log(`R ${JSON.stringify(r)}`);
            if (r.records.length === 0) {
                let user = await createUserRecord(userId);
                user.fields.isFirstTime = true;
                return user;
            } 
            return r.records[0];
        }
    );
}

function createUserRecord(userId) {
    const values = { AlexaUserId: userId };
    const airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
    return new Promise((resolve, reject) => {
        airtable("User").create(values, (err, record) => {
            if (err) {
                console.error(err);
                return;
            }
            resolve(record);
        });
    });
}

module.exports = getUserByUserId;