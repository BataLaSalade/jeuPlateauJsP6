var Game = {
    clickCount : 0
    //player1
    //player2
    //currentPlayer
    //target
}

function whoBegin(bluePlayerScoreDice, redPlayerScoreDice) {
    var bluePlayerBegin = bluePlayerScoreDice > redPlayerScoreDice;
    var blue = playerEnum.blue;
    var red = playerEnum.red;
    GameUI.textScoreRedDice.text(GameMessages.redPlayerScoreAdvert + redPlayerScoreDice);
    Game.player1 = (bluePlayerBegin) ? mapContainer.players[blue] : mapContainer.players[red];
    GameUI.textModalRunDiceInstructions.text((bluePlayerBegin) ? GameMessages.bluePlayerBegin : GameMessages.redPlayerBegin);
    console.log((bluePlayerBegin) ? GameMessages.bluePlayerBegin : GameMessages.redPlayerBegin);
    Game.currentPlayer = Game.player1;
    Game.target = Game.player2;
    var message = (bluePlayerBegin) ? (Game.currentPlayer.characterName + GameMessages.yourTurn) : (Game.currentPlayer.characterName + GameMessages.yourTurn);
    GameUI.textCurrentPlayer.text(message);
    Scores.redPlayerDice = redPlayerScoreDice;
}
