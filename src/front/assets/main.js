const startTestButton = document.querySelector(".startTestButton")

startTestButton.addEventListener("click", async event => {
    event.preventDefault()
    const questions = await fetch('http://localhost:8080/api/questions', {
        method: "POST"
    })
    console.log(await questions.text())
})
