const { Client, VoiceState } = require('discord.js')
const Manager = require('../classes/CManager')

const EndConnection = require('../utilities/EndConnection')

/**
 * 
 * @param {Client} client 
 * @param {Object} queueManager 
 * @param {VoiceState} oldState 
 * @param {VoiceState} newState 
 */
function UserLeave(client, queueManager, oldState, newState) {
    const state = oldState.channelId != null ? oldState : newState
    if (state.channel.members.size == 1 || oldState.member.id == client.user.id && newState.channelId == null) {
        const queue = queueManager.get(state.guild.id)
        if (queue) {
            EndConnection(queue)
        }
    }
}

const UserLeaveManager = new Manager("voiceStateUpdate", UserLeave)

module.exports = UserLeaveManager