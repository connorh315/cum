const serverQueues = new Map()

class Queue {
    static get(guildId) {
        return serverQueues.get(guildId)
    }

    static create(guildId, text, voice) {
        const queueConstruct = {
            guildId: guildId,
            textChannel: text,
            voiceChannel: voice,
            songs: [],
            volume: 5,
            playing: true,
            destroy: function() {
                serverQueues.delete(guildId)
            }
        }
    
        serverQueues.set(guildId, queueConstruct)
    
        return queueConstruct
    }
}

module.exports = Queue