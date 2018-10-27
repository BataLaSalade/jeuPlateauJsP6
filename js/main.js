
var mapContainer = {
    init : function () {
        this.obstacles = genListObstacle(map.nbObstacles);
        this.players = genListPlayer(map.nbPlayers);
        this.weapons = genListWeapon(map.nbWeapons);
    }
}

var mapDisplayElements = {
    init : function () {
        this.obstacles = map.display(mapContainer.obstacles, $obstacle, "obstacle");
        this.players = map.display(mapContainer.players, $player, "player");
        this.weapons = map.display(mapContainer.weapons,$weapon, "weapon");
    }
}

var blue = playerEnum.blue;
var red = playerEnum.red;

$(function ($) {
    map.genMap();
    createCellPositionObject(map.columns, map.rows);
    console.log(mapCellPositions.length);
    
    mapContainer.init();
    console.log(mapContainer.obstacles);
    console.log(mapContainer.players);
    console.log(mapContainer.weapons);

    mapDisplayElements.init();

    playersRunDice();
    
});
