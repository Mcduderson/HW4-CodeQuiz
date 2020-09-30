// Array with questions, choices, and the answer.
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];
//Declaring global variables.
var time = 75;
var index = 0;
var interval = null;

//Finding the elements on page.
var startDiv = document.getElementById("startDiv");
var quizDiv = document.getElementById("quizDiv");
var timer = document.getElementById("timer");
var title = document.getElementById("title");
var start = document.getElementById("start");
var questionDiv = document.getElementById("questionDiv");
var finalScoreDiv = document.getElementById("finalScoreDiv");
var highScoreDiv = document.getElementById("highScoreDiv");
var scoreText = document.getElementById("scoreText");
var submitButton = document.getElementById("submitButton");
var initialsInput = document.getElementById("initialsInput");
var result = document.getElementById("result");

//function to start game, and reveal next html container. Also starts off the timer.
function startGame() {
    startDiv.setAttribute("class", "hidden");
    quizDiv.removeAttribute("class","hidden");
    
    interval = setInterval(quizTimer, 1000)
    timer.textContent = time
    generateQuiz();
    

}

//function to check choice against answer and penalize wrong answers, also keeps track of which question you are on and end the quiz when the end is reached.
function checkAns() {
    if(this.value !== questions[index].answer){
        result.textContent = "Wrong!"
        time -= 15;
        if(time < 0){
            time = 0;
        }
        timer.textContent = time; 
    }
    if(this.value === questions[index].answer){
        result.textContent = "Correct!"
    }
    index++;
    if(index===questions.length){
        endQuiz();
    }else{
        generateQuiz();
    }
}

//function that keeps the time and runs end quiz if time runs out.
function quizTimer() {
    time--;
    timer.textContent = time
    if(time<=0){
        endQuiz();
    }
}

//function to generate the questions and choice buttons. Also calls checkAns on click.
function generateQuiz (){
    var current = questions[index]
    title.textContent = current.title
    questionDiv.innerHTML = "";
    current.choices.forEach(function(choice, i){
        var makeButton = document.createElement("button")
        makeButton.setAttribute("value", choice);
        makeButton.textContent = choice;
        makeButton.onclick = checkAns
        questionDiv.appendChild(makeButton);
    })
}

//function to end quiz and reveal finalScoreDiv. Also displays score.
function endQuiz() {
    clearInterval(interval);
    quizDiv.setAttribute("class", "hidden");
    finalScoreDiv.removeAttribute("class", "hidden");
    scoreText.textContent = "Final Score is: " + time;
}

//function for the submit button, sets input to the local storage, and moves to the high score page.
function submitScore() {
    var initials = initialsInput.value;

    if (initials === "") {
        alert("Please enter initials.");

    } else {
        var finalScore = {
            initials: initials,
            score: time
        }
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];
        } else {
            allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        window.location.replace("./assets/highscore.html");
        }
    }

//on click events.
start.onclick = startGame;
submitButton.onclick = submitScore;