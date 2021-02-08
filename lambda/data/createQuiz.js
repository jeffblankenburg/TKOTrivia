const getCategoryList = require("./getCategoryList");
const helper = require("../helper");
const putQuiz = require("./putQuiz");
const putQuizQuestions = require("./putQuizQuestions");

async function createQuiz(userId) {
    let quiz = await putQuiz(userId);
    const categoryList = (helper.shuffleArray(await getCategoryList())).splice(10, 10);

    //TODO: THIS NEXT LINE DOESN'T SEEM TO BE HAPPNING.  WE SHOULD FIGURE THIS OUT.
    const quizQuestions = await putQuizQuestions(quiz.fields.RecordId, categoryList);
    return await getActiveQuiz(userId);
}

module.exports = createQuiz;