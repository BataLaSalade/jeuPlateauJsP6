var $weapon = $("<div />", {
    class : "weapon"
});

var Weapon = {
    init : function (position, name, damage, url) {
        this.name = name;
        this.position = position;
        this.damage = damage;
        this.imageUrl = url != "" ? url : "../img/png/weapon_baton.png";
    }
};

var weaponNames = ["Epée en bois","Baton", "Arc", "Epée", "Lance"];
var weaponListUrl = ["./img/png/weapon_epeeBois.png","./img/png/weapon_baton.png", "./img/png/weapon_arc.png", "./img/png/weapon_epee.png", "./img/png/weapon_lance.png"]

function genListWeapon(nbWeapons, colMaxIndex, rowMaxIndex) {
    var listWeapons = [];
    var damage = 10;
    for (var j = 1; j < nbWeapons; j++) {
        var tmpPosition = getCheckedPosition(colMaxIndex, rowMaxIndex);
        var currentWeapon = Object.create(Weapon);
        damage += 5;
        currentWeapon.init(tmpPosition, weaponNames[j], damage, weaponListUrl[j]);
        listWeapons.push(currentWeapon);
    }
    return listWeapons;
 }