const Airtable = require("airtable");
const keys = require("../keys");

async function putUserCategory(userId, categoryId) {
     const values = { PersistedCategory: [categoryId] };
     const airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
     return new Promise((resolve, reject) => {
        airtable("User").update(userId, values, (err, record) => {
            if (err) {
                console.error(err);
                return;
            }
            resolve(record);
        });
     });
}

module.exports = putUserCategory;