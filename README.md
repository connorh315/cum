# Connor's Unique Music Bot

## Description

A Discord Bot written purely in Javascript using Discord JS which supports both YouTube and Spotify songs/playlists.

## Commands

`play` - Adds song to queue and connects to voice channel that the message author is attached to

`pause` - Pauses/Unpauses current song

`skip` - Skips the current song

`queue` - Displays current queue

`shuffle` - Shuffles the queue

`kick` - Kicks the bot

## Installation instructions

Run `npm install` at the root of this project

Create a `.env` file at the root of this project and enter the following:

`TOKEN=<discord bot token here>`

All done! Run `node index.js` to start the bot and it should spit out: 

`Online!`