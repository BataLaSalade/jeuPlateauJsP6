
var mapContainer = {};

var blue = playerEnum.blue;
var red = playerEnum.red;

$(function ($) {
    map.genMap();
    createCellPositionObject(map.columns, map.rows);
    console.log(mapCellPositions.length);

    mapContainer.obstacles = genListObstacle(map.nbObstacles);
    console.log(mapContainer.obstacles)
    map.display(mapContainer.obstacles, $obstacle, "obstacle");
    console.log(mapCellPositions.length);

    mapContainer.players = genListPlayer(map.nbPlayers);
    console.log(mapContainer.players)
    map.display(mapContainer.players, $player, "player");
    console.log(mapCellPositions.length);
    mapContainer.players[blue].createPositionToMove(mapContainer.players[blue].position);
    mapContainer.players[red].createPositionToMove(mapContainer.players[red].position);
    
    mapContainer.weapons = genListWeapon(map.nbWeapons);
    console.log(mapContainer.weapons);
    map.display(mapContainer.weapons,$weapon, "weapon");
    console.log(mapCellPositions.length);

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
