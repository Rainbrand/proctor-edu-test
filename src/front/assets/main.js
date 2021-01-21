/**
 * An HTMLElement of 'start' test button
 * @type {Element}
 * @const
 */
const startTestButton = document.querySelector(".startTestButton")

/**
 * An HTMLElement of 'next' button of test form
 * @type {Element}
 * @const
 */
const testNextFormButton = document.querySelector(".testForm__nextButton")

/**
 * An HTMLElement of 'back' button of test form
 * @type {Element}
 * @const
 */
const testBackFormButton = document.querySelector(".testForm__backButton")

/**
 * An HTMLElement of 'finish' test button
 * @type {Element}
 * @const
 */
const testFinishFormButton = document.querySelector(".testForm__finishButton")

/**
 * Instance of QuestionsHandler class
 * @type {QuestionsHandler}
 * @const
 */
const questionsHandler = new QuestionsHandler()

/**
 * Instance of Supervisor class
 * @type {Supervisor}
 * @const
 */
const supervisor = new Supervisor({
    url: 'https://demo.proctoring.online'
})

/**
 * Function sets labels for questions and answers
 * @param question
 */
const setLabelText = question => {
    document.querySelector(".testForm__question").innerHTML = question.text
    for (let i = 0; i < 4; i++){
        document.querySelector(`.testForm__inputLabel--${i + 1}`).innerHTML = question.answers[i].text
    }
}

/**
 * Function shows test form
 */
const switchToTest = () => {
    document.querySelector(".textInfo").style.display = "none"
    document.querySelector(".startTestButton").style.display = "none"
    const testForm = document.querySelector(".testForm")
    testForm.style.display = "flex"
}

/**
 * Function hides test form and shows finish info
 */
const switchToFinish = () => {
    document.querySelector(".textInfo").style.display = "block"
    document.querySelector(".textInfo__header").innerHTML = "Finish"
    document.querySelector(".textInfo__mainText").innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad amet culpa cupiditate dicta dignissimos enim et, hic, modi, nam nihil nostrum pariatur porro quam quo reprehenderit sed veniam. Harum! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut, autem consequatur cupiditate deleniti dolores, earum et impedit laboriosam laborum necessitatibus nemo optio praesentium repellat ut voluptatum! Sapiente, sint, voluptates? Delectus?"
    document.querySelector(".testForm").style.display = "none"
}

/**
 * Listens to click event. Begins test with proctoring
 *
 * @type {HTMLElement} - Start test button.
 * @listens startTestButton#click - Click event of button.
 */
startTestButton.addEventListener("click", async event => {
    event.preventDefault()
    try{
        const questions = await fetch('http://localhost:8080/api/questions', {
            method: "POST"
        }).then(result => result.json())
        await supervisor.init({
            provider: 'jwt',
            token: await fetch('http://localhost:8080/api/sesstoken', {
                method: "POST"
            }).then(result => result.json())
        })
        await supervisor.start()
        switchToTest()
        questionsHandler.setQuestions(questions)
        setLabelText(questionsHandler.getNextQuestion())
    } catch(e) {
        console.log(e);
    }
})

/**
 * Listens to click event. Sets previous question.
 *
 * @type {HTMLElement} - Back button.
 * @listens testBackFormButton#click - Click event of button.
 */
testBackFormButton.addEventListener("click", async event => {
    event.preventDefault()
    let previousQuestion = questionsHandler.getPreviousQuestion()
    let peekedQuestion = questionsHandler.peekPreviousQuestion()
    if (previousQuestion !== undefined || testNextFormButton.disabled){
        testNextFormButton.disabled = false
    }
    if (peekedQuestion === undefined){
        testBackFormButton.disabled = true
    }
    setLabelText(previousQuestion)
})

/**
 * Listens to click event. Sets next question.
 *
 * @type {HTMLElement} - Next button.
 * @listens testNextFormButton#click - Click event of button.
 */
testNextFormButton.addEventListener("click", async event => {
    event.preventDefault()
    let nextQuestion = questionsHandler.getNextQuestion()
    let peekedQuestion = questionsHandler.peekNextQuestion()
    if (peekedQuestion === undefined){
        testNextFormButton.disabled = true
    }
    if (nextQuestion !== undefined || testBackFormButton.disabled){
        testBackFormButton.disabled = false
    }
    setLabelText(nextQuestion)
})

/**
 * Listens to click event. Removes form and show finish info
 *
 * @type {HTMLElement} - Finish button.
 * @listens testFinishFormButton#click - Click event of button.
 */
testFinishFormButton.addEventListener("click", async event => {
    event.preventDefault()
    try{
        await supervisor.stop()
        await supervisor.logout()
        switchToFinish()
    } catch (e) {
        alert("Internal server error")
        console.log(e)
    }
})


