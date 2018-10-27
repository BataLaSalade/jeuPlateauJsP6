// lancer de dé
function playersRunDice ( ) {
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
        gameActionConstants.scoreBlueDiceParagraph.text('Score Joueur Bleu : ' + bluePlayerScoreDice);
        $(this).hide().off();
        gameActionConstants.scoreDiceBluePlayer = bluePlayerScoreDice
    });
};

function redPlayerRunDice () {
    $('#runRedDice').on('click', function(event){
        var bluePlayerScoreDice = gameActionConstants.scoreDiceBluePlayer;
        var readyButton = gameActionConstants.readyButton;
        var instructionsParagraph = gameActionConstants.instructionsParagraph;
        var bluePlayerMessage = "Le joueur Bleu commence, Bravo !";
        var redPlayerMessage = "Le joueur Rouge commence, Bravo !";
        var redPlayerScoreDice = getRandomIndex(1,6);
        var bluePlayerBegin = bluePlayerScoreDice > redPlayerScoreDice;
        if (bluePlayerScoreDice != redPlayerScoreDice) {
            gameActionConstants.scoreRedDiceParagraph.text('Score Joueur rouge : ' + redPlayerScoreDice);
            bluePlayerBegin ? instructionsParagraph.text(bluePlayerMessage) : instructionsParagraph.text(redPlayerMessage);
            $(this).hide().off();
            gameActionConstants.scoreDiceRedPlayer = redPlayerScoreDice;
            readyButton.show();
        } else {
            gameActionConstants.scoreRedDiceParagraph.text('EGALITE ! Joueur Rouge : Relance le dé');
        };
    });
};
