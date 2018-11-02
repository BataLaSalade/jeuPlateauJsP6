function playersRunDice() {
    $('#runGame').on('show.bs.modal', function (event) {
        var readyButton = gameActionConstants.readyButton;
        readyButton.hide()
        bluePlayerRunDice();
        redPlayerRunDice();
        $('#runDiceModal').hide();
    });
}

function bluePlayerRunDice() {
    var bluePlayerScoreDice = 0;
    $('#runBlueDice').on('click', function (event) {
        bluePlayerScoreDice = getRandomIndex(1, 6);
        gameActionConstants.scoreBlueDiceParagraph.text(gameMessages.bluePlayerScoreAdvert + bluePlayerScoreDice);
        $(this).hide().off();
        scores.bluePlayerDice = bluePlayerScoreDice;
    });
}

function redPlayerRunDice() {
    $('#runRedDice').on('click', function (event) {
        var bluePlayerScoreDice = scores.bluePlayerDice;
        var redPlayerScoreDice = getRandomIndex(1, 6);
        whoBegin(bluePlayerScoreDice, redPlayerScoreDice);
        playerCanMove () 
    });
}

function whoBegin(bluePlayerScoreDice, redPlayerScoreDice) {
    var readyButton = gameActionConstants.readyButton;
    var instructionsParagraph = gameActionConstants.instructionsParagraph;
    var bluePlayerMessage = gameMessages.bluePlayerBegin;
    var redPlayerMessage = gameMessages.redPlayerBegin;
    var bluePlayerBegin = bluePlayerScoreDice > redPlayerScoreDice;
    if (bluePlayerScoreDice != redPlayerScoreDice) {
        gameActionConstants.scoreRedDiceParagraph.text(gameMessages.redPlayerScoreAdvert + redPlayerScoreDice);
        if (bluePlayerBegin) {
            whosNext.player1 = mapContainer.players[blue];
            whosNext.player2 = mapContainer.players[red];
            whosNext.currentPlayer = whosNext.player1;
            instructionsParagraph.text(bluePlayerMessage);
            console.log(bluePlayerMessage);
        } else {
            whosNext.player1 = mapContainer.players[red];
            whosNext.player2 = mapContainer.players[blue];
            whosNext.currentPlayer = whosNext.player1;
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
