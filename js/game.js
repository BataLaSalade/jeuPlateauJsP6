var Game = {
    clickCount : 0
    //player1
    //player2
    //currentPlayer
    //target
}

    


function playersRunDice() {
    GameUI.modalRunDice.on('show.bs.modal', function () {
        GameUI.buttonReady.hide();
        GameUI.buttonRunRedDice.hide();
        bluePlayerRunDice();
        redPlayerRunDice();
        GameUI.buttonOpenModalRunDice.hide();
    });
}

function bluePlayerRunDice() {
    var bluePlayerScoreDice = 0;
    GameUI.buttonRunBlueDice.on('click', function () {
        bluePlayerScoreDice = getRandomIndex(1, 6);
        GameUI.textScoreBlueDice.text(GameMessages.bluePlayerScoreAdvert + bluePlayerScoreDice);
        $(this).hide().off();
        Scores.bluePlayerDice = bluePlayerScoreDice;
        GameUI.buttonRunRedDice.show();
    });
}

function redPlayerRunDice() {
    GameUI.buttonRunRedDice.on('click', function () {
        var bluePlayerScoreDice = Scores.bluePlayerDice;
        var redPlayerScoreDice = getRandomIndex(1, 6);
        if (bluePlayerScoreDice != redPlayerScoreDice) {
            whoBegin(bluePlayerScoreDice, redPlayerScoreDice);
            playerCanMove();
        } else {
            GameUI.textScoreRedDice.text(GameMessages.playersScoreEquals);
        }
    });
}

function whoBegin(bluePlayerScoreDice, redPlayerScoreDice) {
    var bluePlayerMessage = GameMessages.bluePlayerBegin;
    var redPlayerMessage = GameMessages.redPlayerBegin;
    var bluePlayerBegin = bluePlayerScoreDice > redPlayerScoreDice;
    var blue = playerEnum.blue;
    var red = playerEnum.red;
    GameUI.textScoreRedDice.text(GameMessages.redPlayerScoreAdvert + redPlayerScoreDice);
    if (bluePlayerBegin) {
        Game.player1 = mapContainer.players[blue];
        Game.player2 = mapContainer.players[red];
        Game.currentPlayer = Game.player1;
        GameUI.textModalRunDiceInstructions.text(bluePlayerMessage);
        console.log(bluePlayerMessage);
        GameUI.textCurrentPlayer.text(Game.currentPlayer.characterName + GameMessages.yourTurn);
    } else {
        Game.player1 = mapContainer.players[red];
        Game.player2 = mapContainer.players[blue];
        Game.currentPlayer = Game.player1;
        GameUI.textModalRunDiceInstructions.text(redPlayerMessage);
        console.log(redPlayerMessage);
        GameUI.textCurrentPlayer.text(Game.currentPlayer.characterName + GameMessages.yourTurn);
    };
    GameUI.buttonRunRedDice.hide().off();
    Scores.redPlayerDice = redPlayerScoreDice;
    GameUI.buttonReady.show();

}
