
var mapContainer = {
    init : function () {
        this.obstacles = genListObstacle(map.nbObstacles);
        this.players = genListPlayer(map.nbPlayers);
        this.weapons = genListWeapon(map.nbWeapons);
    }
};

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

    map.display(mapContainer.obstacles, $obstacle, "obstacle");
    map.display(mapContainer.players, $player, "player");
    map.display(mapContainer.weapons,$weapon, "weapon");
    mapContainer.players[blue].createPositionToMove();
    mapContainer.players[red].createPositionToMove();
    

    move(mapContainer.players[blue]);
    
});
