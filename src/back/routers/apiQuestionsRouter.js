import express from "express";
import passport from "passport";
import Course from "../../db_models/courseModel.js";

/**
 * Express router instance.
 * @type {object}
 * @const
 */
const apiQuestionsRouter = express.Router()

/**
 * Functions shuffles array so every time there's a different order
 * @param array
 * @return {*}
 */
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

/**
 * Route serving questions.
 *
 * @name post/api/questions
 * @function
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
apiQuestionsRouter.post('/questions', passport.authenticate('jwt', {session: false}), async (req, res) => {
    try{
        const questions = await Course.aggregate([{
            $project: {
                _id: false,
                "questions": {
                    "text": true,
                    "answers": {
                        _id: "$$REMOVE",
                        text: true
                    }
                }
            }
        }])
        res.status(200).json(shuffle(questions[0].questions))
    } catch (e) {
        res.status(500).json(e)
        console.log(e)
    }
})

export default apiQuestionsRouter
