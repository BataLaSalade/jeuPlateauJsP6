function playersRunDice () {
    $('#runGame').on('show.bs.modal', function (event) {
        var readyButton = gameActionConstants.readyButton;
        readyButton.hide()
        bluePlayerRunDice();
        redPlayerRunDice ();
        $('#runDiceModal').hide();
    });
};

function bluePlayerRunDice () {
    var bluePlayerScoreDice = 0;
    $('#runBlueDice').on('click', function(event){
        bluePlayerScoreDice = getRandomIndex(1,6);
        gameActionConstants.scoreBlueDiceParagraph.text(gameMessages.bluePlayerScoreAdvert + bluePlayerScoreDice);
        $(this).hide().off();
        gameActionConstants.scoreDiceBluePlayer = bluePlayerScoreDice
    });
};

function redPlayerRunDice () {
    $('#runRedDice').on('click', function(event){
        var bluePlayerScoreDice = gameActionConstants.scoreDiceBluePlayer;
        var redPlayerScoreDice = getRandomIndex(1,6);
        howBegin (bluePlayerScoreDice, redPlayerScoreDice);
        playerCanMove ();
    });
};

function howBegin (bluePlayerScoreDice, redPlayerScoreDice) {
    var readyButton = gameActionConstants.readyButton;
    var instructionsParagraph = gameActionConstants.instructionsParagraph;
    var bluePlayerMessage = gameMessages.bluePlayerBegin;
    var redPlayerMessage = gameMessages.redPlayerBegin;
    var bluePlayerBegin = bluePlayerScoreDice > redPlayerScoreDice;
    if (bluePlayerScoreDice != redPlayerScoreDice) {
        gameActionConstants.scoreRedDiceParagraph.text(gameMessages.redPlayerScoreAdvert + redPlayerScoreDice);
        if (bluePlayerBegin) {
            mapContainer.players[blue].canMove = true;
            gameActionConstants.player1 = mapContainer.players[blue];
            mapContainer.players[red].canMove = false;
            gameActionConstants.player2 = mapContainer.players[red];
            instructionsParagraph.text(bluePlayerMessage);
            console.log(bluePlayerMessage);
        } else {
            mapContainer.players[red].canMove = true;
            gameActionConstants.player1 = mapContainer.players[red];
            mapContainer.players[blue].canMove = false;
            gameActionConstants.player2 = mapContainer.players[blue];
            instructionsParagraph.text(redPlayerMessage);
            console.log(redPlayerMessage);
        };        
        $('#runRedDice').hide().off();
        gameActionConstants.scoreDiceRedPlayer = redPlayerScoreDice;
        readyButton.show();
    } else {
        gameActionConstants.scoreRedDiceParagraph.text(gameMessages.playersScoreEquals);
    };
}
