const wrapHandlerInput = require("../handlers/wrapHandlerInput");
const polly = require("../polly");

jest.mock(`../handlers/buildHandlerInputAdapter`);
const buildHandlerInputAdapter = require("../handlers/buildHandlerInputAdapter");

describe(`wrapVoice`, () => {
    it(`Calls the voice wrapper with the user's selected voice.`, () => {
        buildHandlerInputAdapter.mockReturnValue({voice:"Brian"});
        const result = wrapHandlerInput({}).wrapVoice("This is my sample speech.");
        expect(result).toBe(polly.wrapVoice("This is my sample speech.", "Brian"));
    });
});