var Position = {
    colIndex : 0,
    rowIndex : 0,
    setPosition: function(colIndex, rowIndex){
        this.colIndex = colIndex;
        this.rowIndex = rowIndex;
    },
    initRandomPosition: function(colMaxIndex, rowMaxIndex) {
        this.colIndex = this.genRandomPosition(0, colMaxIndex);
        this.rowIndex = this.genRandomPosition(0, rowMaxIndex);
    },
    genRandomPosition: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },
    isSamePosition: function(positionToCompare) {
        return this.colIndex == positionToCompare.colIndex && this.rowIndex == positionToCompare.rowIndex;
    },
    setPositionFromDirection : function(direction, currentPosition, index) {
        switch (direction) {
            case "R":
                this.setPosition(currentPosition.colIndex + index, currentPosition.rowIndex);
                break;
            case "L":
                this.setPosition(currentPosition.colIndex - index, currentPosition.rowIndex);
                break;
            case "T":
                this.setPosition(currentPosition.colIndex, currentPosition.rowIndex + index);
                break;
            case "B":
                this.setPosition(currentPosition.colIndex, currentPosition.rowIndex - index);
                break;
            default:
                break;
        }  
    },
    isOnTheMap : function () {
        return this.colIndex >= 0 && this.colIndex < map.columns && this.rowIndex >= 0 && this.rowIndex < map.rows;
    }
}

var listPositions = [];
var errorCount = 0;

function checkPosition (colMaxIndex, rowMaxIndex) {
    var positionToCheck = Object.create(Position);
    positionToCheck.initRandomPosition(colMaxIndex, rowMaxIndex);
    
    for (var i = 0; i < listPositions.length; i++) {
        while(listPositions[i].colIndex == positionToCheck.colIndex && listPositions[i].rowIndex == positionToCheck.rowIndex ){
            errorCount ++;
            i=0;
            positionToCheck.initRandomPosition(colMaxIndex, rowMaxIndex);
        }
    }
    listPositions.push(positionToCheck);
    return positionToCheck;
};