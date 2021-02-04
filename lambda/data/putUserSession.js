const Airtable = require("airtable");
const keys = require("../keys");

async function putUserSession(userId) {
    const values = { User: [userId]};
    const airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
    return new Promise((resolve, reject) => {
        airtable("UserSession").create(values, (err, record) => {
            if (err) {
                console.error(err);
                return;
            }
            resolve(record);
        });
    });
}

module.exports = putUserSession;