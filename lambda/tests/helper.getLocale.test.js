const helper = require(`../helper`);

test('Returns en-US from en-US requestEnvelope', () => {
    const handlerInput = {requestEnvelope: {request: {locale: `en-US`}}};
    const result = helper.getLocale(handlerInput)
    expect(result).toBe(`en-US`);
});

test('Returns en-GB from en-GB requestEnvelope', () => {
    const handlerInput = {requestEnvelope: {request: {locale: `en-GB`}}};
    const result = helper.getLocale(handlerInput)
    expect(result).toBe(`en-GB`);
});

