var $row = $("<div />", {
    class: 'line'

});
var $square = $("<div />", {
    class: 'square'
});
var $obstacle = $("<div />", {
    class : "obstacle"
});

var Position = {
    setPosition: function(colIndex, rowIndex){
        this.colIndex = colIndex;
        this.rowIndex = rowIndex;
    },
    initRandomPosition: function(colMaxIndex, rowMaxIndex){
        this.colIndex = this.genRandomPosition(0, colMaxIndex);
        this.rowIndex = this.genRandomPosition(0, rowMaxIndex);
    },
    genRandomPosition: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

var obstaclePosition = Object.create(Position);
var obstacle = {
    position: obstaclePosition,
    // visuel
};
console.log(obstacle)


var map = {
    rows : 10,
    columns : 10,
    nbObstacles : 25,
    nbPlayers : 2,
    nbWeapons : 4,
    display : function (objet, number) {
        for (var j = 0; j < number; j++) {
            this.object = objet.position.initRandomPosition(map.columns-1, map.rows-1);
            $(".line:eq("+ objet.position.rowIndex +") .square:eq("+ objet.position.colIndex +")").append($obstacle.clone());
        };
    },
    genMap : function (){
        for (var i = 0; i < this.rows; i++) {
            var tmpRow = $row.clone();
            for (var k = 0; k < this.columns; k++) {
                tmpRow.append($square.clone());
            };
            $("#wrapper").append(tmpRow);
        };
    }
};

$(function () {
    map.genMap();
    map.display(obstacle, map.nbObstacles);
    
});