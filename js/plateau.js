var $row = $("<div />", {
    class: 'line'

});
var $square = $("<div />", {
    class: 'square'
});
var map = {
    rows : 10,
    columns : 10,
    genMap : function (){
        for (var i = 0; i < this.rows; i++) {
            var tmpRow = $row.clone();
            for (var j = 0; j < this.columns; j++) {
                tmpRow.append($square.clone());
            }
            $("#wrapper").append(tmpRow);
        }
    }
};

function getRandomPosition (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

var Position = {
    initPosition : function(colIndex, rowIndex){
        this.colIndex = colIndex;
        this.rowIndex = rowIndex;
    }
}

var obstaclePosition = Object.create(Position);
randomCol = getRandomPosition(0, map.columns-1)
randomRow = getRandomPosition(0, map.rows-1)
obstaclePosition.initPosition(randomCol, randomRow);



var $obstable = $("<div />", {
    class : "obstable"
    
});

var obstable = {
    nbObstables : 25,
    position: obstaclePosition,
   
};
console.log(obstable)

$(function () {
    map.genMap();

});