const { MessageEmbed } = require("discord.js")

function CreateShuffleEmbed(queue) {
    queue.textChannel.send({ embeds: [
        new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor("Shuffled songs")
    ]})
}

// Fisher-Yates up in this bitch
function Shuffle(queue) {
    if (queue.songs.length > 2) {
        for (var i = queue.songs.length - 1; i > 1; i--) {
            const final = queue.songs[i]
            const rand = Math.floor(Math.random() * (i - 1)) + 1 // We don't want to shuffle the first element so we just remap the random number to be 1 -> currPos rather than 0 -> currPos
            
            if (rand == final) continue
            
            queue.songs[i] = queue.songs[rand]
            queue.songs[rand] = final
        }
    }

    CreateShuffleEmbed(queue)
}

module.exports = Shuffle