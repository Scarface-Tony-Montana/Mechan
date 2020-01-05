const Discord = require('discord.js');
let count = 0;

module.exports = async (client, oldMember, newMember) => {
    client.database.get(`SELECT * FROM logs WHERE guildID = ?`, newMember.guild.id, async (err, row) => {
        
        
        if (!row) return; 
        const logChannel = newMember.guild.channels.find(c => c.id === row.channelID);

        if (!logChannel) {
            return Logger(`The guildMemberAdd log channel does not exist in the server named '${client.guilds.get(newMember.guild.id).name}'`, "warn")
        }

        if (oldMember.nickname !== newMember.nickname) {
            let embed = new Discord.RichEmbed()
                .setColor(newMember.displayColor)
                .setAuthor(`Nickname Changed`, newMember.user.displayAvatarURL)
                .setTimestamp()
                .setDescription(`**Old: **${oldMember.nickname ? oldMember.nickname : oldMember.user.username}\n**New: **${newMember.nickname ? newMember.nickname : newMember.user.username}`)
                if(newMember.guild.me.hasPermission('VIEW_AUDIT_LOG')){
                await newMember.guild.fetchAuditLogs({type: "MEMBER_UPDATE"}).then(async log => {
                    let mod = log.entries.first().executor;
                    if(mod.id !== newMember.user.id){
                    embed.addField(`\u200b`, `**User: **${newMember}\`\`${newMember.user.tag}\`\` (${newMember.id})\n**Updated By: **${mod} \`\`${mod.tag}\`\` (${mod.id})`)
                    }else{
                    embed.addField(`\u200b`, `**User: **${newMember}\`\`${newMember.user.tag}\`\` (${newMember.id}))`)
                    }

                    if (client.guilds.get(newMember.guild.id).members.get(client.user.id).hasPermission("MANAGE_NICKNAMES") && client.guilds.get(newMember.guild.id).members.get(client.user.id).hasPermission("CHANGE_NICKNAME") && newMember.id !== newMember.guild.owner.id|| newMember.id !== client.auth.discord.owner) {
                    if (newMember.nickname.includes("discord.gg/") || newMember.nickname.includes("discord.me/")) { 
                    if (count>3){ 
                            embed.addField(`Auto Kick Triggered`, `This user has had invite in their nickname more than ${count-1} times and has been kicked`) 
                           newMember.kick(`Auto Kick Triggered - This user has had invite in their nickname more than ${count-1} times and has been kicked`)
                           .then(() => console.log(`Kicked ${newMember.displayName}`)) 
                        }
                        count += 1;
                        const nicknames = [
                            `[#${count}] Invite Link Removed`,
                            `[#${count}] Dont Advertise Servers`,
                            `[#${count}] Invite Link In Nickname`
                        ];
                        const ry = Math.floor(Math.random() * nicknames.length);
                        client.abused.add(newMember.id);
                        client.guilds.get(newMember.guild.id).members.get(newMember.id).setNickname(nicknames[ry]);
                    }  else if (!newMember.nickname.includes("discord.gg/") || !newMember.nickname.includes("discord.me/")){

                    }
                    } else {
                       console.log("Permission Denied")
                    }
                    })
                }
          return logChannel.send(embed)
        
    } else if (oldMember.roles !== newMember.roles) {
            let oldRoles = oldMember.roles.map(role => role.name)
            let newRoles = newMember.roles.map(role => role.name)
            if (oldRoles == newRoles) return;
            let data = [];
            let colors = [];
            oldRoles.forEach(role => {if(newRoles.includes(role)){return;}else{let r = newMember.guild.roles.find(c => c.name === role);colors.push(r.hexColor);data.push(` ${r} (${r.id})`)}}) 
            newRoles.forEach(role => {if(oldRoles.includes(role)) {return;}else{let r = newMember.guild.roles.find(c => c.name === role);colors.push(r.hexColor);data.push(` ${r} (${r.id})`)}});
            let message = '';
            let color = '';
            if(data.length > 1){
                message = "Multiple Member Roles Manipulated"
            }else{
                message = "Member Roles Manipulated";
                color = colors[0];
            }
            let e = new Discord.RichEmbed()
            .setTimestamp()
            .setAuthor(newMember.user.tag, newMember.user.displayAvatarURL)
            .setColor(color?color:"PURPLE")
            .setFooter(client.user.tag, client.user.displayAvatarURL)
            .setTitle(message)
            .addField(`Member`, `${newMember.user} \`@${newMember.user.tag}\` (${newMember.user.id})`)
            .setDescription(data.join('\n'))
            if(newMember.guild.me.hasPermission("VIEW_AUDIT_LOG")){
                await newMember.guild.fetchAuditLogs({type: "MEMBER_ROLE_UPDATE"}).then(async logs => {
                    let moderator = logs.entries.first().executor;
                    if(moderator.id !== newMember.user.id){
                        e.addField(`Moderator`, `${moderator} \`@${moderator.tag}\` (${moderator.id})`)
                    }
            });
            }
           return logChannel.send(e)
    }
})}
