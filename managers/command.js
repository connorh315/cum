const fs = require('fs')

const { Message } = require('discord.js')

const { prefix } = require('../config.json')

fs.readdir('./commands/', (err, files) => {
    if (err) throw err

    for (const file of files) {
        RegisterCommand(require('../commands/' + file))
    }
})

const commands = []
function RegisterCommand(command) {
    commands.push(command)
}

/**
 * @param {Message} message 
 */
function MessageReceived(client, queue, message) {
    const msg = message.content.trim()
    if (message.author.bot || msg[0] != prefix) return
    
    const args = msg.split(" ")
    const userCmd = args[0].substring(1)

    for (const command of commands) {
        if (userCmd == command.initiator || command.aliases && command.aliases.includes(userCmd)) {
            return command.callback(client, queue, message)
        }
    }
}

const Manager = require('../classes/CManager')
const CommandManager = new Manager("messageCreate", MessageReceived)

module.exports = CommandManager