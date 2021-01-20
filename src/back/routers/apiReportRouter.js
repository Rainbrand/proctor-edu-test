import express from "express";
import SessionResult from "../../db_models/sessionResultModel.js";

const apiReportRouter = express.Router()

apiReportRouter.post("/report", async (req, res) => {
    if (req.headers['x-api-key'] !== 'secret'){
        console.log("Wring api key")
        res.status(403).json("Wrong api key")
    } else {
        try{
            const result = new SessionResult({
                id: req.body.id,
                status: req.body.status,
                duration: req.body.duration,
                startedAt: req.body.startedAt,
                stoppedAt: req.body.stoppedAt,
                score: req.body.score,
                student: req.body.student,
                proctor: req.body.proctor
            })
            await result.save()
            res.status(200).json(result)
        } catch (e) {
            console.log(e)
        }
    }
})

export default apiReportRouter
