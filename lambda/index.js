const Alexa = require(`ask-sdk-core`);
const handlers = require(`./handlers`);
const interceptors = require(`./interceptors`)

const AnswerIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === `IntentRequest`
            && Alexa.getIntentName(handlerInput.requestEnvelope) === `AnswerIntent`;
    },
    handle(handlerInput) {
        return handlers.AnswerIntent(handlerInput);
    }
};

const CancelIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === `IntentRequest`
            && Alexa.getIntentName(handlerInput.requestEnvelope) === `AMAZON.CancelIntent`;
    },
    handle(handlerInput) {
        return handlers.CancelIntent(handlerInput);
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === `IntentRequest`
            && Alexa.getIntentName(handlerInput.requestEnvelope) === `AMAZON.HelpIntent`;
    },
    handle(handlerInput) {
        return handlers.HelpIntent(handlerInput);
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === `LaunchRequest`;
    },
    handle(handlerInput) {
        return handlers.LaunchRequest(handlerInput);
    }
};

const QuestionIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === `IntentRequest`
            && Alexa.getIntentName(handlerInput.requestEnvelope) === `QuestionIntent`;
    },
    handle(handlerInput) {
        return handlers.QuestionIntent(handlerInput);
    }
};

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === `IntentRequest`
            && Alexa.getIntentName(handlerInput.requestEnvelope) === `AMAZON.RepeatIntent`;
    },
    handle(handlerInput) {
        return handlers.RepeatIntent(handlerInput);
    }
};

const StopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === `IntentRequest`
            && Alexa.getIntentName(handlerInput.requestEnvelope) === `AMAZON.StopIntent`;
    },
    handle(handlerInput) {
        return handlers.StopIntent(handlerInput);
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === `SessionEndedRequest`;
    },
    handle(handlerInput) {
        return handlers.SessionEndedRequest(handlerInput);
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        return handlers.IntentReflector(handlerInput);
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log("ERROR HANDLED.");
        return handlers.ErrorHandler(handlerInput, error);
    }
};

const RequestInterceptor = {
    process(handlerInput) {
        return interceptors.RequestInterceptor(handlerInput);
    }
}

const ResponseInterceptor = {
    process(handlerInput) {
        return interceptors.ResponseInterceptor(handlerInput);
    }
}

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        QuestionIntentHandler,
        AnswerIntentHandler,
        HelpIntentHandler,
        CancelIntentHandler,
        StopIntentHandler,
        RepeatIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .addRequestInterceptors(RequestInterceptor)
    .addResponseInterceptors(ResponseInterceptor)
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();
