// lancer de dé
$('#runGame').on('show.bs.modal', function (event) {
    var readyButton = gameActionConstants.readyButton;
    readyButton.hide()
    bluePlayerRunDice();
    redPlayerRunDice ();
});

function bluePlayerRunDice () {
    var bluePlayerScoreDice = 0;
    $('#runBlueDice').on('click', function(event){
        bluePlayerScoreDice = getRandomIndex(1,6);
        console.log("Score Joueur Bleu : " + bluePlayerScoreDice );
        gameActionConstants.scoreBlueDiceParagraph.text('Score Joueur Bleu : ' + bluePlayerScoreDice);
        $(this).hide().off();
        gameActionConstants.scoreDiceBluePlayer = bluePlayerScoreDice
    });
};

function redPlayerRunDice () {
    $('#runRedDice').on('click', function(event){
        var bluePlayerScoreDice = gameActionConstants.scoreDiceBluePlayer;
        var readyButton = gameActionConstants.readyButton;
        var redPlayerScoreDice = getRandomIndex(1,6);
        console.log("Score Joueur Rouge : " + redPlayerScoreDice );
        if (bluePlayerScoreDice != redPlayerScoreDice) {
            gameActionConstants.scoreRedDiceParagraph.text('Score Joueur rouge : ' + redPlayerScoreDice);
            $(this).hide().off();
            readyButton.show();
        } else {
            gameActionConstants.scoreRedDiceParagraph.text('EGALITE ! Joueur Rouge : Relance le dé');
        };
    });
};
