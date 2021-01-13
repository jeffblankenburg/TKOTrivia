const { getSimpleSlotValues } = require("ask-sdk-core");

function getSlotObject(value, id, synonyms) {
    let slot =  {name: { value: value}};

    if (id) slot.id = id;
    if (synonyms) slot.name.synonyms = synonyms.split(", ");
    console.log(JSON.stringify(slot));
    return slot;
}

module.exports = getSlotObject;