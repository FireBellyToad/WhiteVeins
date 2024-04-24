// Model for Character template
const equipItemLimit = 10;
const expThreshold = 2000;

//TODO spostare
const  ItemType  = Object.freeze({ 
    Armor: 0,
    Weapon: 1
});

const characterModel = {

    name: '',
    playerName: '',

    // HP
    currentHP: 6,
    totalHP: this.currentHP,

    // Attributes
    toughness: 0,
    dexterity: 0,
    willpower: 0,

    level: 1,
    currentExp: 0,

    currentEquip: [],

    equippedArmor: undefined,

    get armorValue() {

        //Sum all the values of armor and shield. If Unarmored, do 10 + shield
        const armorItem = this.currentEquip.filter(i => i.type === ItemType.Armor);
     
        if (!armorItem[0] || !armorItem[0].armor){
            return 0;
        }

        return armorItem[0].armor;
    },

    get isDead() {
        return this.currentHP <= 0;
    },

    get expForNextLevel() {
        return expThreshold * this.level;
    }
}