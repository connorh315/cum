const SongPlay = require('./SongPlay')

function SongSkip(queue) {
    if (queue && queue.audioPlayer) {
        queue.songs.shift()
        SongPlay(queue)
    }
}

module.exports = SongSkip