const loginForm = document.querySelector(".loginForm")

loginForm.addEventListener("submit",  async event => {
    const username = document.querySelector(".loginForm__loginInput").value
    const password = document.querySelector(".loginForm__passwordInput").value
    await fetch('https://proctor-edu-test.herokuapp.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
})
