var listObjects = [];

$(function ($) {
    map.genMap();
    createAllPositionsObject(map.columns, map.rows);
    console.log(listAllPositions.length);

    var obstacles = genListObstacle(map.nbObstacles);
    listObjects.push(obstacles);
    console.log(obstacles)
    map.display(obstacles, $obstacle);
    console.log(listAllPositions.length);

    var players = genListPlayer(map.nbPlayers);
    listObjects.push(players);
    console.log(players)
    map.display(players, $player);
    console.log(listAllPositions.length);
    listObjects[1][0].createPositionToMove(listObjects[1][0].position);
    listObjects[1][1].createPositionToMove(listObjects[1][1].position);
    
    var weapons = genListWeapon(map.nbWeapons);
    listObjects.push(weapons);
    console.log(weapons);
    map.display(weapons,$weapon);
    console.log(listAllPositions.length);
    
});
