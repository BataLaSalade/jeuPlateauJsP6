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
        this.listAvailablePosition = [/*0=col*/[], /*1=row*/[]];    // création d'un tableau pour stocker les positions disponibles = qui ne contiennent pas d'obstacles
    },
    radar : function (objectPositionRow, objectPositionCol) {       // methode qui met en évidence les cases dispo pour les déplacements et qui empêche le joueur de sortir du tableau, peu importe qu'elles contiennent ou non des obstacles. C'est la version 1, elle fonctionne
        for(var i = 0; i < 3; i++) {
            if(objectPositionCol+i+1 <= 9) {
                $(".line:eq("+ (objectPositionRow) +") .square:eq("+ (objectPositionCol+i+1) +")").css("border-color", "red");
            };
            if(objectPositionCol-i-1 >= 0) {
                $(".line:eq("+ (objectPositionRow) +") .square:eq("+ (objectPositionCol-i-1) +")").css("border-color", "red");
            };
            if(objectPositionRow+i+1 <= 9) {
                $(".line:eq("+ (objectPositionRow+i+1) +") .square:eq("+ (objectPositionCol) +")").css("border-color", "red");
            };
            if(objectPositionRow-i-1 >= 0) {
                $(".line:eq("+ (objectPositionRow-i-1) +") .square:eq("+ (objectPositionCol) +")").css("border-color", "red");
            };             
        }
    },
    /* 
    ----- radar v2 -----
    L'idée est simple : si j'ai un obstacle sur une des trajectoires disponibles, je rends la case indisponible. Ce qui se traduit pour l'instant par une absence de mise en forme css
    -- La methode prend en paramètre les coordonnées de l'object player.
        Ses coordonnées sont définies par les attributs colIndex et rowIndex de son objet position
    -- listObjects[0] = tableau contenant mes objects obstacles, définit par un object position qui possède les attributs "colIndex" et "rowIndex", le tout défini les coordonnées de mon object Obstacles
    -- 1 --
    Je parcours le tableau Obstacle et pour chaque obstacle :
        je verifie si sur les 4 axes de déplacement, composés de 3 cases autour de la position actuelle, j'ai un obstacle, pour cela je compare 
            les attributs colonnes : currentCol (Player) et listObjects[0][i].position.colIndex (obstacle)
            les attributs lignes : currentRow (Player) et listObjects[0][i].position.rowIndex (Obstacle)
            S'ils sont différents, alors la case est dispo --> je push dans le table [listAvailablePosition]
    Pour chaque colonne disponible et 3 cases à droite et a gauche du joueur, j'ajoute mon CSS
    Pour chaque ligne disponible et 3 cases en haut et en bas du joueur, j'ajoute mon CSS
    */
    radar2 : function (objectPositionRow, objectPositionCol) {
        for (var i = 0; i < listObjects[0].length; i++) {                   // i = compteur --> parcourt tableau OBSTACLES
            for (var j = 0; j < 3 ; j++) {                                  // j = compteur --> 3 cases selon position du joueur
                var currentRow = objectPositionRow;
                var currentCol = objectPositionCol;
                var availableCell = 0;
                if (currentCol+j+1 !== listObjects[0][i].position.colIndex) { // to the right
                    availableCell = currentCol+j+1;
                    this.listAvailablePosition[0].push(availableCell);
                };
                if (currentCol-j-1 !== listObjects[0][i].position.colIndex) { // to the left
                    availableCell = currentCol-j-1;
                    this.listAvailablePosition[0].push(availableCell);
                }; 
                if (currentRow+j+1 !== listObjects[0][i].position.rowIndex) { // to bottom
                    availableCell = currentRow+j+1;
                    this.listAvailablePosition[1].push(availableCell);
                }; 
                if (currentRow-j-1 !== listObjects[0][i].position.rowIndex) { // to top
                    availableCell = currentRow-i-1;
                    this.listAvailablePosition[1].push(availableCell);
                }; 
            }
        }
        for (var k = 0; k < this.listAvailablePosition[0].length; k++) {    // k = compteur --> parcourt tableau colonne disponible
            for (j = 0; j < 3; j++) {
                if(this.listAvailablePosition[0][k] <= 9 && objectPositionCol+j+1==this.listAvailablePosition[0][k]) {
                    $(".line:eq("+ (objectPositionRow) +") .square:eq("+ (objectPositionCol+j+1) +")").css("border-color", "red");
                };
                if(this.listAvailablePosition[0][k] >= 0 && objectPositionCol-j-1 ==this.listAvailablePosition[0][k]) {
                    $(".line:eq("+ (objectPositionRow) +") .square:eq("+ (objectPositionCol-j-1) +")").css("border-color", "red");
                };
            } 
        }
        for(var l = 0; l < this.listAvailablePosition[1].length; l++){ // l = compeur --> parcourt tableau ligne disponible
            for (j = 0; j < 3; j++) {
                if(this.listAvailablePosition[1][l] <= 9 && objectPositionRow+j+1 == this.listAvailablePosition[1][l]) {
                    $(".line:eq("+ (objectPositionRow+j+1) +") .square:eq("+ (objectPositionCol) +")").css("border-color", "red");
                };
                if(this.listAvailablePosition[1][l] >= 0 && objectPositionRow-j-1== this.listAvailablePosition[1][l]) {
                    $(".line:eq("+ (objectPositionRow-j-1) +") .square:eq("+ (objectPositionCol) +")").css("border-color", "red");
                };
            }
            
        };
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
    nbObstacles : 25,
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

/*function radar(objectPositionRow, objectPositionCol) {
    for(var i = 0; i < 3; i++) {
        if(objectPositionCol+i+1 <= 9) {
            $(".line:eq("+ (objectPositionRow) +") .square:eq("+ (objectPositionCol+i+1) +")").css("border-color", "red");
        };
        if(objectPositionCol-i-1 >= 0) {
            $(".line:eq("+ (objectPositionRow) +") .square:eq("+ (objectPositionCol-i-1) +")").css("border-color", "red");
        };
        if(objectPositionRow+i+1 <= 9) {
            $(".line:eq("+ (objectPositionRow+i+1) +") .square:eq("+ (objectPositionCol) +")").css("border-color", "red");
        };
        if(objectPositionRow-i-1 >= 0) {
            $(".line:eq("+ (objectPositionRow-i-1) +") .square:eq("+ (objectPositionCol) +")").css("border-color", "red");
        };  
    }
}*/


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
    listObjects[1][0].radar2(listObjects[1][0].position.rowIndex, listObjects[1][0].position.colIndex);
    listObjects[1][1].radar2(listObjects[1][1].position.rowIndex, listObjects[1][1].position.colIndex);
    var weapons = genListWeapon(map.nbWeapons, map.columns, map.rows);
    listObjects.push(weapons);
    console.log(weapons)
    map.display(weapons,$weapon);
    console.log("Duplicat position --> nb error : " + errorCount);
});