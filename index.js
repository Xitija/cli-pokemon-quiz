//bonus homework: use chalk
import chalk from 'chalk';
import readlineSync from 'readline-sync';
//var readlineSync = require("readline-sync");
//const chalk = require('chalk');

var questions = [{
// level 1
  question: `
  	What is a Pokemon? 
  	a: A talking animal
  	b: A magical monster with special powers
  > `,
	answer: "b"
},
{
  question: `
  	What is a 'Pokeball' used for?
  	a: To capture and store Pokemon 
  	b: To charge Pokemon energy
  > `,
	answer: "a"
},
{
  question: `
  	Which of these Pokemon can talk?
  	a: Pikachu
  	b: Meowth
  > `,
  answer: "b"
},
{
  question: `
  	How does a Pokemon evolve?
  	a: When they reach a certain level of training 
  	b: When they die and regenerate 
  > `,
  answer: "a"
},
{
  question: `
  	What's the show's catch phrase? 
  	a: Gotta Catch a Few
  	b: Gotta Catch Them All 
  > `,
  answer: "b"
},
//level 2
{
  question: `
  	What does the word 'Pokemon' mean in Japanese? 
  	a: Pocket Monster
  	b: Monster Ball
  > `,
  answer: "a"
},
{
  question: `
  	What is the name of duo well known for kidnapping Pokemons?
  	a: Team Evil
  	b: Team Rocket
  > `,
  answer: "b"
},
{
  question: `
  	Loveable inept rogues Team Rocket have been trying to catch Ash's Pikachu for decades. What are their names?
  	a: Jessie and James
  	b: Jenny and James
  > `,
  answer: "a"
},
//level 3
{
  question: `
  	What is Ash's surname?
  	a: Ketchum
  	b: Katchum
  > `,
  answer: "a"
}
,{
  question: `
  	Who was the voice of Detective Pikachu in the eponymous movie?
  	a: Justice Smith
  	b: Ryan Reynolds
  > `,
  answer: "b"
}]

function log(str){
  console.log(str);
}

function checkLeapYear(userBirthYear){
//bonus exercise : leap year
  if(userBirthYear >1950 && userBirthYear <2023){
    if (userBirthYear % 400 == 0) {
     return (chalk.magentaBright("Your birth year "+ userBirthYear+ " is a Leap Year"));
    }
    else if (userBirthYear % 100 == 0) {
      return (chalk.magentaBright("Your birth year "+ userBirthYear+ " is not a Leap Year"));
    }
    else if (userBirthYear % 4 == 0) {
      return (chalk.magentaBright("Your birth year "+ userBirthYear+ " is a Leap Year"));
   }
   else {
      return (chalk.magentaBright("Your birth year "+ userBirthYear+ " is not a Leap Year"));
   }
  }
  else{
    log(chalk.bgRed.bold(`Invalid Birth Year`));
    try{
      throw new Error();
    }
    catch (e) {
      process.exit(1);
    }
  }
}

function play(que,ans,idx){

  var userAnswer;
  //bonus homework: explore readlineSync
  if(idx % 2 == 0)
    userAnswer = readlineSync.keyIn(chalk.cyan(que), {limit: 'ab'});
  else
    userAnswer = readlineSync.keyIn(chalk.magenta(que), {limit: 'ab'});
    
  if (userAnswer === ans){
    score++;
    log(chalk.green("You are right!!"));
  }
  else{
    score--;
    log(chalk.red("You are wrong!!"));
  }
  log(chalk.rgb(105, 62, 168)("Your Current Score: "+score));
  log(chalk.gray("........................................."));
}

function checkLevel(){
  if(score == 5 && level == 1){
    level++;
    log(chalk.rgb(52, 250, 59).bold.underline("Hurray! Level 2 !\n"));
    showQuestions(5,8);
  }
  if(score == 8 && level == 2){
    level++;
    log(chalk.rgb(52, 250, 59).bold.underline("Hurray! Level 3 !!\n"));
    showQuestions(8,10);
  }
}

function showQuestions(start,end){
  for(var i=start;i < end;i++){
    log(i+1);
    play(questions[i].question,questions[i].answer,i)
  }
  checkLevel();
}
  
var highScores = [
  {name : "KK" , score : 10},
  {name : "Probro", score : 10}
]

function showHighScores(){
  log(chalk.bgBlack("\n  HighScore Chart  \n Name \t\t Score "));
  for(var i = 0; i < highScores.length ; i++)
    log(chalk.bgRgb(41, 12, 232)(highScores[i].name + "\t\t" + highScores[i].score));
    //bonus homework: has the user beaten high score?
  for(var i = 0; i < highScores.length ; i++){
    if(score >= highScores[i].score)
      log(chalk.rgb(19, 247, 7).bold("\nYou have beaten the highscore please share screenshot !"));
    break;
  }

  if(score >= 3 && score <= 5){
    log(chalk.rgb(255, 243, 20).bold("\n Cool! You earned a star!"));
    log(chalk.rgb(255, 243, 20).bold(' \u2605'));
  }
  else if(score >= 6 && score <= 8) {
    log(chalk.rgb(255, 243, 20).bold("\n Congrats! You earned 2 stars!!"));
    log(chalk.rgb(255, 243, 20).bold(' \u2605 \u2605'));
  }
  else if(score == questions.length){
    log(chalk.rgb(255, 243, 20).bold("\n WoooHoo! You earned 3 stars!!!"));
    log(chalk.rgb(255, 243, 20).bold(' \u2605 \u2605 \u2605'));
  }
    log(chalk.bgWhiteBright.rgb(250, 5, 123).bold("\n "+userName.toUpperCase() + " Your Score is : " + score+" "));
}

function playAgain(){
  //bonus homework: explore readlineSync
  var choice = readlineSync.keyInYN('\nDo you want to Play Again?');
  if(choice){
    score = 0;
    level = 1; 
    showQuestions(0,5);
    showHighScores();
    playAgain();
  }
}


var score = 0;
var level = 1; 

var userName = readlineSync.question("Enter your name: ");
var userBirthYear = readlineSync.question("Enter your birth year: ");

log(chalk.rgb(255, 136, 0).bold("Hello "+ chalk.bgRgb(109, 8, 140).bold(userName) +"\n"+checkLeapYear(userBirthYear)+"\nWelcome to Do you know Pokemon?!"));


showQuestions(0,5);
showHighScores();
playAgain();
