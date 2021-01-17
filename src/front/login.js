const loginForm = document.querySelector(".loginForm")

loginForm.addEventListener("submit", event => {
    const form = document.forms["loginForm"];
    const username = form.username.value
    const password = form.password.value
    fetch('https://localhost:8080/api/token', {
        method: 'POST',
        username: username
    })
})
