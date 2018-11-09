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
    isSamePosition: function(positionToCompare) {
        return this.colIndex == positionToCompare.colIndex && this.rowIndex == positionToCompare.rowIndex;
    },
    isOnTheMap : function () {
        return this.colIndex >= 0 && this.colIndex < map.columns && this.rowIndex >= 0 && this.rowIndex < map.rows;
    },
    isPlayerAround : function (positionToWatch) {
        var isDownSide = this.colIndex+1 == positionToWatch.colIndex && this.rowIndex == positionToWatch.rowIndex
        var isUpSide = this.colIndex-1 == positionToWatch.colIndex && this.rowIndex == positionToWatch.rowIndex
        var isRightSide = this.rowIndex+1 == positionToWatch.rowIndex && this.colIndex == positionToWatch.colIndex
        var isLeftSide = this.rowIndex-1 == positionToWatch.rowIndex && this.colIndex == positionToWatch.colIndex
        return isDownSide || isUpSide || isRightSide || isLeftSide; 
    }
}


var mapCellPositions = [];
function createCellPositionObject(nbCol, nbRow) {
    for (var i = 0; i < nbCol; i++) {
        for (var j = 0; j < nbRow; j++) {
            var newCell = Object.create(Position);
            newCell.setPosition(i,j);
            mapCellPositions.push(newCell);
            var cell =  $(".line:eq("+ j +") .square:eq("+ i +")")
            cell.attr({"colIndex": i,"rowIndex":j});
        }   
    }    
}

function getRandomIndex (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getIndexToFind (currentPosition) {
    for (var i = 0; i < mapCellPositions.length; i++) {
        if (currentPosition.isSamePosition(mapCellPositions[i])) {
            var findIndex = i;
        }
    }
    return findIndex;
}

function getRandomPosition () {
    var randomIndex = getRandomIndex(0, mapCellPositions.length);
    var randomAvailablePosition = mapCellPositions[randomIndex];
    var tmpPosition = Object.create(Position);
    tmpPosition.setPosition(randomAvailablePosition.colIndex, randomAvailablePosition.rowIndex);
    mapCellPositions.splice(randomIndex,1);
    return tmpPosition;
}