/**
 * An HTMLElement of login form
 * @type {Element}
 * @const
 */
const registerForm = document.querySelector(".registerForm")

/**
 * Listens to submit event
 *
 * @type {HTMLElement} - Register form.
 * @listens registerForm#submit - Submit event of form
 */
registerForm.addEventListener("submit", async event => {
    event.preventDefault()
    const username = document.querySelector(".registerForm__usernameInput").value
    const nickname = document.querySelector(".registerForm__nicknameInput").value
    const password = document.querySelector(".registerForm__passwordInput").value
    const role = document.querySelector(".registerForm__selectInput").value
    await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            nickname: nickname,
            password: password,
            role: role
        })
    })
})
