const Manager = require('../classes/CManager')

const OnlineManager = new Manager("ready", () => {
    console.log("Online!")
})

module.exports = OnlineManager