const express = require('express')
const path = require('path');
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 8080

app.use(express.static(path.resolve('./public')));
app.use(express.json())

const mongoURI = "mongodb://localhost"

mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.get('/', (req, res) => {
    res.sendFile(path.resolve('./public/index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./public/login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.resolve('./public/register.html'))
})

app.listen(port, () => {console.log(`Server is started and listening on port ${port}`)})
