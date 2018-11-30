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
    cell.css("background-color", cssConstants.backgroundColorDisableCell).removeClass("Enable");
}

function move(e) {
    remove(Game.currentPlayer);
    var colIndexNextMove = Number($(e.target).attr("colindex"));
    var rowIndexNextMove = Number($(e.target).attr("rowindex"));
    Game.currentPlayer.position.setPosition(colIndexNextMove, rowIndexNextMove);
    Game.currentPlayer.createPositionToMove();
    moveToCell(Game.currentPlayer, $player, "player",0);
    showAllWeapon();
    if ($(e.target).hasClass("weapon")) {
        managePlayerWeapon(Game.currentPlayer);
        displayWeaponIcon(Game.currentPlayer);
    }
    clickCount ();
    fight();
}

function cannotMove () {
    var backgroundColor = cssConstants.backgroundColorDisableCell
    var cellAccess = "Disable";
    Game.currentPlayer.listOfPositionToMove.forEach(function(position){
        $(".line:eq("+ (position.rowIndex) +") .square:eq("+ (position.colIndex) +")").css("background-color", backgroundColor).removeClass("Enable").addClass(cellAccess);
    });
}

function playerCanMove () {
    Game.currentPlayer.createPositionToMove(); 
    move(Game.currentPlayer);
}

function clickCount () {
    Game.clickCount++;
    if (Game.clickCount > 0) {
        cannotMove();
        hideWeapon();
        switchCurrentPlayer();
        switchTarget();
        GameUI.textCurrentPlayer.text(Game.currentPlayer.characterName + GameMessages.yourTurn);
        Game.currentPlayer.createPositionToMove();
        Game.clickCount = 0;
    }
}

