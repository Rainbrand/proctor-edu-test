import express from "express";
import apiLoginRouter from "./apiLoginRouter.js";
import apiRegisterRouter from "./apiRegisterRouter.js";
import apiSessionTokenRouter from "./apiSessionTokenRouter.js";
import apiQuestionsRouter from "./apiQuestionsRouter.js";
import apiReportRouter from "./apiReportRouter.js";

const apiRouter = express.Router()

const apiRoutes = [apiLoginRouter, apiRegisterRouter, apiSessionTokenRouter, apiQuestionsRouter, apiReportRouter]

apiRouter.use('/', apiRoutes)

export default apiRouter
