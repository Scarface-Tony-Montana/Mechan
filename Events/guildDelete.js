const fs = require("fs");
const Discord = require("discord.js");
const Logger = require("../Monitors/console-monitor.js")
module.exports = (client,guild) => {
  Logger(`Left Guild: ${guild.name} (id: ${guild.id})`,"leftguild");
  client.dbl.postStats(client.guilds.size);
  console.log(`Guild Count: ${client.guilds.size}`)
  // const logChannel=client.channels.find(c=> c.name=== 'dbrxiqi');
  
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
  
  // let embed = new Discord.RichEmbed()
  
  // .setTimestamp()
  // .setTitle(`Left Server`)
  // .addField(`Server Name: `,`${guild.name}`)
  // .addField(`Server ID:`,`${guild.id}`)
  // .addField(`Member Count:`,`${guild.memberCount}`)
  // .addField(`Server Owner:`,`${guild.owner}`)
  
  // .setColor("RANDOM")
  // .setFooter("Leaving Server Logs")
 
  // logChannel.send( embed)

  // fs.writeFile(`./servers/serverlist.txt`, `${client.guilds.map(g => `Server Owner: ${g.owner.user.tag}\r\n`+"Server Name: "+g.name+"\r\nServer ID: "+g.id+`\r\nBot Joined: ${g.joinedAt.getDate()}/${g.joinedAt.getMonth()}/${g.joinedAt.getFullYear()}\r\nTime Bot Joined: ${g.joinedAt.getHours().toString().length < 2 ? "0" + g.joinedAt.getHours() : g.joinedAt.getHours().toString()}:${g.joinedAt.getMinutes().toString().length < 2 ? "0" + g.joinedAt.getMinutes() : g.joinedAt.getMinutes().toString()}${g.joinedAt.getHours() > 12 ? "pm" : "am"}\r\nMember Count: ${g.memberCount}\r\n\r\n`).join('')}`, (err)=>{
  //   if (err) console.error(err);
  // }) 
  // logChannel.send({ files: [('./servers/serverlist.txt')] });
}