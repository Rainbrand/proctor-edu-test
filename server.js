import express from "express"
import cookieParser from "cookie-parser"
import * as path from "path"
import mongoose from "mongoose"
import apiTokenRouter from "./src/back/routers/apiTokenRouter.js"

const app = express()
const port = process.env.PORT || 8080

app.use(express.static(path.resolve('./src/front')));
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({
    extended: true
}))

app.use(cookieParser());

const mongoURI = "mongodb://localhost"

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./src/front/login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('./src/front/register.html'))
})

app.use('/api', apiTokenRouter)

app.get('/', (req, res) => {
    if (!req.cookies.token) {   //redirects to login page if user is not authorised
        res.redirect('/login')
    }
    res.sendFile(path.resolve('./src/front/main.html'))
})

app.listen(port, () => {console.log(`Server is started and listening on port ${port}`)})
