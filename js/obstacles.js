var $obstacle = $("<div />", {
    class : "obstacle"
});

var Obstacle = {
    init: function (position){
        this.position = position;
        this.imageUrl = "./img/png/obstacle_buisson.png";
    }
};

function genListObstacle(nbObstacles, colMaxIndex, rowMaxIndex) {
    var listObstacle = [];
    for (var j = 0; j < nbObstacles; j++) {
        var tmpPosition = getCheckedPosition(colMaxIndex, rowMaxIndex);
        var currentObstacle = Object.create(Obstacle); 
        currentObstacle.init(tmpPosition);
        listObstacle.push(currentObstacle);
    }
    return listObstacle;
}