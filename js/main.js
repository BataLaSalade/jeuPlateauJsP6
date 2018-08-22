var listObjects = [];

$(function ($) {
    map.genMap();
    var obstacles = genListObstacle(map.nbObstacles, map.columns, map.rows);
    listObjects.push(obstacles);
    console.log(obstacles)
    map.display(obstacles, $obstacle);
    var players = genListPlayer(map.nbPlayers, map.columns, map.rows);
    listObjects.push(players);
    console.log(players)
    map.display(players, $player);
    listObjects[1][0].createPositionToMove(listObjects[1][0].position);
    listObjects[1][1].createPositionToMove(listObjects[1][1].position);
    var weapons = genListWeapon(map.nbWeapons, map.columns, map.rows);
    listObjects.push(weapons);
    console.log(weapons)
    map.display(weapons,$weapon);
});
