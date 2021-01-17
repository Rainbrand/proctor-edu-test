import express from "express"
import * as path from "path"
import mongoose from "mongoose"
import apiTokenRouter from "./src/back/routers/apiTokenRouter.js"

const app = express()
const port = process.env.PORT || 8080

app.use(express.static(path.resolve('./src')));
app.use(express.json())

const mongoURI = "mongodb://localhost"

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.get('/', (req, res) => {
    res.sendFile(path.resolve('./src/index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./src/login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('./src/register.html'))
})

app.use('/api', apiTokenRouter)

app.listen(port, () => {console.log(`Server is started and listening on port ${port}`)})
