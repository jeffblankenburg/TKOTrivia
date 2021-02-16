const AnswerIntent = require("./AnswerIntent");
const BuyCategoryIntent = require("./BuyCategoryIntent");
const BuyDeclinedHandler = require("./BuyDeclinedHandler");
const BuySuccessHandler = require("./BuySuccessHandler");
const CancelIntent = require(`./CancelIntent`);
const CancelSubscriptionIntent = require("./CancelSubscriptionIntent");
const CancelSuccessHandler = require("./CancelSuccessHandler");
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
const SubscriptionIntent = require("./SubscriptionIntent");

module.exports = {
    AnswerIntent,
    BuyCategoryIntent,
    BuyDeclinedHandler,
    BuySuccessHandler,
    CancelIntent,
    CancelSubscriptionIntent,
    CancelSuccessHandler,
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
    StopIntent,
    SubscriptionIntent
}