// Load inquirer for battle options (attack, block, items, printInfo, run)
var inquirer = require("inquirer");
const chalk = require('chalk')

// initialized at 0 but are changed after class is chosen
var player = {
    name: "",
    class: "",
    strength: 0,
    hitpoints: 0,
    defense: 0,
    luck: 0
}

var enemy = {
    name: "",
    strength: 6,
    hitpoints: 12,
    defense: 0,
    luck: 0
}

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
            player.hitpoints = 50;
            player.strength = 3;
            player.defense = 4;
            player.luck = 30;
        }
        else if (charStats.class === "Monk") {
            player.hitpoints = 90;
            player.strength = 6;
            player.defense = 5;
            player.luck = 2;
        }
        else // Thief
        {
            player.hitpoints = 10;
            player.strength = 4;
            player.defense = 2;
            player.luck = 5;
        }
        // Sets name and class equal to whatever was chosen above
        player.name = charStats.name;
        player.class = charStats.class;
        // Once the character is set up, the first battle can start
        startBattle();
    }