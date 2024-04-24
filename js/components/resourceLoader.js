document.addEventListener('alpine:init', () => {

    // Load all resoruces
    Alpine.data('resourceLoader', () => ({

        // Code here...
        async init() {

            Alpine.store("characterNamesArray", JSON.parse(await (await fetch(`../data/characterNames.json`)).text()).names);
        }
    }))
})
