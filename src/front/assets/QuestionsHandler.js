class QuestionsHandler {
    /**
     * Class handles questions generation
     * @param questions - List of questions
     * @class
     */
    constructor(questions) {
        /**
         * A list of questions
         * @private
         */
        this._questions = questions
        /**
         * Current index of questions iterator
         * @type {number}
         * @private
         */
        this._currentQuestionIndex = -1
    }

    /**
     * Method handles setting new list of questions
     * @method
     * @param questions - List of questions
     */
    setQuestions(questions){
        this._questions = questions
    }

    /**
     * Method returns new question and shifts current iterator index by 1 more
     * @method
     * @return {array|*} - Question with answers
     */
    getNextQuestion(){
        if (this._currentQuestionIndex + 1 > this._questions.length - 1) return undefined
        return this._questions[++this._currentQuestionIndex]
    }

    /**
     * Method peeks next question without shifting iterator index
     * @method
     * @return {array|*} - Question with answers
     */
    peekNextQuestion(){
        return this._questions[this._currentQuestionIndex + 1]
    }

    /**
     * Method peeks previous question without shifting iterator index
     * @method
     * @return {array|*} - Question with answers
     */
    peekPreviousQuestion(){
        return this._questions[this._currentQuestionIndex - 1]
    }

    /**
     * Method returns new question and shifts current iterator index by 1 less
     * @method
     * @return {array|*} - Question with answers
     */
    getPreviousQuestion(){
        if (this._currentQuestionIndex - 1 < 0) return this._questions[0]
        return this._questions[--this._currentQuestionIndex]
    }
}
