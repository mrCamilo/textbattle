// Load inquirer for battle options (attack, block, items, printInfo, run)
var inquirer = require("inquirer");

// Game 
// At the start of the game call create character function
createChar();
startBattle();

// Create a character at the start of the game: asks name, gender, and class
function createChar() {
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
    });

    //
    battle() {

    }
}
