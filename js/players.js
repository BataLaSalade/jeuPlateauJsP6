var $player = $("<div />", {
    class : "player"
});

var characterNames = ["Chevalier Bleu", "Chevalier Rouge"];
var playerListUrl = [
    ["./img/png/BlueCharacter_epeeBois.png", "./img/png/BlueCharacter_arc.png", "./img/png/BlueCharacter_baton.png", "./img/png/BlueCharacter_epee.png", "./img/png/BlueCharacter_lance.png"],
    ["./img/png/RedCharacter_epeeBois.png", "./img/png/RedCharacter_arc.png", "./img/png/RedCharacter_baton.png", "./img/png/RedCharacter_epee.png",  "./img/png/RedCharacter_lance.png"]
];

var Player = {
    init : function (position, characterName, weapon, url){
        this.position = position;
        this.sante = 100;
        this.characterName = characterName;
        this.weapon = weapon;
        this.imageUrl = url != "" ? url : "../img/png/BlueCharacter_epeeBois.png";
        this.listOfPositionToMove = [];
    },

    createPositionToMove : function (objectPosition) {
        var moveMaxNumber = 3;
        var currentPosition = objectPosition;
        var directions = ["R","L","T","B"];
        var scope = this;
        directions.forEach(function(direction) {
            var i = 1;
            var hasNoObjectOnTheWay = true;
            while (i < moveMaxNumber + 1 && hasNoObjectOnTheWay) {
                var positionToMove = Object.create(Position);
                positionToMove.setPositionFromDirection(direction, currentPosition, i);
                var positionOnTheMap = positionToMove.isOnTheMap();
                if (positionOnTheMap) {
                    scope.listOfPositionToMove.push(positionToMove);
                    var border = "#e8d952 1px solid";
                    var goOrDont = "goToCell";
                    for (var k = 0; k < listObjects[0].length; k++) {
                        var hasObjectOnAvailablePosition = positionToMove.isSamePosition(listObjects[0][k].position);
                        if (hasObjectOnAvailablePosition) {
                            border = "#85bb46 1px solid";
                            goOrDont = "Disable"
                            hasNoObjectOnTheWay = false;
                            break;
                        };
                    }
                    $(".line:eq("+ (positionToMove.rowIndex) +") .square:eq("+ (positionToMove.colIndex) +")").css("border", border).addClass(goOrDont); 
                };
                i++;
            }
        })
    }
};

function genListPlayer (nbPlayers) {
    var listPlayer = [];
    for (var i = 0; i < nbPlayers; i++) {
        var tmpPosition = getRandomPosition();
        var currentPlayer = Object.create(Player);
        var tmpWeapon = Object.create(Weapon);
        tmpWeapon.init(tmpPosition, "Epée en bois", 10);
        currentPlayer.init(tmpPosition, characterNames[i], tmpWeapon, playerListUrl[i][0]);
        listPlayer.push(currentPlayer);
        var directions = ["R","L","T","B"];
        directions.forEach(function(direction) {
            var positionAroundPlayer = Object.create(Position);
            positionAroundPlayer.setPositionFromDirection(direction, tmpPosition, 1);
            var indexToFind = getIndexToFind(positionAroundPlayer);
            listAllPositions.splice(indexToFind,1)
        });
    }
    return listPlayer;
}
