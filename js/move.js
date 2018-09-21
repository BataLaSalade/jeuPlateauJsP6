/*function moveDisable (position) {
    for (var k = 0; k < listObjects[0].length; k++) {
        var hasObjectOnAvailablePosition = position.isSamePosition(listObjects[0][k].position);
        if (hasObjectOnAvailablePosition) {
            border = "#85bb46 1px solid";
            cellAccess = "Disable"
            hasNoObjectOnTheWay = false;
            break;
        };
    }
}*/

function moveToCell (objets, container, attribute, value) {
    var colIndex = objets.position.colIndex;
    var rowIndex = objets.position.rowIndex;
    $(".line:eq("+ rowIndex +") .square:eq("+ colIndex +")").append(container.clone().css("background-image", "url("+ playerListUrl[value][0] +")").attr(attribute, value+1));

}

function remove (objets) {
    var colIndex = objets.position.colIndex;
    var rowIndex = objets.position.rowIndex;
    $(".line:eq("+ rowIndex +") .square:eq("+ colIndex +") .player").remove();
    for (var i = 0; i < objets.listOfPositionToMove.length; i++) {
        $(".line:eq("+ (objets.listOfPositionToMove[i].rowIndex) +") .square:eq("+ (objets.listOfPositionToMove[i].colIndex) +")").css("border-color", "#85bb46").removeClass("Enable");
    }
    objets.listOfPositionToMove = [];
}

