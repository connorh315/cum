class Manager {
    event = ""
    callback = () => {
        console.log("Not instantiated!!!!!")
    }

    constructor(event, callback) {
        this.event = event
        this.callback = callback
    }
}

module.exports = Manager