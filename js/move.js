
function moveToCell (objets, container, attribute, value) {
    var colIndex = objets.position.colIndex;
    var rowIndex = objets.position.rowIndex;
    var containerCell = $(".line:eq("+ rowIndex +") .square:eq("+ colIndex +")");
    if (objets.id == 0) {
        var url = objets.playerWearWeapon(bluePlayerImageWeapon);
    } else {
        url = objets.playerWearWeapon(redPlayerImageWeapon);
    }
    var cellToMove = container.clone().css("background-image", "url("+ url +")").attr(attribute, value+1);
    containerCell.append(cellToMove);
}

function remove (player) {
    var colIndex = player.position.colIndex;
    var rowIndex = player.position.rowIndex;
    var cell = $(".line:eq("+ rowIndex +") .square:eq("+ colIndex +") .player")
    cell.remove();
    player.listOfPositionToMove.forEach(removeEnableClass);
    player.listOfPositionToMove = [];
}

function removeEnableClass (position) {
    var cell = $(".line:eq("+ (position.rowIndex) +") .square:eq("+ (position.colIndex) +")");
    cell.css("border-color", "#85bb46").removeClass("Enable");
}

function move (player) {
    
    $("#wrapper").on("click", ".Enable", function(e) {
        
        remove(player);
        var colIndexNextMove = Number($(e.target).attr("colindex"));
        var rowIndexNextMove = Number($(e.target).attr("rowindex"));
        player.position.setPosition(colIndexNextMove, rowIndexNextMove);
        player.createPositionToMove();
        moveToCell(player, $player, "player",0);
        showAllWeapon();
        if ($(e.target).hasClass("weapon")) {
            managePlayerWeapon(player);
        };
        cannotMove (player);
    });
}



function cannotMove (player) {
    var border = "#85bb46 1px solid";
    var cellAccess = "Disable"
    player.listOfPositionToMove.forEach(function(position){
        $(".line:eq("+ (position.rowIndex) +") .square:eq("+ (position.colIndex) +")").css("border", border).removeClass("Enable").addClass(cellAccess);
    });
}

function playerCanMove () {
    var player1 = whosNext.player1;
    var player2 = whosNext.player2;
    player1.canMove = true;
    player2.canMove = false;
    // si je mets un while je bloque
        if (player1.canMove) {
           
                player1.createPositionToMove();
                move(player1);
                cannotMove(player2);
                player1.canMove = false;
                player2.canMove = true;
            
        } else {
            player2.createPositionToMove();
            move(player2);
            cannotMove(player1);
            player2.canMove = false;
            player1.canMove = true;
        };

}