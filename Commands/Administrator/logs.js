const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (!args[0]) return message.channel.send("Please use this format:\nsetlogs/enablelogs <#chosen-channel>\ndisablelogs to disable logging.").then(() => message.delete(300 * 300));
    if (['enablelogs', 'setlogs'].includes(args[0])) {
        let ch = args[1];
        let channel = message.guild.channels.get(ch.replace(/[<>#]/g, ''))
        if (!channel) return message.channel.send("Please create the channel before using this command")
        client.database.get(`SELECT * FROM logs WHERE guildID = ?`, [message.guild.id], (err, row) => {
            if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                message.delete()
            }

            if (row) return message.channel.send(`Log channel has already been set to <#${row.channelID}>.`).then(m => m.delete(300 * 300));

            client.database.run("INSERT INTO logs (guildID, channelID) VALUES (?, ?)", [message.guild.id, channel.id], (err) => {
                if (err) return message.channel.send(err).then(m => m.delete(300 * 300));
                if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                    message.delete()
                }

                let modlog_set = new Discord.RichEmbed()
                    .setAuthor("Log Channel Set")
                    .addField(`Channel Set To`, `${channel}`)
                    .setFooter(`${client.footer}`)
                message.channel.send(modlog_set).then(m => m.delete(300 * 300));

            })

        })

    } else {
        if (['disablelogs'].includes(args[0])) {
            if (message.guild.members.get(client.user.id).hasPermission("MANAGE_MESSAGES")) {
                message.delete()
            }
            client.database.get(`SELECT * FROM logs WHERE guildID = ?`, [message.guild.id], (err, row) => {
                if (!row) return message.channel.send("No log channel has been set for this guild.").then(m => m.delete(300 * 300));

                client.database.run("DELETE FROM logs WHERE guildID = ?", [message.guild.id]);
                let modlog_disabled = new Discord.RichEmbed()
                    .setAuthor("Log Channel Disabled")
                    .setFooter(`${client.footer}`)
                message.channel.send(modlog_disabled).then(m => m.delete(300 * 300));
            })
        } else { message.channel.send("Please choose an option: \nsetlogs/enablelogs <#chosen-channel>\ndisablelogs to disable logging.").then(() => message.delete(300 * 300));}
    }
}
module.exports.help = {
	name: "logs",
	aliases: ["log","guildlog"],
	description: "Set Guild Logs",
	usage: "(command name)",
	category: "Administrator",
};