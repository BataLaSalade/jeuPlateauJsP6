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
        $(".line:eq("+ (objets.listOfPositionToMove[i].rowIndex) +") .square:eq("+ (objets.listOfPositionToMove[i].colIndex) +")").css("border-color", "#85bb46").removeClass("goToCell");
    }
    objets.listOfPositionToMove = [];
}
