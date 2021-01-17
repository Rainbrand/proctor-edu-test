const jwt = require("./jwtHandler.js");

const loginForm = document.querySelector(".loginForm")

loginForm.addEventListener("submit", event => {
    event.preventDefault()
    const form = document.forms["loginForm"];
    const username = form.username.value
    const password = form.password.value
    const JWT = new jwt()
    const a = JWT.generate({username: username})
    console.log(a)
})
