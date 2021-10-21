class Command {
    initiator = ""
    callback = () => console.log("Callback not set!")
    aliases = []

    constructor(initiator, callback, aliases) {
        this.initiator = initiator
        this.callback = callback
        this.aliases = aliases
    }
}

module.exports = Command