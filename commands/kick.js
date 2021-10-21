const { Client, Message } = require('discord.js')

const Command = require('../classes/CCommand')

const EndConnection = require('../utilities/EndConnection')

function Leave(client, queueManager, message) {
    EndConnection(queueManager.get(message.guild.id))
}

const KickCommand = new Command("kick", Leave, ["fuckoff", "leave"])

module.exports = KickCommand