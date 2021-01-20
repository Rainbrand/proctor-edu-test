class TestHandler {
    constructor(questions) {
        this._questions = questions
        this._currentQuestionIndex = -1
    }

    setQuestions(questions){
        this._questions = questions
    }

    getNextQuestion(){
        if (this._currentQuestionIndex + 1 > this._questions.length - 1) return undefined
        return this._questions[++this._currentQuestionIndex]
    }

    peekNextQuestion(){
        return this._questions[this._currentQuestionIndex + 1]
    }

    peekPreviousQuestion(){
        return this._questions[this._currentQuestionIndex - 1]
    }

    getPreviousQuestion(){
        if (this._currentQuestionIndex - 1 < 0) return this._questions[0]
        return this._questions[--this._currentQuestionIndex]
    }
}
