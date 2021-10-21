const { Client, Message } = require('discord.js')

const Command = require('../classes/CCommand')

const SongPause = require('../utilities/SongPause')

/**
 * @param {Client} client 
 * @param {Object} queueManager 
 * @param {Message} message 
 */
function Pause(client, queueManager, message) {
    SongPause(queueManager.get(message.guild.id))
}

const PauseCommand = new Command("pause", Pause)

module.exports = PauseCommand