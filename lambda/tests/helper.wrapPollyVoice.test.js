const polly = require(`../polly`);

test(`Provides voice tag to content when BRIAN is given.`, () => {
    const result = polly.wrapVoice(`This is my test speech.`, polly.voices.BRIAN);
    expect(result).toBe(`<voice name='${polly.voices.BRIAN.name}'><lang xml:lang="${polly.voices.BRIAN.locale}"><prosody rate="medium">This is my test speech.</prosody></lang></voice>`);
});

test(`Provides voice tag to content when BRIAN is given with FAST.`, () => {
    const result = polly.wrapVoice(`This is my test speech.`, polly.voices.BRIAN, polly.rates.FAST);
    expect(result).toBe(`<voice name='${polly.voices.BRIAN.name}'><lang xml:lang="${polly.voices.BRIAN.locale}"><prosody rate="${polly.rates.FAST}">This is my test speech.</prosody></lang></voice>`);
});

test(`Provides voice tag to content when CARLA is given.`, () => {
    const result = polly.wrapVoice(`This is my test speech.`, polly.voices.CARLA);
    expect(result).toBe(`<voice name='${polly.voices.CARLA.name}'><lang xml:lang="${polly.voices.CARLA.locale}"><prosody rate="medium">This is my test speech.</prosody></lang></voice>`);
});

test(`Doesn't provide voice tag when voice is undefined.`, () => {
    const result = polly.wrapVoice(`This is my test speech.`, undefined);
    expect(result).toBe(`This is my test speech.`);
});

test(`Doesn't provide voice tag when voice is not an acceptable value.`, () => {
    const result = polly.wrapVoice(`This is my test speech.`, "Carl");
    expect(result).toBe(`This is my test speech.`);
});