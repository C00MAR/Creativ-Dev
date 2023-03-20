var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var scissors = document.getElementById("scissors");
var playerChoice = "";
var botList = ["rock", "paper", "scissors"];
var resp = document.getElementById("return");
var scoreText = document.getElementById("scoreTotal");
var Score = [0, 0]

function Jeux() {
    var botNumber = Math.floor(Math.random() * 3);
    var botChoice = botList[botNumber];
    if (botChoice == "rock" && playerChoice == "Paper") {
        Win()
    } else if (botChoice == "paper" && playerChoice == "Scissors") {
        Win()
    } else if (botChoice == "scissors" && playerChoice == "Rock") {
        Win()
    } else if (botChoice == "paper" && playerChoice == "Rock") {
        Loose()
    } else if (botChoice == "rock" && playerChoice == "Scissors") {
        Loose()
    } else if (botChoice == "scissors" && playerChoice == "Paper") {
        Loose()
    } else{
        resp.innerHTML = "Égalité"
    }
    console.log("Vous avez Joué : "+playerChoice)
    console.log("L'ordi à Joué : "+botChoice)
    console.log("Le score est de : "+Score)
    scoreText.innerHTML = "Joueur : "+Score[0]+" - "+Score[1]+" : Ordinateur"
}

// rock.addEventListener("click", changeValue);
// paper.addEventListener("click", changeValue);
// scissors.addEventListener("click", changeValue);

function changeValue() {
    playerChoice = this.value;
    resp.innerHTML = "Vous avez choisis : "+playerChoice
    console.log(playerChoice)
}

function Win() {
    Score[0] ++
    resp.innerHTML = "Vous avez Gagné"
    // confetti({
    //     spread: 90
    // });
}

function Loose() {
    Score[1] ++
    resp.innerHTML = "Vous avez Perdu"
}

function reset() {
    Score = [0, 0]
    scoreText.innerHTML = "Joueur : "+Score[0]+" - "+Score[1]+" : Ordinateur"
}

let handpose;
let video;
let predictions = [];

let handGesture;
let lastHandGesture;
let gestureStartTime = 0;
const gestureHoldDuration = 1500;

function setup() {
    createCanvas(640, 480);
    video = createCapture(VIDEO);
    video.size(width, height);

    handpose = ml5.handpose(video, modelReady);

    handpose.on("predict", results => {
        predictions = results;
    });

    video.hide();
}

function modelReady() {
    console.log("Model ready!");
}

function draw() {
    image(video, 0, 0, width, height);

    drawKeypoints();
    detectHandGesture();
}

function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
        const prediction = predictions[i];
        for (let j = 0; j < prediction.landmarks.length; j += 1) {
            const keypoint = prediction.landmarks[j];
            fill(0, 255, 0);
            noStroke();
            ellipse(keypoint[0], keypoint[1], 10, 10);
        }
    }
}

function detectHandGesture() {
    if (predictions.length > 0) {
        const thumbIsOpen = predictions[0].annotations.thumb[3][2] > predictions[0].annotations.thumb[0][2];
        const indexIsOpen = predictions[0].annotations.indexFinger[3][2] > predictions[0].annotations.indexFinger[0][2];
        const middleIsOpen = predictions[0].annotations.middleFinger[3][2] > predictions[0].annotations.middleFinger[0][2];
        const ringIsOpen = predictions[0].annotations.ringFinger[3][2] > predictions[0].annotations.ringFinger[0][2];
        const pinkyIsOpen = predictions[0].annotations.pinky[3][2] > predictions[0].annotations.pinky[0][2];
    
        const fingersOpen = [thumbIsOpen, indexIsOpen, middleIsOpen, ringIsOpen, pinkyIsOpen].filter(isOpen => isOpen).length;
    
        let handGesture;
    
        if (fingersOpen >= 4) {
            handGesture = 'Paper';
        } else if (fingersOpen === 0) {
            handGesture = 'Rock';
        } else if (fingersOpen === 2) {
            handGesture = 'Scissors';
        } else {
            handGesture = '???';
        }
        playerChoice = handGesture;
        resp.innerHTML = "Vous avez choisis : "+playerChoice

        if (handGesture === lastHandGesture) {
            const currentTime = new Date().getTime();
            if (currentTime - gestureStartTime > gestureHoldDuration) {
                gestureAction(handGesture);
                gestureStartTime = currentTime;
            }
        } else {
            gestureStartTime = new Date().getTime();
        }

        lastHandGesture = handGesture;

        textSize(32);
        fill(255, 0, 0);
        text(handGesture, 10, 40);
    }
    Jeux()
}

function gestureAction(gesture) {
    playerChoice = gesture;
    if (gesture === 'Main ouverte') {
        console.log('Action pour main ouverte');
    } else if (gesture === 'Poing') {
        console.log('Action pour poing');
    } else if (gesture === 'Ciseaux') {
        console.log('Action pour ciseaux');
    } else if (gesture === 'Autre geste') {
        console.log('Action pour autre geste');
    }
}