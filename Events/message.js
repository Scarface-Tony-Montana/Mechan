const Discord = require("discord.js");
const wh = new Discord.WebhookClient(client.auth.logs.webhook_id, client.config.logs.webhook_token);
module.exports = (client, message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;  // <--- In future this will have a function to communicate between developer and user.
  if (message.content.indexOf(client.auth.discord.prefix) !== 0) return;
  if (!message.content.startsWith(client.auth.discord.prefix)) return;
  const args = message.content.slice(client.auth.discord.prefix.length).trim().split(/ +/g);
  let cmd = args.shift().toLowerCase();
  let command;
  const embed = new Discord.RichEmbed()
  
  if (client.commands.has(cmd)) {
    command = client.commands.get(cmd);
    embed.setAuthor(`Command Used By ${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .addField("Command Used", `${command}`,true)
    .addField("Message Content", `${message.content}`)
    .addField("Message ID", `${message.id}`,true)
    .addField("Guild ID", `${message.guild.id}`)
    .addField("Channel ID", `${message.channel.id}`,true)
    .setFooter(client.footer, client.footerIMG)
    .setColor("#79fa05")
  } else if (client.aliases.has(cmd)) {
    command = client.commands.get(client.aliases.get(cmd));
    embed.setAuthor(`Command Used By ${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .addField("Command Used", `${command}`,true)
    .addField("Message Content", `${message.content}`)
    .addField("Message ID", `${message.id}`,true)
    .addField("Guild ID", `${message.guild.id}`)
    .addField("Channel ID", `${message.channel.id}`,true)
    .setFooter(client.footer, client.footerIMG)
    .setColor("#79fa05")
    wh.send(embed);
  }
  if (client.auth.discord.commandNotFound == true){
    if(!command) return message.reply(`\`${cmd}\` command doesn't exist.`);
  }
  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Discord.Collection());
  }
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.help.name);
  const cooldownAmount = (command.help.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      message.delete();
      return message.reply(`Please wait ${timeLeft.toFixed(0)} more second(s) before reusing the \`${command.help.name}\` command.`);
    }
  }
  try {
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    command.run(client, message, args);
    message.delete();
  } catch (err) {
    if (err) return console.log(err);
  }
};

