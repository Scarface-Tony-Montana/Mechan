const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  // let interval = 750;
  // let promise = Promise.resolve();
  // let targetRoles = message.channel.guild.roles.filter(r => r.name === args.join(" "))[1];
  // if (!targetRoles) message.channel.send("Could not find that role");
  // let targetRole = targetRoles.id;
  // let bots = message.channel.guild.members.filter(m => m.bot);
  // message.channel.send(`Now assigning this role to ${bots.length} bots`);
  // bots.forEach(function(m) {
  //   promise = promise.then(function() {
  //     message.channel.guild.addRole(m.id, targetRole);
  //     return new Promise(function(resolve) {
  //       setTimeout(resolve, interval);
  //     });
  //   });
  // });
  // promise.then(function() {
  //   message.channel.send(`<@${message.author.id}> Finished Giving Bot Roles!`);
  // });
};
module.exports.help = {
  name: "botrole - broken",
  aliases: ["givebotrole", "gbr","givebots"],
  description: "Give All Bots The Bot Role",
  usage: "gbr <role mention>",
  category: "Administrator"
};
