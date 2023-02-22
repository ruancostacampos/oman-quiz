let currentQuestion = -1;
let currentAnswer = ""; 
let correctSound = new Audio("correct.mp3")
let wrongSound = new Audio("wrong.mp3")
let accerts = 0;
let confirmed = false;


let questions = [];
questions.push(
  {
    question: "What is the main source of water in Oman?",
    anwsers: "Groundwater,Surface water,Desalinated seawater",
    correct: "Desalinated seawater",
    explanation: "The majority of water consumed in Oman is from desalination of seawater. The country has a high reliance on desalination due to limited water resources and a hot and arid climate."
  },
  {
    question: "How much of Oman's water supply is from desalination?",
    anwsers: "25%,50%,75%",
    correct: "75%",
    explanation: "Approximately 75% of Oman's water supply is from desalination, with the rest coming from groundwater and surface water sources."
  },
  {
    question: "What is the main method of desalination used in Oman?",
    anwsers: "Reverse osmosis,Thermal desalination,Multi-stage flash distillation",
    correct: "Reverse osmosis",
    explanation: "The main method of desalination used in Oman is reverse osmosis, which uses high-pressure membranes to remove salt and other impurities from seawater."
  },
  {
    question: "What is the largest dam in Oman?",
    anwsers: "Al Ansab Dam,Al Ghubrah Dam,Al Nakhl Dam",
    correct: "Al Ghubrah Dam",
    explanation: "The Al Ghubrah Dam is the largest dam in Oman and is located near the capital city of Muscat. It is used for irrigation, drinking water, and industrial purposes."
  },
  {
    question: "What is the main use of water in Oman?",
    anwsers: "Domestic consumption,Industry,Agriculture",
    correct: "Domestic consumption",
    explanation: "The main use of water in Oman is for domestic consumption, followed by industrial and agricultural uses."
  },
  {
    question: "How does Oman manage its water resources to ensure sustainable supply?",
    anwsers: "By conserving and reusing wastewater,By importing water from neighboring countries,By limiting water usage for certain activities",
    correct: "By conserving and reusing wastewater",
    explanation: "Oman has implemented measures to conserve and reuse wastewater to ensure a sustainable supply of water. The country has invested in advanced wastewater treatment systems and has implemented strict regulations for water usage."
  }
)

function selectOption(e){

  if(confirmed) return;

  let confirmBtn = document.getElementById("confirmBtn");

  if(e.target.tagName === "UL") return;
  
  confirmBtn.disabled = false;
  let list = document.getElementById("optionsList").children;
  for(let i = 0; i<3; i++){
    list[i].classList.remove("active");
  }
  
  currentAnswer = e.target;
  e.target.classList.add("active");


}

function startQuiz(){
  document.getElementById("hideMe").style.visibility = "hidden";
  nextQuestion();
}

function confirm(){

  if(currentAnswer === "") return;  

  confirmed = true;
  
  // Correct
  if(currentAnswer.innerText === questions[currentQuestion].correct){
    let explanation = document.getElementById("explanation");
    let nextQuestion = document.getElementById("nextQuestion");
    explanation.innerHTML = questions[currentQuestion].explanation;
    currentAnswer.classList.remove("active");
    currentAnswer.classList.add("sucess");
    confirmBtn.disabled = true;
    nextQuestion.hidden = false;
    correctSound.play();
    accerts++;
    return;
  }

  if(currentAnswer.innerText !== questions[currentQuestion].correct){

    let list = document.getElementById("optionsList").children;
    
    for(let i = 0; i<3; i++){
      if(list[i].innerText === questions[currentQuestion].correct){
        list[i].classList.add("sucess");
      }
    }

    let explanation = document.getElementById("explanation");
    let nextQuestion = document.getElementById("nextQuestion");
    explanation.innerHTML = questions[currentQuestion].explanation;
    currentAnswer.classList.remove("active");
    currentAnswer.classList.add("wrong");
    confirmBtn.disabled = true;
    nextQuestion.hidden = false;
    wrongSound.play();
    return;
  }






}

function nextQuestion(){
  
  
  let optionsList = document.getElementById("optionsList")
  optionsList.disabled = false;
  currentQuestion++;

  //Reach the end of questions
  if(currentQuestion > questions.length - 1){
    let finalContainer = document.getElementById("finalContainer");
    let correctAnswersDisplay = document.getElementById("correctAnswersDisplay")
    correctAnswersDisplay.innerText = `Correct answers: ${accerts}/${questions.length}`
    finalContainer.style = "visibility: visible;"
    return;
  }

  confirmed = false;

  let nextQuestion = document.getElementById("nextQuestion");
  let anwsers = questions[currentQuestion].anwsers.split(',')
  let list = document.getElementById("optionsList").children;
  let question = document.getElementById("question");
  let explanation = document.getElementById("explanation");

  explanation.innerText = "..."
  nextQuestion.hidden = true;
  question.innerText = `${currentQuestion + 1}. ${questions[currentQuestion].question}`;
  
  for(let i = 0; i<3; i++){
    list[i].classList.remove("active")
    list[i].classList.remove("sucess")
    list[i].classList.remove("wrong")
    list[i].innerText = anwsers[i];
  }

  
}