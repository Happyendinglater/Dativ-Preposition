const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Der Kaffeeautomat steht jetzt _____.",
        choice1: "mit seinem Freund",
        choice2: 'nach einer Woche',
        choice3: 'außer Betrieb ',
    
        answer: 3,
    },
    {
        question: "Wir sehen nichts _____ unter uns.",
        choice1: "bei der Post ",
        choice2: "gegenüber einem Autofahrer",
        choice3: "außer dem Pazifik",
        
        answer: 3,
    },
    {
        question: "Berndt wohnt _____.",
        choice1: "bei seinen Großeltern ",
        choice2: "aus dem 20. Jahrhundert",
        choice3: "mit dem Tanzen",
        
        answer: 1,
    },
    {
        question: "Heiko kommt ursprünglich _____.",
        choice1: "beim Schlafen",
        choice2: "aus dem Norden ",
        choice3: "seit 2015",
        
        answer: 2,
    },
    {
        question: "Möchten Sie Milch _____?",
        choice1: "zu Ihrem Kaffee ",
        choice2: "nach Hamburg",
        choice3: "aus der Bank",
        
        answer: 1,
    },
    {
        question: "Unser Nachbar arbeitet _____.",
        choice1: "bei der Post",
        choice2: "nach München",
        choice3: "von dem Autor ",
        
        answer: 1,
    },
    {
        question: "Heute muss ich _____ der Bank anrufen.",
        choice1: "gegenüber",
        choice2: "bei ",
        choice3: "von",
        
        answer: 2,  
    },
    {
        question: "Ein so intelligentes Buch habe ich _____ Jahren nicht mehr gelesen.",
        choice1: "seit",
        choice2: "zu",
        choice3: "von",
        
        answer: 1,
    },
    {
        question: "Die Äpfel sind _____ Baum gefallen.",
        choice1: "zum",
        choice2: "vom",
        choice3: "außer",
        
        answer: 2,
    },
    {
        question: "Ich lebe gerade erst _____ kurzem als Veganer.",
        choice1: "außer",
        choice2: "seit",
        choice3: "bei",
        
        answer: 2,
    },
    {
        question: "Erik fährt die Kinder _____ Schule.",
        choice1: "zur",
        choice2: "nach",
        choice3: "zum",
        
        answer: 1,
    },
    {
        question: "Am Montag fliegt er _____ Amerika.",
        choice1: "nach",
        choice2: "zu",
        choice3: "zum",
        
        answer: 1,
    },
    {
        question: "Um wie viel Uhr sollten wir _____ euch kommen?",
        choice1: "zum",
        choice2: "zu",
        choice3: "zur",
        
        answer: 2,
    },
    {
        question: "Ich gehe morgen früh _____ Ärztin.",
        choice1: "zur",
        choice2: "zum",
        choice3: "nach ",
        
        answer: 1,
    },
    {
        question: "Ich laufe schnell _____ Bäcker und hole Brötchen.",
        choice1: "zur",
        choice2: "zum",
        choice3: "nach",
        
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 15

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()
