const buildHandlerInputAdapter = require(`../handlers/buildHandlerInputAdapter`);

describe(`Looking up voice property`, () => {
    it(`retrieves it from handlerInput`, () => {
        const handlerInput = {session: {attributes: {user: {fields: {Voice: "Brian"}}}}};
        const result = buildHandlerInputAdapter(handlerInput);
        expect(result.voice).toBe("Brian");
    });
    it(`sets voice to undefined when voice is unavailable.`, () => {
        const handlerInput = {};
        const result = buildHandlerInputAdapter(handlerInput);
        expect(result.voice).toBeUndefined();
    });
})
