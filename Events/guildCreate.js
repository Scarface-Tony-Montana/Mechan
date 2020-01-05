const fs = require("fs");
const Discord = require("discord.js");
const Logger = require("../Monitors/console-monitor.js")
module.exports = async (client,guild, message) => {
//   client.con.get(`SELECT * FROM guildban WHERE guildID = "${guild.id}"`, (err, r) => {
//     if(err) console.log(err)
//     if(r) {
       
//         let blacklistEmbed = new Discord.RichEmbed()
//         .addField(`Your Server Has Been Banned For Violating The Usage Of ${client.user.username}.`,`\n\n**This is an automated-message stating you are unable to use this bot for the following reason: ${r.reason}\n\nIf you would to like to argue your case in respect of your ban\nPlease contact us in our support server [here](https://discord.gg/ufxFPaZ).**`)
        
//         .setColor("#4286f4")
//         var got = false;
//   guild.channels.forEach(function(channel, id) {
//       // If a channel is already found, nothing more needs to be done
//       if(got == true || channel.type != "text") {
//         return;
//       }
//       // If the channel isn't found and the bot has permission to 
//       // send and read messages in the channel, send a welcome message there
//       if(guild.me.permissionsIn(channel).has("SEND_MESSAGES") && guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
//         got = true;
//     channel.send(blacklistEmbed).catch(console.error).then(message => message.delete(300 * 300));
//     }else{
//      return;
//     }
//   })
// }else{


  //client.dbl.postStats(client.guilds.size);
  console.log(`Guild Count: ${client.guilds.size}`)
  Logger(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members.`,"joinguild");
 

  // var found = false;
  // guild.channels.forEach(function(channel, id) {
  //     // If a channel is already found, nothing more needs to be done
  //     if(found == true || channel.type != "text") {
  //       return;
  //     }
  //     // If the channel isn't found and the bot has permission to 
  //     // send and read messages in the channel, send a welcome message there
  //     if(guild.me.permissionsIn(channel).has("SEND_MESSAGES") && guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
  //       found = true;
  //       return channel.send(`Thanks for inviting me to ${guild.name}, My prefix is: \`${client.default.prefix}\``)
  //     }else{
       // guild.owner.user.send(`Someone from your guild has invited me to your guild, Thanks for inviting me to ${guild.name}, My prefix is: \`${client.default.prefix}\``)
  //    }
  // })
//   const presences = [
//     `${client.guilds.size.toLocaleString()} Guilds | ${client.default.prefix} help`,
//     `${client.users.filter(u => !u.bot).size.toLocaleString()} Users | ${client.default.prefix} help`
// ];

// setInterval(() => {
//     const ry = Math.floor(Math.random() * presences.length);

//     client.user.setActivity(presences[ry], {
//         type: "WATCHING"
//     });
// }, 18000);
  // const logChannel=client.channels.find(c=> c.name=== 'dbrxiqi');
  // let embed = new Discord.RichEmbed()
  
  // .setTimestamp()
  // .setTitle(`Joined Server`)
  // .addField(`Server Name: `,`${guild.name}`)
  // .addField(`Server ID:`,`${guild.id}`)
  // .addField(`Member Count:`,`${guild.memberCount}`)
  // .addField(`Server Owner:`,`${guild.owner}`)
  // .setColor("RANDOM")
  // .setFooter("Joining Server Logs")
 
  // logChannel.send( embed)

  // fs.writeFile(`./servers/serverlist.txt`, `${client.guilds.map(g => `Server Owner: ${g.owner.user.tag}\r\n`+"Server Name: "+g.name+"\r\nServer ID: "+g.id+`\r\nBot Joined: ${g.joinedAt.getDate()}/${g.joinedAt.getMonth()}/${g.joinedAt.getFullYear()}\r\nTime Bot Joined: ${g.joinedAt.getHours().toString().length < 2 ? "0" + g.joinedAt.getHours() : g.joinedAt.getHours().toString()}:${g.joinedAt.getMinutes().toString().length < 2 ? "0" + g.joinedAt.getMinutes() : g.joinedAt.getMinutes().toString()}${g.joinedAt.getHours() > 12 ? "pm" : "am"}\r\nMember Count: ${g.memberCount}\r\n\r\n`).join('')}`, (err)=>{
  //   if (err) console.error(err);
  // }) 
  // logChannel.send({ files: [('./servers/serverlist.txt')] });
}

