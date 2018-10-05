
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
    mapContainer.players[blue].createPositionToMove(mapContainer.players[blue].position);
    mapContainer.players[red].createPositionToMove(mapContainer.players[red].position);
    map.display(mapContainer.weapons,$weapon, "weapon");

    $("#wrapper").on("click", ".Enable", function(e) {
        remove(mapContainer.players[blue]);
        console.log("click", e.target);
        var colIndexNextMove = Number($(e.target).attr("colindex"));
        var rowIndexNextMove = Number($(e.target).attr("rowindex"));
        mapContainer.players[blue].position.setPosition(colIndexNextMove, rowIndexNextMove);
        mapContainer.players[blue].createPositionToMove(mapContainer.players[blue].position);
        moveToCell(mapContainer.players[blue], $player, "player",0);
        showAllWeapon();
        if ($(e.target).hasClass("weapon")) {
            console.log("une arme !!");
            managePlayerWeapon(mapContainer.players[blue]);
        }
        
    });
    
});
