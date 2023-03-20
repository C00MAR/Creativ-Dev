// var play = document.getElementById("FRAME") // A CHANGER AVEC ML5.JS  
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
    if (botChoice == "rock" && playerChoice == "paper") {
        Win()
    } else if (botChoice == "paper" && playerChoice == "scissors") {
        Win()
    } else if (botChoice == "scissors" && playerChoice == "rock") {
        Win()
    } else if (botChoice == "paper" && playerChoice == "rock") {
        Loose()
    } else if (botChoice == "rock" && playerChoice == "scissors") {
        Loose()
    } else if (botChoice == "scissors" && playerChoice == "paper") {
        Loose()
    } else{
        resp.innerHTML = "Égalité"
    }
    console.log("Vous avez Joué : "+playerChoice)
    console.log("L'ordi à Joué : "+botChoice)
    console.log("Le score est de : "+Score)
    scoreText.innerHTML = "Joueur : "+Score[0]+" - "+Score[1]+" : Ordinateur"
}

rock.addEventListener("click", changeValue);
paper.addEventListener("click", changeValue);
scissors.addEventListener("click", changeValue);

function changeValue() {
    playerChoice = this.value;
    resp.innerHTML = "Vous avez choisis : "+playerChoice
    console.log(playerChoice)
}

function Win() {
    Score[0] ++
    resp.innerHTML = "Vous avez Gagné"
    confetti({
        spread: 90
    });
}

function Loose() {
    Score[1] ++
    resp.innerHTML = "Vous avez Perdu"
}