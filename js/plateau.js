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
    colIndex: 0,
    rowIndex: 0,
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
        this.position = position
    }
};
var Player = {
    init : function (position, characterName, weapon){
        this.nom = "", // a saisir par l'utilisateur
        this.position = position,
        this.sante = 100,
        this.characterName = characterName,
        this.weapon = weapon
        
    }
    //visuel
};
var characterNames = ["Marc", "Polo"];

var Weapon = {
    init : function (position, name, damage) {
        this.name = name,
        this.position = position,
        this.damage = damage
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
        for (var j = 0; j < objets.length; j++) {
            $(".line:eq("+ objets[j].position.rowIndex +") .square:eq("+ objets[j].position.colIndex +")").append(container.clone());
        }
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

function genListObstacle(nbObstacles, colMaxIndex, rowMaxIndex) {
    var listObstacle = [];
    for (var j = 0; j < nbObstacles; j++) {
        var tmpPosition = Object.create(Position)     
        var currentObstacle = Object.create(Obstacle)   
        tmpPosition.initRandomPosition(colMaxIndex, rowMaxIndex);
        currentObstacle.init(tmpPosition)
        listObstacle.push(currentObstacle)
    }
    return listObstacle;
}
function genListPlayer(nbPlayers, colMaxIndex, rowMaxIndex) {
    var listPlayer = [];
    for (var j = 0; j < nbPlayers; j++) {
        var tmpPosition = Object.create(Position) 
        var currentPlayer = Object.create(Player)
        var tmpWeapon = Object.create(Weapon)
        tmpPosition.initRandomPosition(colMaxIndex, rowMaxIndex);
        tmpWeapon.init(tmpPosition, "Gourdin", 10)
        currentPlayer.init(tmpPosition, characterNames[j], tmpWeapon)
        listPlayer.push(currentPlayer)
    }
    return listPlayer;
}
function genListWeapon(nbWeapons, colMaxIndex, rowMaxIndex) {
    var listWeapons = [];
    var damage = 10
    for (var j = 0; j < nbWeapons; j++) {
        var tmpPosition = Object.create(Position)     
        var currentWeapon = Object.create(Weapon)
        damage += 5
        tmpPosition.initRandomPosition(colMaxIndex, rowMaxIndex)
        currentWeapon.init(tmpPosition, weaponNames[j], damage)
        listWeapons.push(currentWeapon)
        
    }
    return listWeapons;
}

$(function () {
    map.genMap();
    var obstacles = genListObstacle(map.nbObstacles, map.columns-1, map.rows-1);
    map.display(obstacles, $obstacle);
    var players = genListPlayer(map.nbPlayers, map.columns-1, map.rows-1);
    map.display(players, $player);
    var weapons = genListWeapon(map.nbWeapons, map.columns-1, map.rows-1);
    map.display(weapons,$weapon);
});