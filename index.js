const Discord = require('discord.js')

require('dotenv').config()

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] })
client.login(process.env.BOT_TOKEN)

const queue = require('./queue')

const fs = require('fs')

fs.readdir("./managers/", (err, files) => {
    for (const file of files) {
        const manager = require("./managers/"+file)
        client.on(manager.event, (param1, param2) => {
            manager.callback(client, queue, param1, param2)
        })
    }
})