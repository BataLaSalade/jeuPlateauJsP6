var $obstacle = $("<div />", {
    class : "obstacle"
});

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

function getArme(id) {
    var armeEnBois;
    listObstacle[0].forEach(arme => {
        if(arme.id == id)
            armeEnBois = arme;
    });
    return armeEnBois;
}