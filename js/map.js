var $row = $("<div />", {
    class: 'line'

});
var $square = $("<div />", {
    class: 'square'
});


function getObejt(id) {
    var armeEnBois;
    listObstacle[0].forEach(arme => {
        if(arme.id == id)
            armeEnBois = arme;
    });
    return armeEnBois;
}

var map = {
    rows : 10,
    columns : 10,
    nbObstacles : 25,
    nbPlayers : 2,
    nbWeapons : 5,
    display : function (mapObjects, container, attribute) {
        mapObjects.forEach(function(mapElement, index) {
            console.log(attribute);
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
        var checkNumberEmpty = $(".square:empty").length;
        var checkNumberFull = $(".square").contents().length;
        console.log ("Nb cell vide : " + checkNumberEmpty +"\nNb cell pleine : " + checkNumberFull);
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