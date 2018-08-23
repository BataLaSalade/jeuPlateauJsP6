var $player = $("<div />", {
    class : "player"
});

var Player = {
    init : function (position, characterName, weapon, url){
        this.nom = ""; // a saisir par l'utilisateur
        this.position = position;
        this.sante = 100;
        this.characterName = characterName;
        this.weapon = weapon;
        this.listAvailablePosition = [];
        this.imageUrl = url != "" ? url : "../img/png/BlueCharacter_epeeBois.png";
    },

    createPositionToMove : function (objectPosition) {
        var moveMaxNumber = 3;
        var currentPosition = objectPosition;
        var directions = ["R","L","T","B"];
        directions.forEach(function(direction) {
            var i = 1;
            var hasNoObjectOnTheWay = true;
            while (i < moveMaxNumber + 1 && hasNoObjectOnTheWay) {
                var positionToMove = Object.create(Position);
                positionToMove.setPositionFromDirection(direction, currentPosition, i);
                var positionOnTheMap = positionToMove.isOnTheMap();
                if (positionOnTheMap) {
                    var border = "#e8d952 1px solid";
                    for (var k = 0; k < listObjects[0].length; k++) {
                        var hasObjectOnAvailablePosition = positionToMove.isSamePosition(listObjects[0][k].position);
                        if (hasObjectOnAvailablePosition) {
                            border = "initial";
                            hasNoObjectOnTheWay = false;
                            break;
                        };
                    }
                    $(".line:eq("+ (positionToMove.rowIndex) +") .square:eq("+ (positionToMove.colIndex) +")").css("border", border);
                    
                };
                i++
            }
        })
    },
    
};

var characterNames = ["Chevalier Bleu", "Chevalier Rouge"];
var playerListUrl = [
    ["./img/png/BlueCharacter_epeeBois.png", "./img/png/BlueCharacter_arc.png", "./img/png/BlueCharacter_baton.png", "./img/png/BlueCharacter_epee.png", "./img/png/BlueCharacter_lance.png"],
    ["./img/png/RedCharacter_epeeBois.png", "./img/png/RedCharacter_arc.png", "./img/png/RedCharacter_baton.png", "./img/png/RedCharacter_epee.png",  "./img/png/RedCharacter_lance.png"]
]


function genListPlayer(nbPlayers, colMaxIndex, rowMaxIndex) {
    var listPlayer = [];
    for (var i = 0; i < nbPlayers; i++) {
        var tmpPosition = getCheckedPosition(colMaxIndex, rowMaxIndex);
        if ( i > 0 ) {
            var sawPlayer = 0;
            for ( var j = 0; j < listPlayer.length; j++) {
                while (tmpPosition.isPlayerAround(listPlayer[j].position)) {
                    sawPlayer++
                    tmpPosition = getCheckedPosition(colMaxIndex, rowMaxIndex);
                } 
            }
        };
        
        var currentPlayer = Object.create(Player);
        var tmpWeapon = Object.create(Weapon);
        tmpWeapon.init(tmpPosition, "Epée en bois", 10);
        currentPlayer.init(tmpPosition, characterNames[i], tmpWeapon, playerListUrl[i][0]);
        listPlayer.push(currentPlayer);
    }
    console.log("PLAYER EN VUE : Nb de vue = " + sawPlayer);

    return listPlayer;
}

