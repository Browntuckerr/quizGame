var questions = document.querySelector("#showQuestions");
var answers = document.querySelector("#results");
var endGame = document.querySelector("#endGame");
var alert = document.querySelector("#alert");
var answerBtns = [document.querySelector("#answer1"), document.querySelector("#answer2"), document.querySelector("answer3"), document.querySelector("answer4")]
playerName = document.querySelector("#playerName");

var questionNum = 0;
var scoresArray;
playerName.value = "";
var answerText = "";
var time = 10 * questions.length;
var timeLimit;




if (localStorage.getItem("localHighScore")){
    scoresArray = JSON.parse(localStorage.getItem("localHighScore"));
}else {
    scoresArray = [];
}

function startQuiz(){
    event.stopPropagation();
    document.querySelector("#title").style = "animation-play-state: running;"
    document.querySelector(".navbar-text").textContent = "Time: " + time;
    
    nextQuestion();
    
    setTimeout(function (){
        document.querySelector("#title").style = "display: none;";
        document.querySelector("#showQuestions").style = "display: block;";
        document.querySelector("#showQuestions").className = "slideUp";
        
    }, 500);
    
    timeLimit = setInterval(function (){
        time--;
        document.querySelector(".navbar-text").textContent = "Time: " + time;
        if (time <=0 ) {
            clearInterval(timeLimit);
            endGame();
        }
    }, 1000)
}

function nextQuestion() {
    var questionInfo = questions[questionNum];
    if (questionInfo == undefined){
        clearInterval(timeLimit);
        endGame();
        return;
    }
    setTimeout(function(){
        for(var i=0; i< answerBtns.length; i++){
            answerBtns[i].textContent = i + 1 +"."+questionInfo.choices[i];
            answerBtns[i].value = questionInfo.choices[i];
        }
        document.querySelector("#randomQuestions").textContent = questionInfo.title;
        questions.className = "questionFadeIn";
    },500);
}

function checkAnswer(){
    if(event.target.nodeName == "BUTTON"){
        var playerAnswer = event.target.value;
        if (playerAnswer){
            if (playerAnswer === questions[questionNum].answer){
                answerText = "Correct";
            }else {
                answerText ="Wrong";
                time -=15;
                if (time <= 0){
                    time = 0;
                }
            }
            answer.innerHTML = `<hr /> ${answerText}`
            if(answer.style != "display: block;"){
                answer.style = "display: block;";
            }
            answer.className = "answerSlideUp";
            setTimeout(function(){
                answer.className = "fadeAway";
                setTimeout(function(){
                    answer.style ="display: none;";
                }, 200);
            }, 700);
            question.className = "questionFadeOut";
        }
        questionNum++;
        nextQuestion();
    }
}

function endGame(){
    document.querySelector(".navbar-text").textContent = "Time: "+ time;
    if(time!=0){
        document.querySelector("#showScore").textContent = time;
    }else{
        document.querySelector("#showScore").textContent = "Blank";
    }
    if (question.className != "questionFadeOut"){
        question.className = "questionFadeOut";
    }
    setTimeout (function(){
        question.style = "display: none;";
        answer.style = "display:none;";
        endGame.style ="display: block;";
        endGame.className  ="slideDown";
    }, 500)
}

function submitAndSaveScore(event){
    event.preventDefault();
    if (playerName.value.trim() ==""){
        if(alert.style != "display:block;"){
            alert.style = "display:block;";
            setTimeout(function(){
                alert.style = "display:none;";
            },1000);
        }
        return;
    }else {
        var newHighScore = {
            name: playerName.value.toUpperCase().trim(),
            score: time
        };
        scoresArray.push(newHighScore);
        scoresArray.sort(function(a,b){return b.score - a.score});
        localStorage.setItem("localHighScores", JSON.stringify(scoresArray));
        window.location.href ="./highscores.html"
    }
}
document.querySelector("#startQuiz").onclick = startQuiz;
document.querySelector("#submit").onclick = submitAndSaveScore;
document.addEventListener("click", checkAnswer);
