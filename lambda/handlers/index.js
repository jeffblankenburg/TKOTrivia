const AnswerIntent = require("./AnswerIntent");
const CancelIntent = require(`./CancelIntent`);
const ErrorHandler = require(`./ErrorHandler`);
const HelpIntent  = require(`./HelpIntent`);
const IntentReflector = require(`./IntentReflector`);
const LaunchRequest = require(`./LaunchRequest`);
const QuestionIntent = require("./QuestionIntent");
const RepeatIntent = require(`./RepeatIntent`);
const SessionEndedRequest = require(`./SessionEndedRequest`);
const SpecificQuestionIntent = require("./SpecificQuestionIntent");
const StopIntent = require(`./StopIntent`);

module.exports = {
    AnswerIntent,
    CancelIntent,
    ErrorHandler,
    HelpIntent,
    IntentReflector,
    LaunchRequest,
    QuestionIntent,
    RepeatIntent,
    SessionEndedRequest,
    SpecificQuestionIntent,
    StopIntent
}