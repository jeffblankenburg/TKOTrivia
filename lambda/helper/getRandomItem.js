const getRandom = require("./getRandom");

function getRandomItem(items) {
    var random = getRandom(0, items.length - 1);
    return items[random];
}


module.exports = getRandomItem;