// Class for dice rolls
const RandomUtils = Object.freeze({

    d(sides) {
        return Math.floor(Math.random() * sides) + 1
    },

    d6() {
        return this.d(6)
    },

    d20() {
        return this.d(20)
    },

    // Using Knave / Canaglie Logic 
    attributeRoll() {
        return Math.min(this.d6(), this.d6(), this.d6());
    },

    // Using LotFP Logic 
    skillRoll() {
        return Math.max(1, Math.floor(this.d6() / 2));
    },

    /**
     * 
     * @param {*} uuid predefined roomId
     * @returns a new room
     */
    generateNewRoom(uuid = crypto.randomUUID()) {

        //__proto__ must be used from correct inheritance from model
        const room = {
            __proto__: roomModel,
            roomId: uuid,
            size: Object.keys(RoomSizes)[RandomUtils.d(5)]
        };

        this.generateDoors(room);

        return room
    },

    /**
     * 
     */
    generateDoors(currentRoom) {

        if (!currentRoom) {
            throw new Exception("No room given");
        }

        //Generate visible and hidden doors (avoid duplicates)
        const totalVisibleRooms = RandomUtils.d(5);

        for (let i = 0; i < totalVisibleRooms; i++) {

            const side = Object.keys(DoorPosition)[RandomUtils.d(5)];

            if (!currentRoom.adjacentRooms.find(d => d.side === side)) {

                currentRoom.adjacentRooms.push({ side: side, roomId: crypto.randomUUID() });
            }

        }

        //2 on 6 that could there be secret rooms
        if (totalVisibleRooms < 6 && RandomUtils.d6() < 3) {

            for (let i = 0; i < 6 - totalVisibleRooms; i++) {

                const side = Object.keys(DoorPosition)[RandomUtils.d6() - 1];

                if (!currentRoom.adjacentSecretRooms.find(d => d.side === side)) {

                    currentRoom.adjacentSecretRooms.push({ side: side, roomId: crypto.randomUUID() });
                }

            }

        }

    },
});