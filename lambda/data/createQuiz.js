const getCategoryList = require("./getCategoryList");
const getSpecificQuiz = require("./getSpecificQuiz");
const helper = require("../helper");
const putQuiz = require("./putQuiz");
const putQuizQuestions = require("./putQuizQuestions");

async function createQuiz(userId) {
    const quiz = await putQuiz(userId);
    const categoryList = (helper.shuffleArray(await getCategoryList())).splice(10, 10);
    const quizQuestions = await putQuizQuestions(quiz.fields.RecordId, categoryList);
    const newQuiz = await getSpecificQuiz(quiz.fields.RecordId);
    return newQuiz;
}

module.exports = createQuiz;