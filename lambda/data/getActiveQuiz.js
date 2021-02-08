const Airtable = require("airtable");
const fetch = require("node-fetch");
const keys = require("../keys");
const createQuiz = require("./createQuiz");

async function getActiveQuiz(userId) {
    const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/Quiz?api_key=${keys.airtable_api_key}&filterByFormula=AND(User%3D"${encodeURIComponent(userId)}",IsActive%3DTRUE())`;
    //console.log(`FULL PATH ${url}`);
    const options = { method: "GET" };

    return fetch(url, options)
        .then((res) => res.json())
        .then(async (r) => {
            //console.log(`R ${JSON.stringify(r)}`);
            if (r.records.length === 0) {
                return createQuiz(userId);
            } 
            return r.records[0];
        }
    );
}

module.exports = getActiveQuiz;