const questions = [
    {
        question: "Which is the largest animal in the world",
        answers: [
            {text: "Blue whale", correct: true},            
            {text: "Shark", correct: false},            
            {text: "Elephant", correct: false},            
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question: "Which is the smallest continent in the world",
        answers: [
            {text: "Asia", correct: false},            
            {text: "Australia", correct: true},            
            {text: "Artic", correct: false},            
            {text: "Africa", correct: false}
        ]
    },
    {
        question: "Which is the largest desert in the world",
        answers: [
            {text: "Kalahari", correct: false},            
            {text: "Gopi", correct: false},            
            {text: "Sahara", correct: false},            
            {text: "Antarctica", correct: true}
        ]
    },
    {
        question: "Which is the smallest country in the world",
        answers: [
            {text: "Vatican", correct: true},            
            {text: "India", correct: false},            
            {text: "USA", correct: false},            
            {text: "Germany", correct: false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        console.log(button.dataset.correct);
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }    
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}

startQuiz();

