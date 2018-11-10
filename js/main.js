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

$(function ($) {
    map.genMap();
    createCellPositionObject(map.columns, map.rows);
    mapContainer.init();
    mapDisplayElements.init();
    playersRunDice();
});
