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

function setProgressBar(targetHealth, currentPlayerHealth) {
    var relayAttribute = {};
    var ariaValuenowAttr = "aria-valuenow";
    var styleAttr = "style";
    var playerLifeToSet = targetHealth
    switch (playerLifeToSet) {
        case targetHealth:
            targetHealth = (targetHealth<=0) ? 0 : targetHealth;
            relayAttribute[ariaValuenowAttr] = String(targetHealth);
            relayAttribute[styleAttr] = "width:"+String(targetHealth)+"%";
            var targetProgressbar = (Game.target == mapContainer.players[playerEnum.blue]) ? GameUI.bluePlayerProgressbar : GameUI.redPlayerProgressbar;
            targetProgressbar.attr(relayAttribute);
            var targetPVLabel = (Game.target == mapContainer.players[playerEnum.blue]) ? GameUI.bluePlayerPVLabel : GameUI.redPlayerPVLabel;
            targetPVLabel.text(targetHealth + " PV");
        case currentPlayerHealth:
            currentPlayerHealth = (currentPlayerHealth<=0) ? 0 : currentPlayerHealth;
            relayAttribute[ariaValuenowAttr] = String(currentPlayerHealth);
            relayAttribute[styleAttr] = "width:"+String(currentPlayerHealth)+"%";
            var currentPlayerProgressbar = (Game.currentPlayer == mapContainer.players[playerEnum.blue]) ? GameUI.bluePlayerProgressbar : GameUI.redPlayerProgressbar;
            currentPlayerProgressbar.attr(relayAttribute);
            var currentPlayerPVLabel = (Game.currentPlayer == mapContainer.players[playerEnum.blue]) ? GameUI.bluePlayerPVLabel : GameUI.redPlayerPVLabel;
            currentPlayerPVLabel.text(currentPlayerHealth + " PV");
        default:
            break;
    } 
}

function attack () {
    var damage = Game.currentPlayer.weapon.damage / Game.target.defence;  
    if (Game.target.sante > 0 && Game.currentPlayer.sante > 0) {
        if (Game.target.defence == 2) {
            Game.target.sante -= damage;
            Game.currentPlayer.sante -= damage*0.25;
            console.log("*****")
            console.log("Joueur actuel : ", Game.currentPlayer.characterName);
            console.log("santé de ", Game.currentPlayer.characterName, " = " , Game.currentPlayer.sante);
            console.log("Cible actuel : ", Game.target.characterName);
            console.log("santé de la cible ", Game.target.characterName, " = " , Game.target.sante);
            console.log("*****")
            Game.target.defence =1;
        } else {
            Game.target.sante -= damage;
            console.log("*****")
            console.log("Joueur actuel : ", Game.currentPlayer.characterName);
            console.log("santé de la cible ", Game.target.characterName, " = " , Game.target.sante);
            console.log("*****")
        }
        Game.clickCount++;
        setProgressBar(Game.target.sante, Game.currentPlayer.sante);
    } 
    if (Game.target.sante <= 0 || Game.currentPlayer.sante <= 0) {
        var troll = Game.currentPlayer.characterName + " a gagné ! mais comme c'est un bleu, il perd automatiquement la partie. De toute façon les Rouges sont les meilleurs !";
        var redPlayerWin = Game.currentPlayer.characterName + " a gagné !"
        var message = (Game.currentPlayer == mapContainer.players[playerEnum.blue]) ? troll : redPlayerWin;
        hideFightButtons();
        console.log(message);
        GameUI.textCurrentPlayer.text(message);
    } else if (Game.clickCount > 0) {
        switchPlayerAfterFightAction();
    }
}

function defend () {
    if (Game.target.sante > 0 && Game.currentPlayer.sante > 0) {
        Game.currentPlayer.defence = 2;
        console.log("Joueur actuel : ", Game.currentPlayer.characterName);
        console.log("a augmenté sa défense = ", Game.currentPlayer.defence);
        Game.clickCount++;   
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

