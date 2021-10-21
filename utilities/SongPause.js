function SongPause(queue) {
    if (queue && queue.audioPlayer) {
        if (queue.audioPlayer.state.status == 'paused') {
            queue.audioPlayer.unpause()
        } else {
            queue.audioPlayer.pause()
        }
    }
}

module.exports = SongPause