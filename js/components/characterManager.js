// Character manager component
document.addEventListener('alpine:init', () => {

    Alpine.data('characterManager', () => ({

        //TODO improve with state machine
        isNewCharacter: false,

        //Current character 
        currentCharacter: null,

        characterNamesArray: null,

        init() {

            this.currentCharacter = Alpine.store("currentCharacter");

            //If character is not il Alpine.store, create a new one
            if (!this.currentCharacter) {
                this.isNewCharacter = true;
                
                //Init name array (cached)
                this.characterNamesArray = Alpine.store("characterNamesArray");

                //__proto__ must be used from correct inheritance from model
                this.currentCharacter = { __proto__: characterModel };
                this.rerollCharacter();
            }

        },

        // Reroll a new Character
        rerollCharacter() {

            this.currentCharacter.name = this.characterNamesArray[RandomUtils.d(100) - 1];

            this.currentCharacter.toughness = RandomUtils.attributeRoll();
            this.currentCharacter.dexterity = RandomUtils.attributeRoll();
            this.currentCharacter.willpower = RandomUtils.attributeRoll();

        },

        // Confirms character and starts game
        confirmCharacter() {
            this.isNewCharacter = false;
            Alpine.store("currentCharacter", this.currentCharacter);
        }

    }))
})
