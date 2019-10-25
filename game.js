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

var numBattles = 0;

// Create a character at the start of the game: asks name, gender, and class
// function game() {
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


    );

// function to start battle (shows "enemy text" and "battle start")
function startBattle() {
    console.log(numBattles);
    if (numBattles > 0) {
        console.log(chalk.yellow("VICTORY!"));
        console.log(player.name + " moves further into the dungeon...");
        numBattles++;
    }

    // if player hitpoints are less than or equal to 0 (dead), console log GAME OVER and end game...
    if (player.hitpoints <= 0) {
        gameOver();
    }
    // Reset the enemy HP in this area, and say what the enemy is
    enemy.hitpoints = 20;
    var enemyname = randomEnemy();
    console.log(player.name + " the " + player.class + " encountered a " + enemyname + "!");
    console.log(chalk.red("Battle Start!"));
    battleMenu();
}

// The names of random enemies are stored here, which are used in the battle function
function randomEnemy() {
    var enemyArray = ["", "Chocobo", "Crawler", "Dragon", "Slime"];
    thisEnemy = enemyArray[Math.floor(Math.random() * (+5 - +1) + +1)]; // pick a random enemy from this array
    enemy.name = thisEnemy;
    return thisEnemy;
}


// Run this function for every battle
function battleMenu() {
    

    // if the enemy has 0 hp, then end the battle and move onto the next one
    if (enemy.hitpoints <= 0) {
        console.log(chalk.blue(player.name + " has defeated the " + enemy.name));
        console.log("Gained " + chalk.blue("50") + " experience points!");
        numBattles++;
        // then this function is called to move onto the next battle
        startBattle();
    }

    // if battle is NOT over, continue printing this options menu
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
    console.log("Dealt " + player.strength + " damage to the enemy.");
    enemy.hitpoints -= player.strength; // subtract damage
    showEnemyHP();
    // enemy turn
    console.log(enemy.name + " attacks!");
    console.log(enemy.name + " deals " + enemy.strength + " damage to " + player.name);
    player.hitpoints -= player.strength;
    showPlayerHP();
    if (enemy.hitpoints > 0 && player.hitpoints > 0) {
        battleMenu();
    }
    if (enemy.hitpoints <= 0 || player.hitpoints <= 0) {
        startBattle();
    }
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
            player.hitpoints -= damage;
            console.log(player.hitpoints)
            battleMenu();
            break;
    }
}

// functions to show HP every turn
function showPlayerHP() {
    console.log(player.name + " HP: " + player.hitpoints);
}
function showEnemyHP() {
    console.log(enemy.name + " HP: " + enemy.hitpoints);
}

function gameOver() {
    console.log(player.name + " has fallen!");
    console.log(player.name + "'s journey has come to an end.");
    showPlayerHP();
    console.log(chalk.red("GAME OVER"));
    process.exit();
}
