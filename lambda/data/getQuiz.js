const getActiveQuiz = require("./getActiveQuiz");
const helper = require("../helper");

async function getQuiz(userId) {
    //TODO: Do they already have an active quiz in progress? We should restore it.
    const activeQuiz = await getActiveQuiz(userId);
    //TODO: CREATE THE QUIZ RECORD
    //const quiz = await putQuiz(userId);

    //GET THE LIST OF CATEGORIES
    

    //RETURN THE NEWLY CONSTRUCTED QUIZ.

    return "Hi Jeff.";
}

module.exports = getQuiz;