const { createAudioResource, createAudioPlayer, getVoiceConnection } = require('@discordjs/voice')
const { MessageEmbed } = require('discord.js')

const ytdl = require('ytdl-core')

function CreateNPEmbed(queue) {
    if (queue.songs[0].title) {
        queue.textChannel.send({embeds: [
            new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(queue.songs[0].title)
            .setURL(queue.songs[0].url)
            .setAuthor("Now playing")
        ]})
    } else {
        ytdl.getInfo(queue.songs[0].url).then(videoInfo => {
            queue.songs[0].title = videoInfo.videoDetails.title
            CreateNPEmbed(queue)
        })
    }
}


async function SongPlay(queue) {
    console.log(queue.songs)
    const song = queue.songs[0]
    if (!song) {
        queue.audioPlayer.stop()
        queue.audioPlayer = null
        return
    }
    
    const player = createAudioPlayer()
    player.on("error", (error) => {
        SongPlay(queue)
        console.log("An error occurred")
        console.log(error)
    })

    const stream = await ytdl(song.url, {filter:"audioonly"})
    const resource = createAudioResource(stream)
    player.play(resource)
    queue.audioPlayer = player
    
    const connection = getVoiceConnection(queue.guildId)
    connection.subscribe(player)
    resource.playStream.on("end", () => {
        queue.songs.shift()
        SongPlay(queue)
    })

    CreateNPEmbed(queue)
}

module.exports = SongPlay