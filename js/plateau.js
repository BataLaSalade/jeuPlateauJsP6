var $row = $("<div />", {
    class: 'line'

});
var $square = $("<div />", {
    class: 'square'
});
var $obstacle = $("<div />", {
    class : "obstacle"
});
var $player = $("<div />", {
    class : "player"
});
var $weapon = $("<div />", {
    class : "weapon"
});

var Position = {
    colIndex : 0,
    rowIndex : 0,
    setPosition: function(colIndex, rowIndex){
        this.colIndex = colIndex;
        this.rowIndex = rowIndex;
    },
    initRandomPosition: function(colMaxIndex, rowMaxIndex) {
        this.colIndex = this.genRandomPosition(0, colMaxIndex);
        this.rowIndex = this.genRandomPosition(0, rowMaxIndex);
    },
    genRandomPosition: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    isSamePosition: function(positionToCompare) {
        return this.colIndex == positionToCompare.colIndex && this.rowIndex == positionToCompare.rowIndex;
    },
    setPositionFromDirection : function(direction, currentPosition, index) {
        switch (direction) {
            case "R":
                this.setPosition(currentPosition.colIndex + index, currentPosition.rowIndex);
                break;
            case "L":
                this.setPosition(currentPosition.colIndex - index, currentPosition.rowIndex);
                break;
            case "T":
                this.setPosition(currentPosition.colIndex, currentPosition.rowIndex + index);
                break;
            case "B":
                this.setPosition(currentPosition.colIndex, currentPosition.rowIndex - index);
                break;
            default:
                break;
        }  
    },
    isOnTheMap : function () {
        return this.colIndex >= 0 && this.colIndex < map.columns && this.rowIndex >= 0 && this.rowIndex < map.rows;
    }
}

var Obstacle = {
    init: function (position){
        this.position = position;
    }
};


var Player = {
    init : function (position, characterName, weapon){
        this.nom = ""; // a saisir par l'utilisateur
        this.position = position;
        this.sante = 100;
        this.characterName = characterName;
        this.weapon = weapon;
        this.listAvailablePosition = [];
    },
    createPositionToMove0 : function (objectPositionRow, objectPositionCol) {
        var nbMovements = 3;
        for ( var i = -nbMovements; i < (nbMovements+1); i++) {
            if (i != 0) {
                if (objectPositionCol+i >= 0 && objectPositionCol+i <= map.columns-1) {
                    var positionToMove = Object.create(Position);
                    positionToMove.setPosition(objectPositionCol+i, objectPositionRow);
                    this.listAvailablePosition.push(positionToMove);
                }
                if (objectPositionRow+i >= 0 && objectPositionRow+i <= map.rows-1) {
                    positionToMove = Object.create(Position);
                    positionToMove.setPosition(objectPositionCol, objectPositionRow+i);
                    this.listAvailablePosition.push(positionToMove);
                }
            }
        }
        for (var j = 0; j < this.listAvailablePosition.length; j++) {
            var border = "red 1px solid";
            for (var k = 0; k < listObjects[0].length; k++) {
                var hasObjectOnAvailablePosition = this.listAvailablePosition[j].isSamePosition(listObjects[0][k].position);
                if (hasObjectOnAvailablePosition) {
                    border = "initial";
                    break;
                };
            }
            $(".line:eq("+ (this.listAvailablePosition[j].rowIndex) +") .square:eq("+ (this.listAvailablePosition[j].colIndex) +")").css("border", border);
        }
    },
    createPositionToMove : function (objectPosition) {
        var moveMaxNumber = 3;
        var currentPosition = objectPosition;
        var directions = ["R","L","T","B"];
        directions.forEach(function(direction) {
            var i = 1;
            var hasNoObjectOnTheWay = true;
            while (i < moveMaxNumber + 1 && hasNoObjectOnTheWay) {
                var positionToMove = Object.create(Position);
                positionToMove.setPositionFromDirection(direction, currentPosition, i);
                var positionOnTheMap = positionToMove.isOnTheMap();
                if (positionOnTheMap) {
                    var border = "red 1px solid";
                    for (var k = 0; k < listObjects[0].length; k++) {
                        var hasObjectOnAvailablePosition = positionToMove.isSamePosition(listObjects[0][k].position);
                        if (hasObjectOnAvailablePosition) {
                            border = "initial";
                            hasNoObjectOnTheWay = false;
                            break;
                        };
                    }
                    $(".line:eq("+ (positionToMove.rowIndex) +") .square:eq("+ (positionToMove.colIndex) +")").css("border", border);
                    
                };
                i++
            }
        })
    },
};
var characterNames = ["Marco", "Polo"];

var Weapon = {
    init : function (position, name, damage) {
        this.name = name;
        this.position = position;
        this.damage = damage;
    }
};
var weaponNames = ["Pelle", "Pioche", "Hache", "Rateau"];

var map = {
    rows : 10,
    columns : 10,
    nbObstacles : 15,
    nbPlayers : 2,
    nbWeapons : 4,
    display : function (objets, container) {
        for (j = 0; j < objets.length; j++) {
            $(".line:eq("+ objets[j].position.rowIndex +") .square:eq("+ objets[j].position.colIndex +")").append(container.clone());
        }
        var checkNumberEmpty = $(".square:empty").length;
        var checkNumberFull = $(".square").contents().length;
        console.log ("Nb cell vide : " + checkNumberEmpty +"\nNb cell pleine : " + checkNumberFull);
    },
    genMap : function (){
        for (var i = 0; i < this.rows; i++) {
            var tmpRow = $row.clone();
            for (var k = 0; k < this.columns; k++) {
                tmpRow.append($square.clone());
            }
            $("#wrapper").append(tmpRow);
        }
    }
};

var listPositions = [];
var listObjects = [];
var errorCount = 0;

function checkPosition (colMaxIndex, rowMaxIndex) {
   var positionToCheck = Object.create(Position);
   positionToCheck.initRandomPosition(colMaxIndex, rowMaxIndex);
   
   for (var i = 0; i < listPositions.length; i++) {
       while(listPositions[i].colIndex == positionToCheck.colIndex && listPositions[i].rowIndex == positionToCheck.rowIndex ){
           errorCount ++;
           i=0;
           positionToCheck.initRandomPosition(colMaxIndex, rowMaxIndex);
       }
   }
   listPositions.push(positionToCheck);
   return positionToCheck;
};

function genListObstacle(nbObstacles, colMaxIndex, rowMaxIndex) {
   var listObstacle = [];
   for (var j = 0; j < nbObstacles; j++) {
       var tmpPosition = checkPosition(colMaxIndex, rowMaxIndex);
       var currentObstacle = Object.create(Obstacle); 
       currentObstacle.init(tmpPosition);
       listObstacle.push(currentObstacle);
   }
   return listObstacle;
}
function genListPlayer(nbPlayers, colMaxIndex, rowMaxIndex) {
   var listPlayer = [];
   for (var j = 0; j < nbPlayers; j++) {
       var tmpPosition = checkPosition(colMaxIndex, rowMaxIndex);
       var currentPlayer = Object.create(Player);
       var tmpWeapon = Object.create(Weapon);
       tmpWeapon.init(tmpPosition, "Gourdin", 10);
       currentPlayer.init(tmpPosition, characterNames[j], tmpWeapon);
       listPlayer.push(currentPlayer);
   }
   return listPlayer;
}
function genListWeapon(nbWeapons, colMaxIndex, rowMaxIndex) {
   var listWeapons = [];
   var damage = 10;
   for (var j = 0; j < nbWeapons; j++) {
       var tmpPosition = checkPosition(colMaxIndex, rowMaxIndex);
       var currentWeapon = Object.create(Weapon);
       damage += 5;
       currentWeapon.init(tmpPosition, weaponNames[j], damage);
       listWeapons.push(currentWeapon);
   }
   return listWeapons;
}


$(function ($) {
    map.genMap();
    var obstacles = genListObstacle(map.nbObstacles, map.columns, map.rows);
    listObjects.push(obstacles);
    console.log(obstacles)
    map.display(obstacles, $obstacle);
    var players = genListPlayer(map.nbPlayers, map.columns, map.rows);
    listObjects.push(players);
    console.log(players)
    map.display(players, $player);
    //listObjects[1][0].createPositionToMove0(listObjects[1][0].position.rowIndex, listObjects[1][0].position.colIndex);
    //listObjects[1][1].createPositionToMove0(listObjects[1][1].position.rowIndex, listObjects[1][1].position.colIndex);
    listObjects[1][0].createPositionToMove(listObjects[1][0].position);
    listObjects[1][1].createPositionToMove(listObjects[1][1].position);
    var weapons = genListWeapon(map.nbWeapons, map.columns, map.rows);
    listObjects.push(weapons);
    console.log(weapons)
    map.display(weapons,$weapon);
});