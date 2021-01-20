import express from "express"
import cookieParser from "cookie-parser"
import * as path from "path"
import mongoose from "mongoose"
import passport from "passport"
import apiLoginRouter from "./src/back/routers/apiLoginRouter.js"
import apiRegisterRouter from './src/back/routers/apiRegisterRouter.js'
import apiSessionTokenRouter from "./src/back/routers/apiSessionTokenRouter.js";
import apiQuestionsRouter from "./src/back/routers/apiQuestionsRouter.js";
import apiReportRouter from "./src/back/routers/apiReportRouter.js"
import userTokenAuth from "./src/middleware/passport.js"

const app = express()
const port = process.env.PORT || 8080
const mongoosePort = 27017

app.use(express.static(path.resolve('./src/front')));
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser());
app.use(passport.initialize())
userTokenAuth(passport)

const mongoURI = `mongodb://proctorAdmin:password@localhost:${mongoosePort}/proctorEdu`

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(r => console.log("Mongoose connected"))

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./src/front/login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('./src/front/register.html'))
})

app.use('/api', apiLoginRouter)
app.use('/api', apiRegisterRouter)
app.use('/api', apiSessionTokenRouter)
app.use('/api', apiQuestionsRouter)
app.use('/api', apiReportRouter)

app.get('/', passport.authenticate('jwt', {session: false, failureRedirect: '/login'}),
    (req, res) => {
        res.sendFile(path.resolve('./src/front/main.html'))
    }
)

app.listen(port, () => {console.log(`Server is started and listening on port ${port}`)})
