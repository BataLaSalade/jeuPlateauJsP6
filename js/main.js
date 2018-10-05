
var mapContainer = {};

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
    mapContainer.players[0].createPositionToMove(mapContainer.players[0].position);
    mapContainer.players[1].createPositionToMove(mapContainer.players[1].position);
    
    mapContainer.weapons = genListWeapon(map.nbWeapons);
    console.log(mapContainer.weapons);
    map.display(mapContainer.weapons,$weapon, "weapon");
    console.log(mapCellPositions.length);

    $("#wrapper").on("click", ".Enable", function(e) {
        remove(mapContainer.players[0]);
        console.log("click", e.target);
        var colIndexNextMove = Number($(e.target).attr("colindex"));
        var rowIndexNextMove = Number($(e.target).attr("rowindex"));
        mapContainer.players[0].position.setPosition(colIndexNextMove, rowIndexNextMove);
        mapContainer.players[0].createPositionToMove(mapContainer.players[0].position);
        moveToCell(mapContainer.players[0], $player, "player",0);
        showAllWeapon();
        if ($(e.target).hasClass("weapon")) {
            console.log("une arme !!");
            managePlayerWeapon(mapContainer.players[0]);
        }
        
    });
    
});
