var $row = $("<div />", {
    class: 'line'

});
var $square = $("<div />", {
    class: 'square'
});

var map = {
    rows : 10,
    columns : 10,
    nbObstacles : 25,
    nbPlayers : 2,
    nbWeapons : 5,
    display : function (objets, container, attribute) {
        for (j = 0; j < objets.length; j++) {
            console.log(attribute);
            var typeObject = attribute;
            var colIndex = "colIndex";
            var rowIndex = "rowIndex";
            var relayAttribute = {};
            relayAttribute[typeObject] = j+1;
            relayAttribute[colIndex] = objets[j].position.colIndex;
            relayAttribute[rowIndex] = objets[j].position.rowIndex;
            $(".line:eq("+ objets[j].position.rowIndex +") .square:eq("+ objets[j].position.colIndex +")")
            .append(container.clone().css("background-image", "url("+ objets[j].imageUrl +")")
            .attr(relayAttribute)
            );
        }
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