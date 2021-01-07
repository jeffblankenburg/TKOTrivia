const polly = require("../polly");
const buildHandlerInputAdapter = require("./buildHandlerInputAdapter");

function wrapHandlerInput(handlerInput) {
    const handlerInputAdapter = buildHandlerInputAdapter(handlerInput);
    return {
        wrapVoice: function (speech) {
            const voice = handlerInputAdapter.voice;
            return polly.wrapVoice(speech, voice);
        }
    };
}

module.exports = wrapHandlerInput;