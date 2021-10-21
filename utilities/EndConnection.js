const { getVoiceConnection } = require('@discordjs/voice')

function EndConnection(queue) {
    const connection = getVoiceConnection(queue.guildId)

    if (connection) {
        connection.destroy()
        queue.destroy()
    }
}

module.exports = EndConnection