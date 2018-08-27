var $weapon = $("<div />", {
    class : "weapon"
});

var weaponNames = ["Epée en bois","Baton", "Arc", "Epée", "Lance"];
var weaponListUrl = ["./img/png/weapon_epeeBois.png","./img/png/weapon_baton.png", "./img/png/weapon_arc.png", "./img/png/weapon_epee.png", "./img/png/weapon_lance.png"];

var Weapon = {
    init : function (position, name, damage, url) {
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
        currentWeapon.init(tmpPosition, weaponNames[i], damage, weaponListUrl[i]);
        listWeapons.push(currentWeapon);
    }
    return listWeapons;
}