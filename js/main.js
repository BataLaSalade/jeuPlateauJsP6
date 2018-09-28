var listObjects = [];
var mapContainer = {};

$(function ($) {
    map.genMap();
    createAllPositionsObject(map.columns, map.rows);
    console.log(listAllPositions.length);

    mapContainer.obstacles = genListObstacle(map.nbObstacles);
    listObjects.push(mapContainer.obstacles);
    console.log(mapContainer.obstacles)
    map.display(mapContainer.obstacles, $obstacle, "obstacle");
    console.log(listAllPositions.length);

    mapContainer.players = genListPlayer(map.nbPlayers);
    listObjects.push(mapContainer.players);
    console.log(mapContainer.players)
    map.display(mapContainer.players, $player, "player");
    console.log(listAllPositions.length);
    listObjects[1][0].createPositionToMove(listObjects[1][0].position);
    listObjects[1][1].createPositionToMove(listObjects[1][1].position);
    
    mapContainer.weapons = genListWeapon(map.nbWeapons);
    listObjects.push(mapContainer.weapons);
    console.log(mapContainer.weapons);
    map.display(mapContainer.weapons,$weapon, "weapon");
    console.log(listAllPositions.length);

    $("#wrapper").on("click", ".Enable", function(e) {
        remove(listObjects[1][0]);
        console.log("click", e.target);
        var colIndexNextMove = Number($(e.target).attr("colindex"));
        var rowIndexNextMove = Number($(e.target).attr("rowindex"));
        listObjects[1][0].position.setPosition(colIndexNextMove, rowIndexNextMove);
        listObjects[1][0].createPositionToMove(listObjects[1][0].position);
        moveToCell(listObjects[1][0], $player, "player",0);
        showAllWeapon();
        if ($(e.target).hasClass("weapon")) {
            console.log("une arme !!");
            managePlayerWeapon(listObjects[1][0]);
        }
        
    });
    
});
