import express from "express";
import passport from "passport";
import Course from "../../db_models/courseModel.js";

const apiQuestionsRouter = express.Router()

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}

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
