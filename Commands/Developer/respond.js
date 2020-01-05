const Discord = require('discord.js')

module.exports.run = (client, message, args) => {
   if (args[0] === undefined || args[0] === null || !args[0] || !client.users.get(args[0])) return message.channel.send(`This user with ID: ${args[0]} is either not cached or no longer within reach!`);
        if (isNaN(args[0]) === true) return message.channel.send(`${args[0]} is not an id`);
        else {
            let guy = client.users.get(args[0]);
            let rep = args.slice(0).join(" ");
            if (!rep) return message.channel.send('You didn\'t type a reply');
            message.delete();
            guy.send(`\`MESSAGE FROM DEVELOPER\`\n\`\`\`${rep}\n\`\`\`\nIf you need further assistance or want to contact the developer, you can either add "${message.author.username}#${message.author.discriminator}"`).catch(err => message.channel.send(`Unable to send message to ${guy.username}#${guy.discriminator}`))
           message.channel.send(`Sent a dev reply to ${guy.username}#${guy.discriminator}`);
        }
}
module.exports.help = {
	name: "rtd",
	aliases: ["rtd"],
	description: "Respond to user via DM",
	usage: "<your_message>",
	category: "Developer",
};