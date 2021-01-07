function getRandomItem(items) {
    var random = getRandom(0, items.length - 1);
    return items[random];
}
  
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = getRandomItem;