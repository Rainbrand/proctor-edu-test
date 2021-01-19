import express from "express";
import passport from "passport";
import Course from "../../db_models/courseModel.js";

const apiQuestionsRouter = express.Router()

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
        res.status(200).json(questions[0].questions)
    } catch (e) {
        res.status(500).json(e)
        console.log(e)
    }
})

export default apiQuestionsRouter
