const Airtable = require("airtable");
const keys = require("../keys");

async function putError(userId, stack) {
    const values = { User: [userId], Stack: stack};
    const airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
    return new Promise((resolve, reject) => {
        airtable("Error").create(values, (err, record) => {
            if (err) {
                console.error(err);
                return;
            }
            resolve(record);
        });
    });
}

module.exports = putError;