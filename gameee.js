"use strict";

// Load inquirer for battle options (attack, block, items, printInfo, run)
const inquirer = require("inquirer");
const chalk = require('chalk')
var hitpoints = 0;

//store char stats in an object
//var stats = [];

// All the functions for the game are called here
// At the start of the game call create character which sets stats based on class
startGame();


// Console log those stats (hitpoints, damage, defense, and luck)
//console.log(hitpoints);

// Create a character at the start of the game: asks name, gender, and class
function startGame() {
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
                message: "Choose your class",
                choices: ["Knight", "Mage", "Monk", "Thief"]
            }
        ]
        ).then(function (charStats) {
            // based on the character the user chose, the hero will have different stats which are initialized here
            if (charStats.class === "Knight") {
                let hitpoints = 100;
                let damage = 50;
                let defense = 75;
                let luck = 15;
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
        }
            // Start the game
            //     console.log("You enter the dungeon and encounter your first enemy...")
            //      Once the character is called, the first battle can start
            //     battle();
        )
}


