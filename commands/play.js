const { Message, Client, MessageEmbed } = require('discord.js')
const { joinVoiceChannel } = require('@discordjs/voice')

const ytdl = require('ytdl-core')
const spotifyToYT = require('spotify-to-yt')
const ytsr = require('ytsr')

const Command = require('../classes/CCommand')

const SongPlay = require('../utilities/SongPlay')

function niceTime(seconds) {
    return Math.floor(seconds / 60) + ":" + ((seconds % 60) > 9 ? seconds % 60 : "0" + (seconds % 60))
}

/**
 * @param {ytdl.videoInfo} songInfo 
 */
function CreateYTEmbed(songInfo, avatar) {
    console.log(avatar)
    return new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(songInfo.title)
        .setURL(songInfo.url)
        .setAuthor("Added to queue", avatar, 'https://connorharrison.co.uk')
        .addFields(
            { name: "Channel", value: songInfo.channelName, inline: true},
            { name: "Song Duration", value: songInfo.length, inline: true},
        )
        .setThumbnail(songInfo.thumbnailUrl)
}

function CreateSpotifyEmbed(tracks, avatar) {
    console.log(tracks.info.tracks.total)
    console.log(tracks.songs.length)
    return new MessageEmbed()
        .setColor('#1DB954')
        .setTitle(tracks.info.name)
        .setURL(tracks.info.href)
        .setAuthor("Added to queue", avatar, 'https://connorharrison.co.uk')
        .addFields(
            { name: "Songs in playlist", value: tracks.info.tracks.total.toString(), inline: true},
            { name: "Songs added to queue", value: tracks.songs.length.toString(), inline: true}
        )
        .setThumbnail(tracks.info.images[0].url)
}

function appendSong(queue, song) {
    if (Array.isArray(song)) {
        for (const single of song) {
            queue.songs.push(single)
        }
    } else {
        queue.songs.push(song)
    }
}

function isURL(string) {
    let url

    try {
        url = new URL(string)
    } catch (_) {
        return false
    }

    return url.protocol === "https:"
}

function FoundSong(client, queueManager, message, song) {
    const guild = message.guild

    var queue = queueManager.get(guild.id)
    console.log( queue && queue.audioPlayer)
    if (!queue) {
        const voiceChannel = message.member.voice.channel
        queue = queueManager.create(guild.id, message.channel, message.member.voice.channel)
        appendSong(queue, song)

        try {
            const connection = joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: guild.id,
                adapterCreator: guild.voiceAdapterCreator
            })
            queue.connection = connection
            SongPlay(queue)
        } catch (err) {
            throw err
        }
    } else if (!queue.audioPlayer) {
        appendSong(queue, song)
        SongPlay(queue)
    } else {
        appendSong(queue, song)
    }
    
}

/**
 * @param {Client} client
 * @param {Object} queueManager
 * @param {Message} message 
 */
async function AddToQueue(client, queueManager, message) {
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) {
        return message.channel.send("You need to be in a voice channel to play music!")
    }

    const permissions = voiceChannel.permissionsFor(message.client.user)
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send("I need the permissions to join and speak in your voice channel!")
    }

    const args = message.content.split(" ")
    const avatar = message.author.displayAvatarURL({dynamic: true})
    
    if (isURL(args[1])) {
        ytdl.getInfo(args[1]).then((songInfo) => {
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            }

            const ytStruct = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                channelName: songInfo.videoDetails.ownerChannelName,
                length: niceTime(songInfo.videoDetails.lengthSeconds),
                thumbnailUrl: songInfo.videoDetails.thumbnails[songInfo.videoDetails.thumbnails.length - 1].url
            }

            const embed = CreateYTEmbed(ytStruct, avatar)
            message.channel.send({embeds: [embed]})
    
            FoundSong(client, queueManager, message, song)
        }).catch(err => {
            spotifyToYT.isTrackOrPlaylist(args[1]).then(results => {
                message.channel.send("Getting Spotify playlist, one moment!")
                console.log(results)
                if (results == "playlist") {
                    spotifyToYT.playListGet(args[1]).then(tracks => {
                        const songs = []
                        console.log(tracks.info.images)
                        console.log(tracks)
                        for (const track of tracks.songs) {
                            const song = {
                                url: track
                            }
    
                            songs.push(song)
                        }
    
                        FoundSong(client, queueManager, message, songs)
    
                        const embed = CreateSpotifyEmbed(tracks, avatar)
                        message.channel.send({ embeds: [embed] })
                    })
                } else if (results == "song") {
                    spotifyToYT.trackGet(args[1]).then(song => {
                        console.log("Song:" + song)
                    })
                }
            }).catch(err => {
                message.channel.send("Couldn't find anything! The link you provided belongs to neither Spotify nor Youtube!")
            })
        })
    } else {
        args.shift()
        ytsr(args.join(" "), {limit: 3}).then(results => {
            for (const item of results.items) {
                if (item.type == "video") {
                    const song = {
                        title: item.title,
                        url: item.url
                    }

                    const ytStruct = {
                        title: item.title,
                        url: item.url,
                        channelName: item.author.name,
                        length: item.duration,
                        thumbnailUrl: item.bestThumbnail.url
                    }

                    const embed = CreateYTEmbed(ytStruct, avatar)
                    message.channel.send({embeds: [embed]})
            
                    FoundSong(client, queueManager, message, song)

                    break
                }
            }
        })
    }
}

const PlayCommand = new Command("play", AddToQueue, ["p"])

module.exports = PlayCommand