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
        var tmpPosition = getRandomPosition();
        var currentObstacle = Object.create(Obstacle);
        currentObstacle.init(tmpPosition);
        listObstacle.push(currentObstacle);
    }
    return listObstacle;
}