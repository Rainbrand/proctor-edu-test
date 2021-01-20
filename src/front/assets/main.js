const startTestButton = document.querySelector(".startTestButton")
const testNextFormButton = document.querySelector(".testForm__nextButton")
const testBackFormButton = document.querySelector(".testForm__backButton")

const questionsHandler = new TestHandler()

const setLabelText = question => {
    document.querySelector(".testForm__question").innerHTML = question.text
    for (let i = 0; i < 4; i++){
        document.querySelector(`.testForm__inputLabel--${i + 1}`).innerHTML = question.answers[i].text
    }
}

const switchToTest = () => {
    const main = document.querySelector("main")
    document.querySelector(".textInfo").style.display = "none"
    document.querySelector(".startTestButton").style.display = "none"
    const testForm = document.querySelector(".testForm")
    testForm.style.display = "flex"
}

const switchToFinish = () => {
    document.querySelector(".textInfo").style.display = "block"
    document.querySelector(".textInfo__header").innerHTML = "Finish"
    document.querySelector(".textInfo__mainText").innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad amet culpa cupiditate dicta dignissimos enim et, hic, modi, nam nihil nostrum pariatur porro quam quo reprehenderit sed veniam. Harum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, autem consequatur cupiditate deleniti dolores, earum et impedit laboriosam laborum necessitatibus nemo optio praesentium repellat ut voluptatum! Sapiente, sint, voluptates? Delectus?"
    document.querySelector(".testForm").style.display = "none"
}

startTestButton.addEventListener("click", async event => {
    event.preventDefault()
    const sessionToken = await fetch('http://localhost:8080/api/sesstoken', {
        method: "POST"
    }).then(result => result.json())
    const questions = await fetch('http://localhost:8080/api/questions', {
        method: "POST"
    }).then(result => result.json())
    questionsHandler.setQuestions(questions)
    switchToTest()
    setLabelText(questionsHandler.getNextQuestion())
})

testBackFormButton.addEventListener("click", async event => {
    event.preventDefault()
    let previousQuestion = questionsHandler.getPreviousQuestion()
    let nextQuestion = questionsHandler.peekNextQuestion()
    if (nextQuestion !== undefined){
        testNextFormButton.innerHTML = "Next"
    }
    setLabelText(previousQuestion)
})

testNextFormButton.addEventListener("click", async event => {
    event.preventDefault()
    let currentQuestion = questionsHandler.getNextQuestion()
    let nextQuestion = questionsHandler.peekNextQuestion()
    if (currentQuestion === undefined){
        switchToFinish()
        return
    }
    if (nextQuestion === undefined){
        testNextFormButton.innerHTML = "Finish"

    }
    setLabelText(currentQuestion)
})

