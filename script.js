const title = document.getElementById("title");
const description = document.getElementById("description");
const start = document.getElementById("start");
const restart = document.getElementById("restart");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD= document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Commonly used data types DO NOT include:",
        imgSrc : "images/Data-Types.png",
        choiceA : "strings",
        choiceB : "booleans",
        choiceC : "alerts",
        choiceD: "numbers",
        correct : "C"
    },{
        question : "The condition in an if/else statement is enclosed within _____.",
        imgSrc : "images/If-Else.png",
        choiceA : "quotes",
        choiceB : "curly brackets",
        choiceC : "parentheses",
        choiceD: "square brackets",
        correct : "C"
    },{
        question : "Arrays in JavaScript can be used to store _____.",
        imgSrc : "images/Array.png",
        choiceA : "numbers and strings",
        choiceB : "other arrays",
        choiceC : "booleans",
        choiceD : "all of the above",
        correct : "D"
    },{
        question : "String values must be enclosed within _____ when being assigned to variables.",
        imgSrc : "images/Strings.png",
        choiceA : "commas", 
        choiceB : "curly brackets",
        choiceC : "quotes",
        choiceD : "parentheses",
        correct : "C"
    },{
        question : "A very useful tool used during development and debugging for printing content to the debugger is:",
        imgSrc : "images/Debug.png",
        choiceA : "JavaScript", 
        choiceB : "terminal/bash",
        choiceC : "for loops",
        choiceD : "console.log",
        correct : "D"
    }

];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 15; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    title.style.display = "none";
    start.style.display = "none";
    description.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 100) ? "images/100.png" :
              (scorePerCent >= 80) ? "images/80.png" :
              (scorePerCent >= 60) ? "images/60.png" :
              (scorePerCent >= 40) ? "images/40.png" :
              (scorePerCent >= 20) ? "images/20.png" :
              "images/0.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>Your score is "+ scorePerCent +"%!</p>";
}
