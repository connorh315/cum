const { Client, Message } = require('discord.js')

const Command = require('../classes/CCommand')

/**
 * @param {Client} client 
 * @param {Object} queueManager 
 * @param {Message} message 
 */
function ShowQueue(client, queueManager, message) {
    const queue = queueManager.get(message.guild.id)
    
    if (queue) {
        const list = queue.songs.map((song, i) => `${i + 1}. ${song.title || "Spotify song"}`).join("\r\n") // TODO: Probably should just find out what the song title is...
        
        message.channel.send(list)
    } else {
        message.channel.send("No songs in queue!")
    }
}

const QueueCommand = new Command("queue", ShowQueue, ["q"])

module.exports = QueueCommand