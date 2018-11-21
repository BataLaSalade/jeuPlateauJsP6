var mapContainer = {
    init : function () {
        this.obstacles = genListObstacle(map.nbObstacles);
        this.players = genListPlayer(map.nbPlayers);
        this.weapons = genListWeapon(map.nbWeapons);
    }
}

var mapDisplayElements = {
    init : function () {
        this.obstacles = map.display(mapContainer.obstacles, $obstacle, "obstacle");
        this.players = map.display(mapContainer.players, $player, "player");
        this.weapons = map.display(mapContainer.weapons,$weapon, "weapon");
    }
}

$(function ($) {
    map.genMap();
    createCellPositionObject(map.columns, map.rows);
    mapContainer.init();
    mapDisplayElements.init();
    
    initInteraction();
    //playersRunDice();
});


function initInteraction() {
    GameUI.modalRunDice.on('show.bs.modal', function(){
        GameUI.buttonReady.hide();
        GameUI.buttonRunRedDice.hide();
    });
    GameUI.buttonRunBlueDice.one('click', function(){
        var bluePlayerScoreDice = 0;
        bluePlayerScoreDice = getRandomIndex(1, 6);
        GameUI.textScoreBlueDice.text(GameMessages.bluePlayerScoreAdvert + bluePlayerScoreDice);
        Scores.bluePlayerDice = bluePlayerScoreDice;
        console.log("score dé bleu = "+ bluePlayerScoreDice)
        $(this).hide()
        GameUI.buttonRunRedDice.show();
    });
    GameUI.buttonRunRedDice.on('click', function(){
        var bluePlayerScoreDice = Scores.bluePlayerDice;
        var redPlayerScoreDice = getRandomIndex(1, 6);
        console.log("score dé rouge = "+redPlayerScoreDice)
        if (bluePlayerScoreDice != redPlayerScoreDice) {
            whoBegin(bluePlayerScoreDice, redPlayerScoreDice);
            GameUI.buttonRunRedDice.hide();
            GameUI.buttonReady.show();
            GameUI.buttonOpenModalRunDice.hide();
            Game.currentPlayer.createPositionToMove();
            
        } else {
            GameUI.textScoreRedDice.text(GameMessages.playersScoreEquals);
        }
    });
    $("#wrapper").on("click", ".Enable", function(e) {
        player = Game.currentPlayer;
        remove(Game.currentPlayer);
        var colIndexNextMove = Number($(e.target).attr("colindex"));
        var rowIndexNextMove = Number($(e.target).attr("rowindex"));
        Game.currentPlayer.position.setPosition(colIndexNextMove, rowIndexNextMove);
        Game.currentPlayer.createPositionToMove();
        moveToCell(Game.currentPlayer, $player, "player",0);
        showAllWeapon();
        if ($(e.target).hasClass("weapon")) {
            managePlayerWeapon(Game.currentPlayer);
        }
        clickCount ();
    });
}
