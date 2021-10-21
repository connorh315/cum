const { Client, Message } = require('discord.js')

const Command = require('../classes/CCommand')

const Shuffle = require('../utilities/Shuffle')

/**
 * @param {Client} client 
 * @param {Object} queueManager 
 * @param {Message} message 
 */
function ShuffleSongs(client, queueManager, message) {
    Shuffle(queueManager.get(message.guild.id))
}

const ShuffleCommand = new Command("shuffle", ShuffleSongs)

module.exports = ShuffleCommand