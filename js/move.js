function moveToCell (objets, container, attribute, value) {
    var colIndex = objets.position.colIndex;
    var rowIndex = objets.position.rowIndex;
    var containerCell = $(".line:eq("+ rowIndex +") .square:eq("+ colIndex +")");
    var url = (objets.id == 0) ? objets.playerWearWeapon(bluePlayerImageWeapon) : objets.playerWearWeapon(redPlayerImageWeapon);
    var cellToMove = container.clone().css("background-image", "url("+ url +")").attr(attribute, value+1);
    containerCell.append(cellToMove);
}

function remove (player) {
    var colIndex = player.position.colIndex;
    var rowIndex = player.position.rowIndex;
    var cell = $(".line:eq("+ rowIndex +") .square:eq("+ colIndex +") .player");
    cell.remove();
    player.listOfPositionToMove.forEach(removeEnableClass);
    player.listOfPositionToMove = [];
}

function removeEnableClass (position) {
    var cell = $(".line:eq("+ (position.rowIndex) +") .square:eq("+ (position.colIndex) +")");
    cell.css("border-color", cssConstants.borderColorDisableCell).removeClass("Enable");
}

function move (player) {
    $("#wrapper").on("click", ".Enable", function(e) {
        player = Game.currentPlayer;
        remove(player);
        var colIndexNextMove = Number($(e.target).attr("colindex"));
        var rowIndexNextMove = Number($(e.target).attr("rowindex"));
        player.position.setPosition(colIndexNextMove, rowIndexNextMove);
        player.createPositionToMove();
        moveToCell(player, $player, "player",0);
        showAllWeapon();
        if ($(e.target).hasClass("weapon")) {
            managePlayerWeapon(player);
        }
        clickCount ();
    });
}

function cannotMove (player) {
    var border = cssConstants.borderDisableCell;
    var cellAccess = "Disable";
    player.listOfPositionToMove.forEach(function(position){
        $(".line:eq("+ (position.rowIndex) +") .square:eq("+ (position.colIndex) +")").css("border", border).removeClass("Enable").addClass(cellAccess);
    });
}

function playerCanMove () {
    var currentPlayer = Game.currentPlayer;
    currentPlayer.createPositionToMove(); 
    move(currentPlayer);
}

function clickCount () {
    Game.clickCount++;
    var clickCount = Game.clickCount;
    var currentPlayer = Game.currentPlayer;
    var isCurrentPlayerCloseToTarget = findPlayer();
    if (isCurrentPlayerCloseToTarget) {
        console.log("FIGHT");
        cannotMove(currentPlayer);
        hideWeapon();
    } else if (clickCount > 0) {
        cannotMove(currentPlayer);
        hideWeapon();
        Game.currentPlayer = (currentPlayer == Game.player1) ? Game.player2 : Game.player1;
        Game.currentPlayer.createPositionToMove()
        Game.clickCount = 0;
    }
}
