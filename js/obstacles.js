var Obstacle = {
    init: function (id, position){
        this.id = id;
        this.position = position;
        this.imageUrl = "./img/png/obstacle_buisson.png";
    }
};

function genListObstacle (nbObstacles) {
    var listObstacle = [];
    for (var i = 0; i < nbObstacles; i++) {
        var tmpPosition = getRandomPosition();
        var currentObstacle = Object.create(Obstacle);
        currentObstacle.init(i, tmpPosition);
        listObstacle.push(currentObstacle);
    }
    return listObstacle;
}