var Game = {
    clickCount : 0
    //player1
    //player2
    //currentPlayer
    //target
}

    


function displayOnlyBluePlayerButton() {
    GameUI.buttonReady.hide();
    GameUI.buttonRunRedDice.hide();
    //bluePlayerRunDice();
    //redPlayerRunDice();  
}

function bluePlayerRunDice() {
    var bluePlayerScoreDice = 0;
        bluePlayerScoreDice = getRandomIndex(1, 6);
        GameUI.textScoreBlueDice.text(GameMessages.bluePlayerScoreAdvert + bluePlayerScoreDice);
        Scores.bluePlayerDice = bluePlayerScoreDice;
        console.log("score dé bleu = "+bluePlayerScoreDice)
        //$(this).hide()
        //GameUI.buttonRunRedDice.show();
   
}

function redPlayerRunDice() {
    //GameUI.buttonRunBlueDice.hide();
    //GameUI.buttonRunRedDice.show();
        var bluePlayerScoreDice = Scores.bluePlayerDice;
        var redPlayerScoreDice = getRandomIndex(1, 6);
        console.log("score dé rouge = "+redPlayerScoreDice)
        if (bluePlayerScoreDice != redPlayerScoreDice) {
            whoBegin(bluePlayerScoreDice, redPlayerScoreDice);
            //playerCanMove();
            ///GameUI.buttonOpenModalRunDice.hide();
        } else {
            GameUI.textScoreRedDice.text(GameMessages.playersScoreEquals);
        }
    
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
    //GameUI.buttonRunRedDice.hide().off();
    Scores.redPlayerDice = redPlayerScoreDice;
    //GameUI.buttonReady.show();

}
