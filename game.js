// Load inquirer for battle options (attack, block, items, printInfo, run)
var inquirer = require("inquirer");
const chalk = require('chalk')
// initialized at 0 but are changed after class is chosen
var player = {
    strength: 0,
    hitpoints: 0,
    strength: 0,
    defense: 0,
    luck: 0
}

// Game
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
            // Set different values based on knight, mage, monk, or thief
            if (charStats.class === "Knight") {
                player.hitpoints = 100;
                player.strength = 5;
                player.defense = 7;
                player.luck = 1;

            }
            else if (charStats.class === "Mage") {
                hitpoints = 50;
                strength = 3;
                defense = 4;
                luck = 30;
            }
            else if (charStats.class === "Monk") {
                hitpoints = 90;
                strength = 6;
                defense = 5;
                luck = 2;
            }
            else // Thief
            {
                hitpoints = 40;
                strength = 4;
                defense = 2;
                luck = 5;
            }

            // Once the character is set up, the first battle can start
            battle();
        }
        );

}

// The names of random enemies are stored here, which are used in the battle function
function randomEnemy() {
    var enemyName = ["", "Chocobo", "Crawler", "Dragon", "Slime"];
    var random = Math.floor(Math.random() * (+5 - +1) + +1);
    return enemyName[random];
}


// Run this function for every battle
function battle() {
    var enemy = randomEnemy();
    console.log("You encountered a " + enemy + "!"); // This text should only appear ONCE, at the start of the battle
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
            else { // Escape (50/50 success)
                runAway();
            }
        });
}

// this function goes when you attack an enemy
function attack() {
    var damage = 4;
    console.log("Dealt " + damage + " damage to the enemy.");
    player.hitpoints -= damage;
    // console.log(game.name + "HP:" + hp);
    console.log("Strength: " + player.strength);
    console.log("Hitpoints: " + player.hitpoints);
}

// function to guard
function guard() {
    console.log("guard");
}

// function to run away
function runAway() {
    var damage = Math.floor(Math.random() * (+10 - +4) + +4);
    // theres a 50% chance of escaping, but you take some damage if you fail to run away
    switch (Math.floor(Math.random() * 2)) {
        // Successful Escape attempt
        case 0:
            console.log("You narrowly escaped!")
            break;
        // failed escape (battle continues)
        case 1:
            console.log("You failed to escape! Take " + damage + " points of damage!!");
            console.log("The battle continues...");
            battle();
            player.hitpoints -= damage;
            console.log(player.hitpoints)
            break;
    }
}