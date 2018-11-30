var map = {
    rows : 10,
    columns : 10,
    nbObstacles : 25,
    nbPlayers : 2,
    nbWeapons : 5,
    display : function (mapObjects, container, attribute) {
        mapObjects.forEach(function(mapElement, index) {
            var typeObject = attribute;
            var colIndex = "colIndex";
            var rowIndex = "rowIndex";
            var relayAttribute = {};
            relayAttribute[typeObject] = index+1;
            relayAttribute[colIndex] = mapElement.position.colIndex;
            relayAttribute[rowIndex] = mapElement.position.rowIndex;
            var currentCell = $(".line:eq("+ mapElement.position.rowIndex +") .square:eq("+ mapElement.position.colIndex +")");
            currentCell.append(container.clone().css("background-image", "url("+ mapElement.imageUrl +")").attr(relayAttribute));
        })
    },
    genMap : function (){
        for (var i = 0; i < this.rows; i++) {
            var tmpRow = $row.clone();
            for (var k = 0; k < this.columns; k++) {
                tmpRow.append($square.clone());
            }
            $("#wrapper").append(tmpRow);
        }
    }
};