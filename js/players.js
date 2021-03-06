var Player = {
    init : function (id, position, characterName, weapon, url){
        this.id = id;
        this.position = position;
        this.sante = 100;
        this.characterName = characterName;
        this.weapon = weapon;
        this.inventory = [weapon]
        this.imageUrl = url != "" ? url : "./img/png/BlueCharacter_epeeBois.png";
        this.listOfPositionToMove = [];
        this.canMove = false;
        this.defence = 1;
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
                }
                if (stopDisplay) {
                    hasNoObjectOnTheWay = false;
                }
                i++;
            }
        });
    },

    playerWearWeapon : function (playerEnumImage) {
        var currentWeaponId = this.weapon.id;
        switch (currentWeaponId) {
            case weaponIdEnum.woodenSword:
                this.imageUrl = playerEnumImage.woodenSword;
                return this.imageUrl;
            case weaponIdEnum.staff:
                this.imageUrl = playerEnumImage.staff;
                return this.imageUrl;
            case weaponIdEnum.bow:
                this.imageUrl = playerEnumImage.bow;
                return this.imageUrl;
            case weaponIdEnum.sword:
                this.imageUrl = playerEnumImage.sword;
                return this.imageUrl;
            case weaponIdEnum.spear:
                this.imageUrl = playerEnumImage.spear;
                return this.imageUrl;
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
        tmpWeapon.init(0, tmpPosition, "Epée en bois", 10, weaponUrlEnum.woodenSword);
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

function doesAtLeastOneObjectOnPosition (positionToMove, objectToFind, cellStatus) {
    var hasObjectOnAvailablePosition = positionToMove.isSamePosition(objectToFind.position);
    var isDisable = cellStatus;
    if (hasObjectOnAvailablePosition) {
        isDisable = true;
    }
    return isDisable
}

function displayDisableCell (positionToMove, cellStatus, hasNoObjectOnTheWay, backgroundColor, cellAccess) {
    var isDisable = cellStatus;
    var hasNoObjectOnTheWay = hasNoObjectOnTheWay;
    var backgroundColor = backgroundColor;
    var cellAccess = cellAccess;
    if (isDisable == true) {
        var backgroundColor = cssConstants.backgroundColorDisableCell;
        var cellAccess = "Disable";
        var hasNoObjectOnTheWay = false;
    }
    $(".line:eq("+ (positionToMove.rowIndex) +") .square:eq("+ (positionToMove.colIndex) +")").css("background-color", backgroundColor).removeClass("Enable");
    $(".line:eq("+ (positionToMove.rowIndex) +") .square:eq("+ (positionToMove.colIndex) +")").css("background-color", backgroundColor).addClass(cellAccess);
}

function displayAvailableCellAroundPlayer (listObstacles, listPlayer, positionToMove, hasNoObjectOnTheWay) {
    var backgroundColor = cssConstants.backgroundColorEnableCell;
    var cellAccess = "Enable";
    var isDisable = false;
    var positionToMove = positionToMove;
    var hasNoObjectOnTheWay = hasNoObjectOnTheWay;
    listObstacles.forEach(function(obstacle){
        isDisable = doesAtLeastOneObjectOnPosition (positionToMove, obstacle, isDisable);
    });
    displayDisableCell (positionToMove, isDisable, hasNoObjectOnTheWay, backgroundColor, cellAccess);
    listPlayer.forEach(function(player){
        isDisable = doesAtLeastOneObjectOnPosition (positionToMove, player, isDisable)
    });
    displayDisableCell (positionToMove, isDisable, hasNoObjectOnTheWay, backgroundColor, cellAccess);
    return isDisable;
}

 function findPlayer () {
    var currentPlayer = Game.currentPlayer;
    var isPlayerAround = false;
    var target = (currentPlayer == Game.player1) ? Game.player2 : Game.player1;
    isPlayerAround = currentPlayer.position.isPlayerAround(target.position);
    Game.target = target;
    return isPlayerAround;
}