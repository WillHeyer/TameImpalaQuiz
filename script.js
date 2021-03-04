var startButton = document.getElementById('start-btn')
var questionContainerElement = document.getElementById('question-container')
var questionBoxElement = document.getElementById('questionBox')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var endScreenElement = document.getElementById('game-over')
var timeLeft = parseInt(document.getElementById('time').textContent);

var mixQuestions, currentQuestionIndex
var mixAnswers, currentQuestionIndex

var count = 0;
let quizTime = 80;
let timer;
var timeId = "";

var questions = [
    {
        question: 'Who is the lead singer of Tame Impala?',
        answers: [
            {text: 'Jay Watson', correct: false},
            {text: 'Lebron James', correct: false},
            {text: 'Will Heyer', correct: false},
            {text: 'Kevin Parker', correct: true},
        ]
    },
    {
       question: 'Which is not a Tame Impala Album?',
       answers: [
           {text: 'Innerspeaker', correct: false},
           {text: 'The Sound of Music', correct: true},
           {text: 'Currents', correct: false},
           {text: 'The Slow Rush', correct: false}
       ]
    },
    {
       question: 'How old is Kevin Parker',
       answers: [
           {text: '35', correct: true},
           {text: '4', correct: false},
           {text: '11', correct: false},
           {text: '92', correct: false}
       ]
    },
    {
       question: 'Who stole one of their songs?',
       answers: [
           {text: '“Drake', correct: false},
           {text: '“The Wiggles”', correct: false},
           {text: '“Rihanna”', correct: true},
           {text: '“Nobody”', correct: false}
       ]
    },
    {
       question: 'Where was Kevin Parker born?',
       answers: [
           {text: 'Australia', correct: true},
           {text: 'America', correct: false},
           {text: 'Egypt', correct: false},
           {text: 'Sri Lanka', correct: false}
       ]
    },
    {
       question: 'Who is a massive Tame Impala fan',
       answers: [
           {text: 'Drake', correct: false},
           {text: 'Kenny Chesney', correct: false},
           {text: 'Justin Bieber', correct: false},
           {text: 'Travis Scott', correct: true},

       ]
    },
    {
       question: 'What is known as their best album?',
       answers: [
           {text: 'Currents', correct: true},
           {text: 'Innerspeaker', correct: false},
           {text: 'The Slow Rush', correct: false},
           {text: 'The Slim Shady LP', correct: false}
       ],
    }
   ]

   function setTimer(){
    timeId=setInterval(function() {
        quizTime--;
        time.textContent= quizTime;
        if (quizTime<=0){
            quizTime=0;
            time.textContent="Time's up!";
            clearInterval(timeId);
        }
    },1000)
}


startButton.addEventListener('click', startGame); 

function startGame () {
    setTimer();

startButton.classList.add('hide')
mixQuestions = questions.sort(() => Math.random() - .5)

currentQuestionIndex = 0
questionContainerElement.classList.remove('hide')
setNextQuestion()
}

function setNextQuestion(){
    resetState()
    showQuestion(mixQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    var selectedButton   = e.target
    var correct = selectedButton.dataset.correct
    setQuestionClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setQuestionClass(button, button.dataset.correct)
    })
    if(correct) { count++

    } else { 
        if (quizTime-15 < 0) {
            quizTime = 0
        } else {
            quizTime = quizTime - 15; 
        } 
    } 
    if (quizTime < 0) {
        endGame();
    }
    if (mixQuestions.length > currentQuestionIndex + 1 && quizTime > 0) {
        console.log(quizTime) 
        showQuestion
     } else {
       endGame();
     }
    currentQuestionIndex++;

    setTimeout(setNextQuestion, 1000);
}

function endGame() {
    questionBoxElement.classList.add('hide');
    endScreenElement.classList.remove('hide');
    clearInterval(timeId);
    time.textContent =  "Game Over";
    endScreenElement.innerHTML = "Game Over! Score: " + quizTime;

    var gameOverSubmission = document.createElement("p");
    gameOverSubmission.textContent="Submit your Highscore!"
    var nameInput = document.createElement("input");
    nameInput.setAttribute("placeholder", "First Name");
    nameInput.setAttribute("id", "name");
    var submitButton = document.createElement("button");
    submitButton.textContent="Click to submit";
    submitButton.addEventListener("click", scoreSubmission);
    endScreenElement.append(gameOverSubmission);
    endScreenElement.append(nameInput);
    endScreenElement.append(submitButton);
}
function scoreSubmission(){
    var scoreArr = JSON.parse(localStorage.getItem("Highscores"));
    var addScore = {
        name: document.getElementById("name").value,
        score: quizTime
    }
    if(scoreArr){
        scoreArr.push(addScore);
    } else {
        scoreArr=[addScore];
    }
    localStorage.setItem("Highscores", JSON.stringify(scoreArr));
    viewHighscores();
}

function setQuestionClass(element, correct) {
    clearQuestionClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearQuestionClass(element) {
    element.classList.remove('remove')

}
function viewHighscores(){
    let scoreArr = JSON.parse(localStorage.getItem("Highscores"));
    questionContainerElement.classList.add('hide');
    endScreenElement.classList.remove('hide');
    endScreenElement.innerHTML="";
    if(scoreArr.length>1){
        scoreArr.sort((a, b) => (a.score - b.score) ? true : false);
    }
    for(let i=0; i<scoreArr.length; i++){
        var HighScoreP = document.createElement("p");
        HighScoreP.textContent=scoreArr[i].name+": "+scoreArr[i].score;
        endScreenElement.append(HighScoreP);
    }

    var redoButton = document.createElement("button");
    redoButton.textContent="Try Again?"
    redoButton.addEventListener("click", function (){
        location.reload()
    });
    endScreenElement.append(redoButton);
}
console.log(document.getElementById("Highscores"))
document.getElementById("Highscores").addEventListener("click", viewHighscores)
