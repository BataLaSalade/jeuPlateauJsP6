var $player = $("<div />", {
    class : "player"
});

var Player = {
    init : function (position, characterName, weapon){
        this.nom = ""; // a saisir par l'utilisateur
        this.position = position;
        this.sante = 100;
        this.characterName = characterName;
        this.weapon = weapon;
        this.listAvailablePosition = [];
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
                    var border = "red 1px solid";
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

var characterNames = ["Marco", "Polo"];

function genListPlayer(nbPlayers, colMaxIndex, rowMaxIndex) {
    var listPlayer = [];
    for (var j = 0; j < nbPlayers; j++) {
        var tmpPosition = checkPosition(colMaxIndex, rowMaxIndex);
        var currentPlayer = Object.create(Player);
        var tmpWeapon = Object.create(Weapon);
        tmpWeapon.init(tmpPosition, "Gourdin", 10);
        currentPlayer.init(tmpPosition, characterNames[j], tmpWeapon);
        listPlayer.push(currentPlayer);
    }
    return listPlayer;
}