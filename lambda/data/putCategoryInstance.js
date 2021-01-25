const Airtable = require("airtable");
const keys = require("../keys");

async function putCategoryInstance(categoryName, userId) {
    const values = { CategoryName: categoryName, User: [userId]};
    const airtable = new Airtable({ apiKey: keys.airtable_api_key }).base(keys.airtable_base_data);
    return new Promise((resolve, reject) => {
        airtable("CategoryInstance").create(values, (err, record) => {
            if (err) {
                console.error(err);
                return;
            }
            resolve(record);
        });
    });
}

module.exports = putCategoryInstance;