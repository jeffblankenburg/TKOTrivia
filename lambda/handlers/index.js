const AnswerIntent = require("./AnswerIntent");
const CancelIntent = require(`./CancelIntent`);
const CategoryFullListIntent = require("./CategoryFullListIntent");
const CategoryListIntent = require(`./CategoryListIntent`);
const ErrorHandler = require(`./ErrorHandler`);
const HelpIntent  = require(`./HelpIntent`);
const IntentReflector = require(`./IntentReflector`);
const LaunchRequest = require(`./LaunchRequest`);
const QuestionIntent = require("./QuestionIntent");
const QuizIntent = require("./QuizIntent");
const RepeatIntent = require(`./RepeatIntent`);
const SessionEndedRequest = require(`./SessionEndedRequest`);
const SpecificQuestionIntent = require("./SpecificQuestionIntent");
const StopIntent = require(`./StopIntent`);

module.exports = {
    AnswerIntent,
    CancelIntent,
    CategoryFullListIntent,
    CategoryListIntent,
    ErrorHandler,
    HelpIntent,
    IntentReflector,
    LaunchRequest,
    QuestionIntent,
    QuizIntent,
    RepeatIntent,
    SessionEndedRequest,
    SpecificQuestionIntent,
    StopIntent
}