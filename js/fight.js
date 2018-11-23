function fight() {
    var isCurrentPlayerCloseToTarget = Game.currentPlayer.position.isPlayerAround(Game.target.position);
    if (isCurrentPlayerCloseToTarget) {
        console.log("FIGHT");
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
    GameUI.textCurrentPlayer.text(Game.currentPlayer.characterName + GameMessages.yourTurn)
    console.log("attack changement joueur");
    console.log(Game.currentPlayer.characterName + GameMessages.yourTurn);
    Game.clickCount = 0;
}

function setProgressBar(playerHealth) {
    var relayAttribute = {};
    var ariaValuenowAttr = "aria-valuenow";
    var styleAttr = "style";
    relayAttribute[ariaValuenowAttr] = String(playerHealth);
    relayAttribute[styleAttr] = "width:"+String(playerHealth)+"%";
    var target = (Game.currentPlayer == mapContainer.players[playerEnum.blue]) ? GameUI.bluePlayerProgressbar : GameUI.redPlayerProgressbar;
    target.attr(relayAttribute);
}

function attack () {
    var damage = Game.currentPlayer.weapon.damage * Game.currentPlayer.defence;  
    if (Game.target.sante > 0 && Game.currentPlayer.sante > 0) {
        Game.target.sante -= damage;
        console.log("Joueur actuel : ", Game.currentPlayer.characterName);
        console.log("santé de la cible ", Game.target.characterName, " = " , Game.target.sante);
        Game.clickCount++
        setProgressBar(Game.target.sante);
        
    } 
    if (Game.target.sante <= 0 || Game.currentPlayer.sante <= 0) {
        var message = Game.currentPlayer.characterName + " a gagné !"
        hideFightButtons();
        console.log(message);
        GameUI.textCurrentPlayer.text(message);
    } else if (Game.clickCount > 0) {
        switchPlayerAfterFightAction();
    }
    
}

function defend () {
    Game.currentPlayer.defence = 2
    var damage = Game.currentPlayer.weapon.damage * Game.currentPlayer.defence;
}

