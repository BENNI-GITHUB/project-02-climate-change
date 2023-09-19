const intro = document.querySelector("#intro_container");
const introPage = document.querySelectorAll(".intro-item");
const startBtn = document.querySelector("#quiz_start");
const exitBtn = document.querySelector(".quiz-exit");

const quizTitle = document.querySelector(".quiz-title");
const quizBox = document.querySelector("#quiz_container");
const optionItems = document.querySelector("#options");
const nextQuestion = document.querySelector("#next_question");
const questionStatus = document.querySelector("#questionStatus");

const countdownNumber = document.querySelector("#countdown_number");
const timerRound = document.querySelector("#timer_round");
const timerContainer = document.querySelector("#countdown");

const resultBox = document.querySelector("#result");
const resultRestart = document.querySelector("#quiz_restart");
const resultExit = document.querySelector("#result_exit");

for (let i = 0; i < introPage.length; i++) {
    introPage[i].addEventListener("click", function () {
        this.classList.toggle("active");
        let introBody = this.children[1];
        if (introBody.style.display === "block") {
            introBody.style.display = "none";
        } else {
            introBody.style.display = "block";
        }
    });
}

exitBtn.onclick = () => {
    if (confirm("You pressed the exit button, Do you want to continue?!") == true) {
        close("quiz.html");
        open("index.html");
    };
};

startBtn.onclick = () => {
    intro.classList.add("display-none");
    quizBox.classList.remove("display-none");
    showQuestions(0);
    queCounter(1);
    counterTime();
};

let questionCounter = 0;
let questionNumber = 1;
let quizScore = 0;
let counter;

function showQuestions(num) {
    const questionText = document.querySelector("#question_txt");
    let questionTagNum = `<span>${questions[num].number}.${questions[num].question}</span>`;
    let optionTag = `<div class="option"><span>${questions[num].options[0]}</span></div><div class="option"><span>${questions[num].options[1]}</span></div><div class="option"><span>${questions[num].options[2]}</span></div><div class="option"><span>${questions[num].options[3]}</span></div>`;
    questionText.innerHTML = questionTagNum;
    optionItems.innerHTML = optionTag;
    timerContainer.appendChild(timerRound);
    const option = optionItems.querySelectorAll(".option");
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    };
}

function showNextQuestion() {
    if (questionCounter < questions.length - 1) {
        quizTitle.textContent = "Select the correct answer";
        questionCounter++;
        questionNumber++;
        showQuestions(questionCounter);
        queCounter(questionNumber);
        nextQuestion.classList.remove("show");
        countdownNumber.textContent = "20"
        clearInterval(counterX);
        countdown = 20;
        counterTime(countdown);
    } else {
        quizBox.classList.add("display-none");
        resultBox.classList.remove("display-none");
        showResult();
    }
}

nextQuestion.onclick = () => {
    showNextQuestion();
};

function queCounter(item) {
    const questionStatus = quizBox.querySelector("#questionStatus");
    let questionCounterTag = `<span><p>${item}</p> of <p>${questions.length}</p></span>`;
    questionStatus.innerHTML = questionCounterTag;
};

let tickIconTag = `<div class="icon tick"><i class="fas fa-check"></i></div>`;
let crossIconTag = `<div class="icon cross"><i class="fas fa-times"></i></div>`;
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCounter].answer;
    const allOptions = optionItems.children.length;
    timerRound.remove();
    clearInterval(counterX);
    if (userAnswer == correctAnswer) {
        quizScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
        quizTitle.textContent = "Great! Your answer is correct";
        countdownNumber.innerHTML = `<i class="	far fa-grin-stars" style="font-size:48px; line-height: 100px"></i>`
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        quizTitle.textContent = "Sorry! Your answer is incorrect";
        countdownNumber.innerHTML = `<i class="far fa-frown-open" style="font-size:48px; line-height: 100px"></i>`
        for (i = 0; i < allOptions; i++) {
            if (optionItems.children[i].textContent == correctAnswer) {
                optionItems.children[i].setAttribute("class", "option correct");
                optionItems.children[i].insertAdjacentHTML("beforeend", tickIconTag);
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        optionItems.children[i].classList.add("disabled");
    }
    nextQuestion.classList.add("show");
    setTimeout(showNextQuestion, 2000)
};

let countdown = 20;
const counterTime = () => {
    counterX = setInterval(function () {
        if (--countdown == 0) {
            quizTitle.textContent = "Time is Over";
            clearInterval(counterX);
            timerRound.remove();
            let correctAnswer = questions[questionCounter].answer;
            const allOptions = optionItems.children.length;
            nextQuestion.classList.add("show");
            setTimeout(showNextQuestion, 2000);

            for (i = 0; i < allOptions; i++) {
                if (optionItems.children[i].textContent == correctAnswer) {
                    optionItems.children[i].setAttribute("class", "option correct");
                    optionItems.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                }
            }
            for (i = 0; i < allOptions; i++) {
                optionItems.children[i].classList.add("disabled");
            }
        } else { countdown };
        countdownNumber.textContent = countdown;
        if (countdown <= 9) {
            let addZero = countdownNumber.textContent;
            countdownNumber.textContent = "0" + addZero;
        }
    }, 1000);
};

function showResult() {
    intro.remove();
    let percentage = 0;
    const progressText = document.querySelector("#percentage");
    const progressCircle = document.querySelector('.progress-circle');

    function updateProgress() {
        percentage++;
        if (quizScore == 0) {
            progressText.textContent = "0%";
            percentage = 0;
        } else {
            progressText.textContent = `${percentage}%`;
        }
        progressCircle.style.background = `conic-gradient(
#3498db ${percentage}%, 
#f0f0f0 ${percentage}%
)`;

        if (percentage < (quizScore * 10)) {
            requestAnimationFrame(updateProgress);
        }
        const scoreText = resultBox.querySelector("#score_text");
        if (quizScore == 10) {
            let scoreTag = `<p>Excellent ! You answered all the questions correctly</p>`;
            scoreText.innerHTML = scoreTag;
        } else if (quizScore > 7) {
            let scoreTag = `<p>Great! You answered <span>${quizScore}</span> of <span>${questions.length}</span></p>`;
            scoreText.innerHTML = scoreTag;
        }
        else if (quizScore > 4) { 
            let scoreTag = `<p>Well Done! You answered <span>${quizScore}</span> of <span>${questions.length}</span></p>`;
            scoreText.innerHTML = scoreTag;
        }
        else if (quizScore > 0) {  
            let scoreTag = `<p>Good! You answered <span>${quizScore}</span> of <span>${questions.length}</span></p>`;
            scoreText.innerHTML = scoreTag;
        }
        else { 
            let scoreTag = `<p>Sorry! You Couldn't answer any of the questions<span></p>`;
            scoreText.innerHTML = scoreTag;
        }
    }
    updateProgress();
    
    resultExit.onclick = () => {
        open("index.html");
        close("quiz.html");
    };
    resultRestart.onclick = () => {
        close("quiz.html");
        open("quiz.html");
    };
}


