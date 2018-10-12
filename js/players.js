var $player = $("<div />", {
    class : "player"
});

var characterNames = ["Chevalier Bleu", "Chevalier Rouge"];
var playerListUrl = [
    ["./img/png/BlueCharacter_epeeBois.png", "./img/png/BlueCharacter_arc.png", "./img/png/BlueCharacter_baton.png", "./img/png/BlueCharacter_epee.png", "./img/png/BlueCharacter_lance.png"],
    ["./img/png/RedCharacter_epeeBois.png", "./img/png/RedCharacter_arc.png", "./img/png/RedCharacter_baton.png", "./img/png/RedCharacter_epee.png",  "./img/png/RedCharacter_lance.png"]
];

var Player = {
    init : function (id, position, characterName, weapon, url){
        this.id = id;
        this.position = position;
        this.sante = 100;
        this.characterName = characterName;
        this.weapon = weapon;
        this.inventory = [weapon]
        this.imageUrl = url != "" ? url : "../img/png/BlueCharacter_epeeBois.png";
        this.listOfPositionToMove = [];
    },

    createPositionToMove : function () {
        var moveMaxNumber = 3;
        var currentPosition = this.position;
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
                    var stopDisplay = displayAvailableCellAroundPlayer (mapContainer.obstacles, mapContainer.players, positionToMove, hasNoObjectOnTheWay);
                };
                if (stopDisplay) {
                    hasNoObjectOnTheWay = false;
                }
                i++;
            }
        });
    },

    playerWearWeapon : function () {
        var currentWeapon = weaponsEnum.woodenSword
        switch (currentWeapon) {
            case weaponsEnum.woodenSword:
                console.log(currentWeapon)
                break;
            case weaponsEnum.staff:
                console.log(currentWeapon)
                break;
            case weaponsEnum.bow:
                console.log(currentWeapon)
                break;
            case weaponsEnum.sword:
                console.log(currentWeapon)
                break;
            case weaponsEnum.spear:
                console.log(currentWeapon)
                break;
            default:
                break;
        }
    }
};

function genListPlayer (nbPlayers) {
    var listPlayer = [];
    for (var i = 0; i < nbPlayers; i++) {
        var tmpPosition = getRandomPosition();
        var currentPlayer = Object.create(Player);
        var tmpWeapon = Object.create(Weapon);
        tmpWeapon.init(0, tmpPosition, "Epée en bois", 10, weaponListUrl[0]);
        currentPlayer.init(i, tmpPosition, characterNames[i], tmpWeapon, playerListUrl[i][0]);
        listPlayer.push(currentPlayer);
        var directions = ["R","L","T","B"];
        directions.forEach(function(direction) {
            var positionAroundPlayer = Object.create(Position);
            positionAroundPlayer.setPositionFromDirection(direction, tmpPosition, 1);
            var indexToFind = getIndexToFind(positionAroundPlayer);
            mapCellPositions.splice(indexToFind,1)
        });
    }
    return listPlayer;
}

function doesAtLeatOneObjectOnPosition (positionToMove, objectToFind, cellStatus) {
    var hasObjectOnAvailablePosition = positionToMove.isSamePosition(objectToFind.position);
    var isDisable = cellStatus;
    console.log("doesAtLeatOneObjectOnPosition : " + isDisable);
    if (hasObjectOnAvailablePosition) {
        isDisable = true;
        console.log("hasObjectOnAvailablePosition : " + isDisable);
    };
    return isDisable
}

function displayDisableCell (positionToMove, cellStatus, hasNoObjectOnTheWay, border, cellAccess) {
    var isDisable = cellStatus
    var hasNoObjectOnTheWay = hasNoObjectOnTheWay
    var border = border;
    var cellAccess = cellAccess;
    if (isDisable == true) {
        console.log("Cell disable");
        var border = "#85bb46 1px solid";
        var cellAccess = "Disable"
        var hasNoObjectOnTheWay = false;
    }
    $(".line:eq("+ (positionToMove.rowIndex) +") .square:eq("+ (positionToMove.colIndex) +")").css("border", border).removeClass("Enable");
    $(".line:eq("+ (positionToMove.rowIndex) +") .square:eq("+ (positionToMove.colIndex) +")").css("border", border).addClass(cellAccess);
}

function displayAvailableCellAroundPlayer (listObstacles, listPlayer, positionToMove, hasNoObjectOnTheWay) {
    var border = "#e8d952 1px solid";
    var cellAccess = "Enable";
    var isDisable = false;
    var positionToMove = positionToMove;
    var hasNoObjectOnTheWay = hasNoObjectOnTheWay;
    listObstacles.forEach(function(obstacle){
        isDisable = doesAtLeatOneObjectOnPosition (positionToMove, obstacle, isDisable)
    });
    displayDisableCell (positionToMove, isDisable, hasNoObjectOnTheWay, border, cellAccess);
    listPlayer.forEach(function(player){
        isDisable = doesAtLeatOneObjectOnPosition (positionToMove, player, isDisable)
    });
    displayDisableCell (positionToMove, isDisable, hasNoObjectOnTheWay, border, cellAccess);

    return isDisable;
}
