const Discord = require('discord.js');


module.exports = async (client, oldMember, newMember) => {

    client.database.get(`SELECT * FROM logs WHERE guildID = ?`, newMember.guild.id, async (err, row) => {
        
        
        if (!row) return; 
        const logChannel = newMember.guild.channels.find(c => c.id === row.channelID);

   if (oldMember.voiceChannel && newMember.voiceChannel) {
        const current = (!newMember.voiceChannel ? oldMember.voiceChannel : newMember.voiceChannel)
        const VoiceUpdateOne = new Discord.RichEmbed()
            .setAuthor("Voice Movement »  " + oldMember.user.tag, oldMember.user.displayAvatarURL)
            .setColor(newMember.guild.member(newMember.id).displayHexColor)
            .setTitle(`${oldMember.user.tag} moved from a Voice Channel to Another Voice Channel.`)
            .addField("Old Channel Name", `${oldMember.voiceChannel.name}`)
            .addField("New Channel Name", `${newMember.voiceChannel.name}`)
            .setFooter(current.members.size + " members in " + current.name)
        logChannel.send(VoiceUpdateOne);
    }
    if (!oldMember.voiceChannel && newMember.voiceChannel) {
        const current = (!oldMember.voiceChannel ? newMember.voiceChannel : oldMember.voiceChannel)
        const VoiceUpdateTwo = new Discord.RichEmbed()
            .setAuthor("Voice Movement »  " + oldMember.user.tag, oldMember.user.displayAvatarURL)
            .setTitle(`${oldMember.user.tag} connected to a Voice Channel.`)
            .addField("Channel Name", `${newMember.voiceChannel.name}`)
            .setColor(newMember.guild.member(newMember.id).displayHexColor)
            .setFooter(current.members.size + " members in " + current.name)
            .setTimestamp(new Date())

        logChannel.send(VoiceUpdateTwo);
    }
    if (oldMember.voiceChannel && !newMember.voiceChannel) {
        const current = (!oldMember.voiceChannel ? newMember.voiceChannel : oldMember.voiceChannel)

        const VoiceUpdateThree = new Discord.RichEmbed()
            .setAuthor("Voice Movement »  " + oldMember.user.tag, oldMember.user.displayAvatarURL)
            .setTitle(`${oldMember.user.tag} disconnected from a Voice Channel.`)
            .addField("Left Channel", `${oldMember.voiceChannel.name}`)
            .setColor(newMember.guild.member(newMember.id).displayHexColor)
            .setFooter(current.members.size + " members in " + current.name)
            .setTimestamp(new Date())
        logChannel.send(VoiceUpdateThree);
    }     
})}
 