const registerForm = document.querySelector(".registerForm")

registerForm.addEventListener("submit", async event => {
    event.preventDefault()
    const username = document.querySelector(".registerForm__usernameInput").value
    const nickname = document.querySelector(".registerForm__nicknameInput").value
    const password = document.querySelector(".registerForm__passwordInput").value
    await fetch('https://proctor-edu-test.herokuapp.com/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            nickname: nickname,
            password: password
        })
    })
})
