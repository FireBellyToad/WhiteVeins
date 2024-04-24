// This must me done to hook on Alpine.js lifecycle.
// This callback is executed when the whole framework is initialized
document.addEventListener('alpine:init', () => {

    // This can bind some pre-defined data inside your application using "x-data".
    // Using this, you can re-use this data multiple times (ex. for components)
    // you can also specifiy some parameters to pass to it
    Alpine.data('navigator', () => ({

        // Current page to show
        pageToShow: "",

        // cache to avoid unneeded page fetches
        pageCache: {},

        // init the navigator with a landing page
        async init() {
            this.pageCache['hello'] = await (await fetch(`./html/hello.html`)).text()
            this.pageToShow = this.pageCache['hello'];
        },

        // show a new page
        async showPage(page) {

            // Set the page in cache if loaded for the first time
            if (!this.pageCache[page]) {
                this.pageCache[page] = await (await fetch(`./html/${page}.html`)).text()
            }

            // set the page to show
            this.pageToShow = this.pageCache[page];
        },

    }))
})
