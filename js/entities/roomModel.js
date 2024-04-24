//Room model

const RoomSizes = Object.freeze({
    Diminutive: "diminutive",
    Small: "small",
    Medium: "medium",
    Large: "large",
    Huge: "huge",
    Colossal: "colossal"
});

const DoorPosition = Object.freeze({
    Cieling: 'cieling',
    Floor: 'floor',
    North: 'north',
    South: 'south',
    West: 'west',
    East: 'east'
});

const roomModel = {

    roomId: undefined,

    adjacentRooms: [],
    adjacentSecretRooms: [],

    size: undefined,

    loot: [],
    secretLoot: [],

    enemies: [],

    //Room description
    get description() {
        return `This ${RoomSizes[this.size]} room is full of things. ${this.lootDescription}
        
        It has ${this.adjacentRooms.length} visibile door${this.adjacentRooms.length > 1 ? `s: ${this.getDoorsDescription}` : ` on the ${this.adjacentRooms[0].side}`}.`
    },

    get getDoorsDescription() {
        const sideMap = this.adjacentRooms.map(r => r.side);
        return `\n one on the ${sideMap.join(",\n one on the ")}`
    },

    //TODO should be here?
    get lootDescription() {

        const allItemsInLootDescriptions = this.loot.map(i => `${i.quantity} ${i.description}`);

        return `${this.loot.length > 0 ? 'You see ' : ''} ${allItemsInLootDescriptions.join(' , ')}`;
    }
};