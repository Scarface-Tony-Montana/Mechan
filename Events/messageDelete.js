const Discord = require("discord.js");
module.exports = async (client, message) => {
  if (!message.guild) return;
  client.database.get(`SELECT * FROM logs WHERE guildID = ?`,[message.guild.id],(err, row) => {
      if (!row) return;
        const logs = message.guild.channels.find(c => c.id === row.channelID);
        const logembed = new Discord.RichEmbed();
        if (message.attachments.first() && message.attachments.first().width && message.content) {
          logembed.setDescription(`**Message & Image sent by ${message.author.tag} deleted in ${message.channel}**`)
          logembed.addField("Message Content", `${message.content}`);
          logembed.setImage(message.attachments.first().proxyURL);
          logembed.setFooter("Deleted Image & Message")
        }else if (message.attachments.first() && message.attachments.first().width) {
          logembed.setDescription(`**Image sent by ${message.author.tag} deleted in ${message.channel}**`)
          logembed.setImage(message.attachments.first().proxyURL);
          logembed.setFooter("Deleted Image")
        } else {
          logembed.setDescription(`**Message sent by ${message.author.tag} deleted in ${message.channel}**`)
          logembed.addField("Message Content", `${message.content}`);
          logembed.setFooter("Deleted Message")
        }
        logembed.setAuthor(message.author.tag, message.author.displayAvatarURL)
          .setColor(message.guild.member(message.author.id).displayHexColor)
          .setTimestamp();
        logs.send(logembed);
  });
};
