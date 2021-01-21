const startTestButton = document.querySelector(".startTestButton")
const testNextFormButton = document.querySelector(".testForm__nextButton")
const testBackFormButton = document.querySelector(".testForm__backButton")
const testFinishFormButton = document.querySelector(".testForm__finishButton")

const questionsHandler = new TestHandler()
const supervisor = new Supervisor({
    url: 'https://demo.proctoring.online'
})

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
    try{
        const questions = await fetch('https://proctor-edu-test.herokuapp.com/api/questions', {
            method: "POST"
        }).then(result => result.json())
        await supervisor.init({
            provider: 'jwt',
            token: await fetch('https://proctor-edu-test.herokuapp.com/api/sesstoken', {
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

        // then(function() {
        // switchToTest()
        // questionsHandler.setQuestions(questions)
        // setLabelText(questionsHandler.getNextQuestion())
        // return supervisor.start();
    // }) catch(function(err) {
    //     alert(err.toString());
    // });
})

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


