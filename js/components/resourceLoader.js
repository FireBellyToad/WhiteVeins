/**
 * Resource load on Alpine.js init 
 */
document.addEventListener('alpine:init', () => {

    // Load all resources
    Alpine.data('resourceLoader', () => ({

        async init() {

            //d100 Charcters name
            Alpine.store("characterNamesArray", JSON.parse(await (await fetch(`../data/characterNames.json`)).text()).names);
        }
    }))
})
