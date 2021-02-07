const { start } = require("repl");

var requests = {
    "boxdale1023" : {
        "origin" : "boxdale",
        "contents" : "Letters",
        "destination" : "Chickenface",
        "broken" : false,
        "packaged" : false
    }
}

var money = 0;
var lives = 4;

function registerCommand(key) {
    if (key === 13) {
        command(document.getElementById("input").value);
    }
}

function command(text) {
    var command = parse(text.toLowerCase());
    printDisplay(command);
    document.getElementById("input").value = "";
}

function fix(object) {
    if (requests[object]["broken"] === false) {
        return object + " already fixed";
    } else {
        requests[object]["broken"] = false;
        money -= 48;
        return object + " no longer broken";
    }
}
function parse(text) {
    var an = text.split(".");
    var object = an[0];
    if (an.length > 1) {
        if (object in requests) {
            // MULTI WORD COMMANDS
            var attribute = an[1];
            if (attribute.endsWith("()") === true) {              
                //FUNCTION
                if (attribute === "fix()") {
                    return fix(object);
                } else {return "Invalid function"}
            } else {
                //PROPERTY
                if (attribute in requests[object]) {
                    return "Shipment: " + object + " " + attribute + ": " + requests[object][attribute];
                } else {return "Invalid property"}
            }
        }
    } else {
        // SINGLE WORD COMMANDS
        if (object === "help") {
            //ASKING FOR HELP
            return "Help message goes here"
        } else if (object in requests) {
            //ASKING FOR FULL REQUEST INFORMATION
            return JSON.stringify(requests[object]);
        } else if (object === "start") {
            startGame();
        }
    }
    return "invalid command"
}

function printDisplay(text) {
    document.getElementById("display").innerHTML += "> " + text + "<br>";
}