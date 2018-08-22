var $obstacle = $("<div />", {
    class : "obstacle"
});

var Obstacle = {
    init: function (position){
        this.position = position;
    }
};

function genListObstacle(nbObstacles, colMaxIndex, rowMaxIndex) {
    var listObstacle = [];
    for (var j = 0; j < nbObstacles; j++) {
        var tmpPosition = checkPosition(colMaxIndex, rowMaxIndex);
        var currentObstacle = Object.create(Obstacle); 
        currentObstacle.init(tmpPosition);
        listObstacle.push(currentObstacle);
    }
    return listObstacle;
}