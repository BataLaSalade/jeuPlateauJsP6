var Game = {
    clickCount : 0
}

function whoBegin(bluePlayerScoreDice, redPlayerScoreDice) {
    var bluePlayerBegin = bluePlayerScoreDice > redPlayerScoreDice;
    var blue = playerEnum.blue;
    var red = playerEnum.red;
    GameUI.textScoreRedDice.text(GameMessages.redPlayerScoreAdvert + redPlayerScoreDice);
    Game.player1 = (bluePlayerBegin) ? mapContainer.players[blue] : mapContainer.players[red];
    Game.player2 = (bluePlayerBegin) ? mapContainer.players[red] : mapContainer.players[blue];
    GameUI.textModalRunDiceInstructions.text((bluePlayerBegin) ? GameMessages.bluePlayerBegin : GameMessages.redPlayerBegin);
    Game.currentPlayer = Game.player1;
    Game.target = Game.player2;
    var message = (bluePlayerBegin) ? (Game.currentPlayer.characterName + GameMessages.yourTurn) : (Game.currentPlayer.characterName + GameMessages.yourTurn);
    GameUI.textCurrentPlayer.text(message);
    Scores.redPlayerDice = redPlayerScoreDice;
}

function displayButtonInModalRunDice() {
    GameUI.buttonReady.hide();
    GameUI.buttonRunRedDice.hide();
}

function buttonRunBlueDiceAction() {
    var bluePlayerScoreDice = 0;
    bluePlayerScoreDice = getRandomIndex(1, 6);
    GameUI.textScoreBlueDice.text(GameMessages.bluePlayerScoreAdvert + bluePlayerScoreDice);
    Scores.bluePlayerDice = bluePlayerScoreDice;
    $(this).hide()
    GameUI.buttonRunRedDice.show();
}

function buttonRunRedDiceAction() {
    var bluePlayerScoreDice = Scores.bluePlayerDice;
    var redPlayerScoreDice = getRandomIndex(1, 6);
    if (bluePlayerScoreDice != redPlayerScoreDice) {
        whoBegin(bluePlayerScoreDice, redPlayerScoreDice);
        GameUI.buttonRunRedDice.hide();
        GameUI.buttonReady.show();
        GameUI.buttonOpenModalRunDice.hide();
        Game.currentPlayer.createPositionToMove();
        
    } else {
        GameUI.textScoreRedDice.text(GameMessages.playersScoreEquals);
    }
}

function switchCurrentPlayer() {
    Game.currentPlayer = (Game.currentPlayer == Game.player1) ? Game.player2 : Game.player1;
}

function switchTarget() {
    Game.target = (Game.currentPlayer == Game.player1) ? Game.player2 : Game.player1;
}