// This must me done to hook on Alpine.js lifecycle.
// This callback is executed when the whole framework is initialized
document.addEventListener('alpine:init', () => {

    // This can bind some pre-defined data inside your application using "x-data".
    // Using this, you can re-use this data multiple times (ex. for components)
    // you can also specifiy some parameters to pass to it
    Alpine.data('search', (itemList = []) => ({

        textToSearch: '',

        itemsToSearchFrom: itemList,

        // getter (get) can be called as a property (instead of being a function). 
        get filteredItems() {
            return this.itemsToSearchFrom.filter(
                i => i.startsWith(this.textToSearch)
            )
        }
    }))
})
