function fight() {
    var isCurrentPlayerCloseToTarget = Game.currentPlayer.position.isPlayerAround(Game.target.position);
    if (isCurrentPlayerCloseToTarget) {
        cannotMove();
        hideWeapon();
        showFightButtons();
    }
}

function hideFightButtons() {
    GameUI.buttonAttack.hide();
    GameUI.buttonDefence.hide();
}

function showFightButtons() {
    GameUI.buttonAttack.show();
    GameUI.buttonDefence.show();
}

function switchPlayerAfterFightAction() {
    switchCurrentPlayer();
    switchTarget();
    GameUI.textCurrentPlayer.text(Game.currentPlayer.characterName + GameMessages.yourTurn);
    Game.clickCount = 0;
}

function setProgressBar(targetHealth, currentPlayerHealth) {
    var playerLifeToSet = targetHealth;
    switch (playerLifeToSet) {
        case targetHealth:
            setProgressForPlayer(targetHealth, Game.target);
            setProgressColor(Game.target)
        case currentPlayerHealth:
            setProgressForPlayer(currentPlayerHealth, Game.currentPlayer);
            setProgressColor(Game.currentPlayer)
        default:
            break;
    } 
}

function setProgressForPlayer(playerHealth,GameTargetOrCurrentPlayer ) {
    var relayAttribute = {};
    var ariaValuenowAttr = "aria-valuenow";
    var styleAttr = "style";
    playerHealth = (playerHealth<=0) ? 0 : playerHealth;
    relayAttribute[ariaValuenowAttr] = String(playerHealth);
    relayAttribute[styleAttr] = "width:"+String(playerHealth)+"%";
    var Progressbar = (GameTargetOrCurrentPlayer == mapContainer.players[playerEnum.blue]) ? GameUI.bluePlayerProgressbar : GameUI.redPlayerProgressbar;
    Progressbar.attr(relayAttribute).text(playerHealth + " PV");
    var playerPVLabel = (GameTargetOrCurrentPlayer == mapContainer.players[playerEnum.blue]) ? GameUI.bluePlayerPVLabel : GameUI.redPlayerPVLabel;
    playerPVLabel.text(playerHealth + " PV");
}

function setProgressColor(player) {
    var progressbar = (player == mapContainer.players[playerEnum.blue]) ? GameUI.bluePlayerProgressbar : GameUI.redPlayerProgressbar;
    var playerHealth = (player.sante)/100;
    var isMidLife = playerHealth > 0.33 && playerHealth <= 0.66;
    var isLowLife = playerHealth <= 0.33;
    switch (playerHealth) {
        case isMidLife:
            progressbar.removeClass("bg-success").addClass("bg-warning");
            break;
        case isLowLife:
            progressbar.removeClass("bg-warning").addClass("bg-danger");
            break;
        default:
            break;
    }
}

function attack () {
    var damage = Game.currentPlayer.weapon.damage / Game.target.defence;  
    if (Game.target.sante > 0 && Game.currentPlayer.sante > 0) {
        if (Game.target.defence == 2) {
            Game.target.sante -= damage;
            Game.currentPlayer.sante -= damage*0.5;
            Game.target.defence =1;
        } else {
            Game.target.sante -= damage;
        }
        Game.clickCount++;
        setProgressBar(Game.target.sante, Game.currentPlayer.sante);
    } 
    if (Game.target.sante <= 0 || Game.currentPlayer.sante <= 0) {
        var message = Game.currentPlayer.characterName + " a gagné !";
        hideFightButtons();
        GameUI.textCurrentPlayer.text(message);
    } else if (Game.clickCount > 0) {
        switchPlayerAfterFightAction();
    }
}

function defend () {
    if (Game.target.sante > 0 && Game.currentPlayer.sante > 0) {
        Game.currentPlayer.defence = 2;
        Game.clickCount++;   
    } 
    if (Game.target.sante <= 0 || Game.currentPlayer.sante <= 0) {
        var message = Game.currentPlayer.characterName + " a gagné !";
        hideFightButtons();
        GameUI.textCurrentPlayer.text(message);
    } else if (Game.clickCount > 0) {
        switchPlayerAfterFightAction();
    }
}

