const rates = require("./rates");
const voices = require("./voices");
const pollyVoiceList = Object.values(voices);
const pollyNameList = pollyVoiceList.map(v => v.name);

function wrapPollyVoice(speech, voice, rate = rates.MEDIUM) {
  if ((voice) && (pollyNameList.includes(voice.name))) {
    return (`<voice name='${voice.name}'><lang xml:lang="${voice.locale}"><prosody rate="${rate}">${speech}</prosody></lang></voice>`);
  }
  return speech;
}

module.exports = wrapPollyVoice;