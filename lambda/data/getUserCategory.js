const Airtable = require("airtable");
const fetch = require("node-fetch");
const keys = require("../keys");

async function getUserCategory(quizId) {
    const url = `https://api.airtable.com/v0/${keys.airtable_base_data}/User?api_key=${keys.airtable_api_key}&filterByFormula=AND(RecordId%3D"${encodeURIComponent(quizId)}",IsActive%3DTRUE())`;
    //console.log(`FULL PATH ${url}`);
    const options = { method: "GET" };

    return fetch(url, options)
        .then((res) => res.json())
        .then(async (r) => {
            //console.log({r});
            if (r.records.length === 0) {
                return undefined;
            } 
            return r.records[0];
        }
    );
}

module.exports = getUserCategory;