var listObjects = [];

$(function ($) {
    map.genMap();
    createAllPositionsObject(map.columns, map.rows);
    console.log(listAllPositions.length);

    var obstacles = genListObstacle(map.nbObstacles);
    listObjects.push(obstacles);
    console.log(obstacles)
    map.display(obstacles, $obstacle, "obstacle");
    console.log(listAllPositions.length);

    var players = genListPlayer(map.nbPlayers);
    listObjects.push(players);
    console.log(players)
    map.display(players, $player, "player");
    console.log(listAllPositions.length);
    listObjects[1][0].createPositionToMove(listObjects[1][0].position);
    listObjects[1][1].createPositionToMove(listObjects[1][1].position);
    
    var weapons = genListWeapon(map.nbWeapons);
    listObjects.push(weapons);
    console.log(weapons);
    map.display(weapons,$weapon, "weapon");
    console.log(listAllPositions.length);

    
    /*$(".goToCell").on("click", function(e) {
        remove(listObjects[1][0]);
        console.log("click", e.target);
        var colIndex = Number($(e.target).attr("colindex"));
        var rowIndex = Number($(e.target).attr("rowindex"));
        console.log("colIndex : " + colIndex);
        console.log("rowIndex : " + rowIndex);
        listObjects[1][0].position.setPosition(colIndex, rowIndex);
        listObjects[1][0].createPositionToMove(listObjects[1][0].position);
        moveToCell(listObjects[1][0], $player, "player",0);
        
    });*/
    
   $(".square").on("click", function(e) {
        if($(e.target).hasClass("goToCell")) {
            remove(listObjects[1][0]);
            console.log("click", e.target);
            var colIndex = Number($(e.target).attr("colindex"));
            var rowIndex = Number($(e.target).attr("rowindex"));
            console.log("colIndex : " + colIndex);
            console.log("rowIndex : " + rowIndex);
            listObjects[1][0].position.setPosition(colIndex, rowIndex);
            listObjects[1][0].createPositionToMove(listObjects[1][0].position);
            moveToCell(listObjects[1][0], $player, "player",0);
        }
    });
    /*$(".square").on("click", function(e){
        console.log("click", e.target);
    });*/
});
