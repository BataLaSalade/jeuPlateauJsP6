var $obstacle = $("<div />", {
    class : "obstacle"
});

var Obstacle = {
    init: function (position){
        this.position = position;
        this.imageUrl = "./img/png/obstacle_buisson.png";
    }
};

function genListObstacle (nbObstacles) {
    var listObstacle = [];
    for (var i = 0; i < nbObstacles; i++) {
        var randomIndex = getRandomIndexPosition(0, listAllPositions.length);
        var randomAvailablePosition = listAllPositions[randomIndex];
        var tmpPosition = Object.create(Position);
        tmpPosition.setPosition(randomAvailablePosition.colIndex, randomAvailablePosition.rowIndex);
        var currentObstacle = Object.create(Obstacle);
        currentObstacle.init(tmpPosition);
        listObstacle.push(currentObstacle);
        listAllPositions.splice(randomIndex,1);
    }
    return listObstacle;
}