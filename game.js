// Load inquirer for battle options (attack, block, items, printInfo, run)
var inquirer = require("inquirer");
const chalk = require('chalk')
var hitpoints = 30;
var enemyhitpoints = 40;

// Game 
// At the start of the game call create character function
game();

// Create a character at the start of the game: asks name, gender, and class
function game() {
    console.log(chalk.yellow("Welcome to the start of your adventure!"));
    console.log(chalk.green("Before we start, I just have a few questions..."));
    inquirer.prompt
        ([
            {
                type: "input",
                name: "name",
                message: "What is your name?"
            },
            {
                type: "list",
                name: "gender",
                message: "Gender?",
                choices: ["F", "M", "Neutral"]
            },
            {
                type: "list",
                name: "class",
                message: "Choose your class!",
                choices: ["Knight", "Mage", "Monk", "Thief"]
            }
        ]).then(function (charStats) {
            // based on the character the user chose, the hero will have different stats which are initialized here
            if (charStats.class === "Knight") {
                var hitpoints = 100;
                var damage = 50;
                var defense = 75;
                var luck = 15;
            }
            else if (charStats.class === "Mage") {
                var hitpoints = 50;
                var damage = 30;
                var defense = 40;
                var luck = 30;
            }
            else if (charStats.class === "Monk") {
                var hitpoints = 90;
                var damage = 60;
                var defense = 65;
                var luck = 20;
            }
            else // Thief
            {
                var hitpoints = 40;
                var damage = 40;
                var defense = 20;
                var luck = 50;
            }

            // Once the character is set up, the first battle can start
            battle();
        }
        );

}

// The names of random enemies are stored here, which are used in the battle function
function randomEnemy()
{
    var enemyName = ["", "Chocobo", "Crawler", "Dragon", "Diver Nest"];
    var random = Math.floor(Math.random() * (+5 - +1) + +1);
    return enemyName[random];
}

// Run this function for every battle
function battle(enemyName) 
{
    var enemyName = randomEnemy();
    console.log("You encountered a " + enemyName + "!");
    console.log(chalk.red("Battle Start!"));
    inquirer.prompt
        ([
            {
                type: "list",
                name: "Menu",
                choices: ["Attack!", "Guard!", "Enemy Info!", "Run away!"]
            }
        ]).then(function (battleChoices) {
            if (battleChoices.Menu === "Attack!") {
                attack();
            }
            else if (battleChoices.Menu === "Guard!") {
                guard();
            }
            else if (battleChoices.Menu === "Enemy Info!") {
                displayInfo();
            }
            else {
                runAway();
            }
        });
}

// this function goes when you attack an enemy
function attack() {
    console.log("ATACK!!!!!!!");
}

// function to guard (more defensive)
function guard() {
    console.log("guard");
}

// function to print stats
function displayInfo() {
    console.log("print all the stats")
}

// function to run away
function runAway() {
    var dealDamage = 4;
    // theres a 50% chance of escaping, but you take some damage if you fail to run away
    switch (Math.floor(Math.random() * 2)) {
        // Successful Escape attempt
        case 0:
            console.log("You narrowly escaped!")
            break;
        // failed escape (battle continues)
        case 1:
            console.log("You failed to escape! Take " + dealDamage + " points of damage!!");
            console.log("The battle continues...");
            battle();
            hitpoints -= dealDamage;
            console.log(hitpoints)
            break;
    }
}