module.exports.run = (client, message, args) => {
  const premium = require("../../Monitors/premium-monitor")(client, message);
  if (premium)return message.channel.send(`${message.author}, You have access to all of ${client.user}\'s premium features!`);
  message.channel.send(`You can get premium features by purchasing the Premium Role in our main guild ${client.auth.discord.guildInvite}`);
};

module.exports.help = {
  name: "premium",
  aliases: ["premium"],
  description: "Check if you have access to the Premium Features",
  usage: "",
  category: "General"
};
