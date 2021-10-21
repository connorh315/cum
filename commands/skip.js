const { Client, Message } = require('discord.js')

const Command = require('../classes/CCommand')

const SongSkip = require('../utilities/SongSkip')

/**
 * @param {Client} client 
 * @param {Object} queueManager 
 * @param {Message} message 
 */
function Skip(client, queueManager, message) {
    SongSkip(queueManager.get(message.guild.id))
}

const SkipCommand = new Command("skip", Skip)

module.exports = SkipCommand