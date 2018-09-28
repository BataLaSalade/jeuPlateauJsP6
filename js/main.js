var listObjects = [];
var list = {};

$(function ($) {
    map.genMap();
    createAllPositionsObject(map.columns, map.rows);
    console.log(listAllPositions.length);

    var obstacles = genListObstacle(map.nbObstacles);
    list.obstacles = obstacles;
    listObjects.push(obstacles);
    console.log(obstacles)
    map.display(obstacles, $obstacle, "obstacle");
    console.log(listAllPositions.length);

    var players = genListPlayer(map.nbPlayers);
    list.players = players;
    listObjects.push(players);
    console.log(players)
    map.display(players, $player, "player");
    console.log(listAllPositions.length);
    listObjects[1][0].createPositionToMove(listObjects[1][0].position);
    listObjects[1][1].createPositionToMove(listObjects[1][1].position);
    
    var weapons = genListWeapon(map.nbWeapons);
    list.weapons = weapons;
    listObjects.push(weapons);
    console.log(weapons);
    map.display(weapons,$weapon, "weapon");
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
