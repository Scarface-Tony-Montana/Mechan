

const Discord = require("discord.js");
const Logger = require("../Monitors/console-monitor.js")
let count = 0;
module.exports = async (client, member) => {
    //require('../Functions/captchagenerator.js')(client,member);
    Logger(` "${member.user.username}" (ID:"${member.user.id}") has joined "${member.guild.name} (Server ID: ${member.guild.id})"`, "newuser");


    client.database.get(`SELECT * FROM logs WHERE guildID = ?`, member.guild.id, (err, row) => {
        // if (!/(?:https?:\/\/)?discord(?:app.com\/invite|.gg)\/[\w\d]+/gi.test(message.content))
        
        if (!row) return; 
        const logChannel = member.guild.channels.find(c => c.id === row.channelID);

        if (!logChannel) {
            return Logger(`The guildMemberAdd log channel does not exist in the server named '${client.guilds.get(member.guild.id).name}'`, "warn")
        }

        if (member.user.bot) {
            let newbot = new Discord.RichEmbed()

                .setTimestamp()
                .setTitle(`New Bot Joined`)
                .addField(`New Bot: `, `${member.user.username}`)
                .addField(`Total Users:`, `${member.guild.memberCount}`)
                .setColor(client.user.displayHexColor)
                .setFooter("New Bot Joined")
            logChannel.send(newbot)

        } else {


            let newuser = new Discord.RichEmbed()

                .setTimestamp()
                .setTitle(`New User Joined ${member.user.id === client.auth.discord.owner ? ' - 🛡 Bot Owner' : ''}`)
                .addField(`New User: `, `${member.user.username}`)
                .addField(`Total Users:`, `${member.guild.memberCount}`)
                .setColor(client.user.displayHexColor)
                .setFooter(`New User Joined ${member.user.id === client.auth.discord.owner ? ' - 🛡 Bot Owner' : ''}`)
                embed.addField(`Invite Detected`, `This user has a invite in their nickname.\nCounter: ${count}`) 
                if (client.guilds.get(member.guild.id).members.get(client.user.id).hasPermission("MANAGE_NICKNAMES") && client.guilds.get(newMember.guild.id).members.get(client.user.id).hasPermission("CHANGE_NICKNAME") && newMember.id !== newMember.guild.owner.id|| newMember.id !== client.auth.discord.owner) {
                    if (member.guild.username.includes("discord.gg/") || member.guild.username.includes("discord.me/")) { 
                        
                        count += 1;
                        const nicknames = [
                            `[#${count}] Change Your Name`,
                            `[#${count}] Dont Advertise Servers`,
                            `[#${count}] Invite Link In Username`
                        ];
                        const ry = Math.floor(Math.random() * nicknames.length);
                        client.abused.add(member.id);
                       
                        client.guilds.get(member.guild.id).members.get(member.id).setNickname(nicknames[ry]);
                    }
                }
                logChannel.send(newuser)
         }
    })

    client.database.get(`SELECT * FROM welcome WHERE guildID = ?`, member.guild.id, (err, row) => {
        if (!row) return;
        if (member.user.bot) {
            const welcome_channel = member.guild.channels.find(c => c.id === row.channelID);
            let embed = new Discord.RichEmbed()

                .setTimestamp()
                .setColor(member.user.displayHexColor)
                .setThumbnail(member.user.displayAvatarURL)
            if (row.welcome_message) {

                embed.setTitle(`Hello ${member.user.id === client.auth.discord.owner ? ' Master' : ''}`)
                embed.setDescription(`**Welcome ${member.user.tag}**`)
            } else {
                embed.setTitle(`Hello ${member.user.tag}`)
                embed.setDescription(`**Welcome Bot ${member.user.tag}**`)
            }

            embed.setFooter(client.footer)
            welcome_channel.send(embed)

        } else {
            const welcome_channel = member.guild.channels.find(c => c.id === row.channelID);

            let embed = new Discord.RichEmbed()

                .setTimestamp()
                .setColor(member.user.displayHexColor)
                .setThumbnail(member.user.displayAvatarURL)
            if (row.welcome_message) {

                embed.setTitle(`Hello ${member.user.id === client.auth.discord.owner ? ' Master' : ''}`)
                embed.setDescription(`**Here's a little description about this Guild.**\n\n${row.welcome_message}`)
            } else {
                embed.setTitle(`Hello ${member.user.tag}`)
                embed.setDescription(`Welcome to ${member.guild.name}`)
            }

            embed.setFooter(client.footer)

            welcome_channel.send(embed)
        }
    })



}
