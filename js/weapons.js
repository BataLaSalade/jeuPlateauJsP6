var $weapon = $("<div />", {
    class : "weapon"
});

var weaponNames = ["Epée en bois","Baton", "Arc", "Epée", "Lance"];
var weaponListUrl = ["./img/png/weapon_epeeBois.png","./img/png/weapon_baton.png", "./img/png/weapon_arc.png", "./img/png/weapon_epee.png", "./img/png/weapon_lance.png"];

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
        damage += 5
        currentWeapon.init(i, tmpPosition, weaponNames[i], damage, weaponListUrl[i]);
        listWeapons.push(currentWeapon);
    }
    return listWeapons;
}

function managePlayerWeapon(player) {
    for(var i = 0; i < listObjects[2].length; i++) {
        var hasWeaponOnAvailablePosition = player.position.isSamePosition(listObjects[2][i].position);
        if (hasWeaponOnAvailablePosition) {
            player.inventory.push(listObjects[2][i]);
            var currentCaseElement = $(".line:eq("+ player.position.rowIndex +") .square:eq("+ player.position.colIndex +") .weapon");
            currentCaseElement.css("background-image", "url("+ player.inventory[0].imageUrl +")");
            currentCaseElement.hide();
            player.weapon = listObjects[2][i];
            player.inventory[0].position = player.weapon.position
            console.log("keke");
            var indexToRemove = i;
            break
        }
    }
    listObjects[2].push(player.inventory[0]);
    player.inventory.splice(0,1);
    listObjects[2].splice(indexToRemove, 1);
}

function showAllWeapon() {
    for(var i = 0; i < listObjects[2].length; i++) {
        $(".line:eq("+ listObjects[2][i].position.rowIndex +") .square:eq("+ listObjects[2][i].position.colIndex +") .weapon").show();
    }
}