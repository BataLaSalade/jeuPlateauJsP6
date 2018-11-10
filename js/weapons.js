var Weapon = {
    init : function (id, position, name, damage, url) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.damage = damage;
        this.imageUrl = url != "" ? url : "../img/png/weapon_baton.png";
    }
};

function genListWeapon (nbWeapons) {
    var listWeapons = [];
    var damage = 10;
    for (var i = 1; i < nbWeapons; i++) {
        var tmpPosition = getRandomPosition();
        var currentWeapon = Object.create(Weapon);
        damage += 5;
        currentWeapon.init(i, tmpPosition, weaponNames[i], damage, weaponListUrl[i]);
        listWeapons.push(currentWeapon);
    }
    return listWeapons;
}

function managePlayerWeapon(player) {
    for(var i = 0; i < mapContainer.weapons.length; i++) {
        var hasWeaponOnAvailablePosition = player.position.isSamePosition(mapContainer.weapons[i].position);
        var currentCaseElement = $(".line:eq("+ player.position.rowIndex +") .square:eq("+ player.position.colIndex +") .weapon");
        if (hasWeaponOnAvailablePosition) {
            player.inventory.push(mapContainer.weapons[i]);
            var currentCaseElement = $(".line:eq("+ player.position.rowIndex +") .square:eq("+ player.position.colIndex +") .weapon");
            currentCaseElement.css("background-image", "url("+ player.inventory[0].imageUrl +")");
            currentCaseElement.hide();
            player.weapon = mapContainer.weapons[i];
            player.inventory[0].position = player.weapon.position;
            var indexToRemove = i;
            break
        }
    }
    mapContainer.weapons.push(player.inventory[0]);
    player.inventory.splice(0,1);
    mapContainer.weapons.splice(indexToRemove, 1);
}

function showAllWeapon() {
    for(var i = 0; i < mapContainer.weapons.length; i++) {
        var weaponCell = $(".line:eq("+ mapContainer.weapons[i].position.rowIndex +") .square:eq("+ mapContainer.weapons[i].position.colIndex +") .weapon");
        weaponCell.show();   
    }
}

function hideWeapon() {
    for (var i = 0; i < mapContainer.weapons.length; i++) {
        var isPlayer1OnWeaponCell = Game.player1.position.isSamePosition(mapContainer.weapons[i].position);
        var isPlayer2OnWeaponCell = Game.player2.position.isSamePosition(mapContainer.weapons[i].position);
        if (isPlayer1OnWeaponCell || isPlayer2OnWeaponCell) {
            var weaponCell = $(".line:eq("+ mapContainer.weapons[i].position.rowIndex +") .square:eq("+ mapContainer.weapons[i].position.colIndex +") .weapon");
            weaponCell.hide();
        }
    }
}