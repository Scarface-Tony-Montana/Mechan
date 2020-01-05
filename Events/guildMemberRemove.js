

const Discord = require("discord.js");
const Logger = require("../Monitors/console-monitor.js")

module.exports = async (client, member) => {
    
    Logger(` "${member.user.username}" (ID:"${member.user.id}") has left "${member.guild.name} (Server ID: ${member.guild.id})"`, "userleft");


    



}
