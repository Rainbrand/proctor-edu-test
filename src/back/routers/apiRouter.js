import express from "express";
import apiLoginRouter from "./apiLoginRouter.js";
import apiRegisterRouter from "./apiRegisterRouter.js";
import apiSessionTokenRouter from "./apiSessionTokenRouter.js";
import apiQuestionsRouter from "./apiQuestionsRouter.js";
import apiReportRouter from "./apiReportRouter.js";

/**
 * Express router instance.
 * @type {object}
 * @const
 */
const apiRouter = express.Router()

/**
 * Route serving api paths.
 *
 * @name post/api
 * @function
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
const apiRoutes = [apiLoginRouter, apiRegisterRouter, apiSessionTokenRouter, apiQuestionsRouter, apiReportRouter]

apiRouter.use('/', apiRoutes)

export default apiRouter
