//Rooms Manager
document.addEventListener('alpine:init', () => {

    Alpine.data('roomManager', () => ({

        currentRoom: null,

        hasCharacterReady: false,

        init() {

            this.currentRoom = Alpine.store("currentRoom");

            this.hasCharacterReady = Alpine.store("currentCharacter") ? true : false;

            //If room is not il Alpine.store, create a new one
            if (!this.currentRoom) {

                //Generate Room with random size.
                this.currentRoom = RandomUtils.generateNewRoom();

                Alpine.store("currentRoom", this.currentRoom);
            }

            // Render room if all is ready to play
            if (this.hasCharacterReady) {
                document.querySelector("#roomCanvas").addEventListener('roomMapUpdate', rendererEvent);
                document.querySelector("#roomCanvas").dispatchEvent(new Event('roomMapUpdate'));
            }
        },

        /**
         * Search for secrets in current room
         */
        searchRoom() {

            const currentPlayer = Alpine.store("currentCharacter")
            if (RandomUtils.d6() <= currentPlayer.survival && !this.currentRoom.alreadySearch) {

                this.currentRoom.adjacentRooms = this.currentRoom.adjacentRooms.concat(this.currentRoom.adjacentSecretRooms);
                this.currentRoom.adjacentSecretRooms = this.currentRoom.adjacentSecretRooms.splice();
            }

            this.currentRoom.alreadySearch = true;
            Alpine.store("currentRoom", this.currentRoom);
        },

    }))
})
