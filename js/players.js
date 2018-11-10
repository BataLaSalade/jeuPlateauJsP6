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
                console.log(this.weapon);
                this.imageUrl = playerEnumImage.woodenSword;
                return this.imageUrl;
            case weaponIdEnum.staff:
                console.log(this.weapon);
                this.imageUrl = playerEnumImage.staff;
                return this.imageUrl;
            case weaponIdEnum.bow:
                console.log(this.weapon);
                this.imageUrl = playerEnumImage.bow;
                return this.imageUrl;
            case weaponIdEnum.sword:
                console.log(this.weapon);
                this.imageUrl = playerEnumImage.sword;
                return this.imageUrl;
            case weaponIdEnum.spear:
                console.log(this.weapon);
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

function displayDisableCell (positionToMove, cellStatus, hasNoObjectOnTheWay, border, cellAccess) {
    var isDisable = cellStatus;
    var hasNoObjectOnTheWay = hasNoObjectOnTheWay;
    var border = border;
    var cellAccess = cellAccess;
    if (isDisable == true) {
        var border = cssConstants.borderDisableCell;
        var cellAccess = "Disable";
        var hasNoObjectOnTheWay = false;
    }
    $(".line:eq("+ (positionToMove.rowIndex) +") .square:eq("+ (positionToMove.colIndex) +")").css("border", border).removeClass("Enable");
    $(".line:eq("+ (positionToMove.rowIndex) +") .square:eq("+ (positionToMove.colIndex) +")").css("border", border).addClass(cellAccess);
}

function displayAvailableCellAroundPlayer (listObstacles, listPlayer, positionToMove, hasNoObjectOnTheWay) {
    var border = cssConstants.borderEnableCell;
    var cellAccess = "Enable";
    var isDisable = false;
    var positionToMove = positionToMove;
    var hasNoObjectOnTheWay = hasNoObjectOnTheWay;
    listObstacles.forEach(function(obstacle){
        isDisable = doesAtLeastOneObjectOnPosition (positionToMove, obstacle, isDisable)
    });
    displayDisableCell (positionToMove, isDisable, hasNoObjectOnTheWay, border, cellAccess);
    listPlayer.forEach(function(player){
        isDisable = doesAtLeastOneObjectOnPosition (positionToMove, player, isDisable)
    });
    displayDisableCell (positionToMove, isDisable, hasNoObjectOnTheWay, border, cellAccess);
    return isDisable;
}

 function findPlayer () {
    var currentPlayer = Game.currentPlayer;
    var directions = ["R","L","T","B"];
    var isPlayerAround = false;
    var target = (currentPlayer == Game.player1) ? Game.player2 : Game.player1;
    isPlayerAround = currentPlayer.position.isPlayerAround(target.position);
    Game.target = target;
    if (isPlayerAround) {
        console.log("Cible trouvé : ", Game.target);
    }
    return isPlayerAround;
}