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
        this.listUnavailablePosition = [];
    },
    
    radar : function (objectPositionRow, objectPositionCol) {
        for ( var i = 0; i < 3; i++) {
            var currentCol = objectPositionCol;
            var currentRow = objectPositionRow;
            if(currentCol+i+1 <= 9) {
                $(".line:eq("+ (currentRow) +") .square:eq("+ (currentCol+i+1) +")").css("border", "red 1px solid");
            };
            if(currentCol-i-1 >= 0) {
                $(".line:eq("+ (currentRow) +") .square:eq("+ (currentCol-i-1) +")").css("border", "red 1px solid");
            };
            if(currentRow+i+1 <= 9) {
                $(".line:eq("+ (currentRow+i+1) +") .square:eq("+ (currentCol) +")").css("border", "red 1px solid");
            };
            if(currentRow-i-1 >= 0) {
                $(".line:eq("+ (currentRow-i-1) +") .square:eq("+ (currentCol) +")").css("border", "red 1px solid");
            };
            for (var j = 0; j < listObjects[0].length; j++) {
                if (currentCol+i+1 == listObjects[0][j].position.colIndex && currentRow == listObjects[0][j].position.rowIndex) {
                    var unavailablePosition = Object.create(Position);
                    var unavailableCol = currentCol+i+1;
                    var unavailableRow = currentRow;
                    unavailablePosition.setPosition(unavailableCol, unavailableRow);
                    this.listUnavailablePosition.push(unavailablePosition);
                };
                if (currentCol-i-1 == listObjects[0][j].position.colIndex && currentRow == listObjects[0][j].position.rowIndex) {
                    var unavailablePosition = Object.create(Position);
                    var unavailableCol = currentCol-i-1;
                    var unavailableRow = currentRow;
                    unavailablePosition.setPosition(unavailableCol, unavailableRow);
                    this.listUnavailablePosition.push(unavailablePosition);
                };
                if (currentRow+i+1 == listObjects[0][j].position.rowIndex && currentCol == listObjects[0][j].position.colIndex) {
                    var unavailablePosition = Object.create(Position);
                    var unavailableCol = currentCol;
                    var unavailableRow = currentRow+i+1;
                    unavailablePosition.setPosition(unavailableCol, unavailableRow);
                    this.listUnavailablePosition.push(unavailablePosition);
                };
                if (currentCol+i+1 == listObjects[0][j].position.colIndex && currentRow == listObjects[0][j].position.colIndex) {
                    var unavailablePosition = Object.create(Position);
                    var unavailableCol = currentCol;
                    var unavailableRow = currentRow-i-1;
                    unavailablePosition.setPosition(unavailableCol, unavailableRow);
                    this.listUnavailablePosition.push(unavailablePosition);
                };
            }
            for (var k = 0; k < this.listUnavailablePosition.length; k++) {
                if(currentCol+i+1 == this.listUnavailablePosition[k].colIndex) {
                    $(".line:eq("+ (currentRow) +") .square:eq("+ (currentCol+i+1) +")").css("border", "initial");
                };
                if(currentCol-i-1 == this.listUnavailablePosition[k].colIndex) {
                    $(".line:eq("+ (currentRow) +") .square:eq("+ (currentCol-i-1) +")").css("border", "initial");
                };
                if(currentRow+i+1 == this.listUnavailablePosition[k].rowIndex) {
                    $(".line:eq("+ (currentRow+i+1) +") .square:eq("+ (currentCol) +")").css("border", "initial");
                };
                if(currentRow-i-1 == this.listUnavailablePosition[k].rowIndex) {
                    $(".line:eq("+ (currentRow-i-1) +") .square:eq("+ (currentCol) +")").css("border", "initial");
                };
            }
        }
    }
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
    listObjects[1][0].radar(listObjects[1][0].position.rowIndex, listObjects[1][0].position.colIndex);
    listObjects[1][1].radar(listObjects[1][1].position.rowIndex, listObjects[1][1].position.colIndex);
    var weapons = genListWeapon(map.nbWeapons, map.columns, map.rows);
    listObjects.push(weapons);
    console.log(weapons)
    map.display(weapons,$weapon);
    console.log("Duplicat position --> nb error : " + errorCount);
    console.log(listObjects[1][1].listUnavailablePosition);
});