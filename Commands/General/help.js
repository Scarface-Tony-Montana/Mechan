const { RichEmbed } = require("discord.js");
const { readdirSync } = require("fs");

module.exports.run = (client, message, args) => {
 
	const embed = new RichEmbed()
		.setColor("#2C2F33")
		.setAuthor(`${client.user.username} Help Command`, client.user.displayAvatarURL)
		.setFooter(client.footer, client.footerIMG)

	if (args[0]) {
		let command = args[0];
		let cmd;
		if (client.commands.has(command)) {
			cmd = client.commands.get(command);
		}
		else if (client.aliases.has(command)) {
			cmd = client.commands.get(client.aliases.get(command));
		}
		if(!cmd) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${client.auth.discord.prefix}help\` for the list of the commands.`));
		command = cmd.help;
		embed.setTitle(`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)} - Help Command`);
		embed.setDescription([
       "`<>`means needed and `()` it is optional but *don't include these prefixes*",
			`> **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`,
			`> **Description:** ${command.description || "No Description Provided."}`,
			`> **Usage:** ${command.usage ? `\`${client.auth.discord.prefix}${command.name} ${command.usage}\`` : "No Usage Provided"} `,
			`> **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None"}`,
			`> **Category:** ${command.category ? command.category : "General" || "Misc"}`,
		].join("\n"));

		return message.channel.send(embed);
	}
	const categories = readdirSync("./Commands/");
	embed.setDescription([
		`Available commands for ${client.user.username}.`,
		`My default-prefix is **${client.auth.discord.prefix}**`,
		
	].join("\n"));
  
	categories.forEach(category => {
		const dir = client.commands.filter(c => c.help.category.toLowerCase() === category.toLowerCase());
		const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);
		const devs = Object.values(client.auth.discord.developers).includes(message.author.id)
    const admins = message.member.hasPermission('KICK_MEMBERS'||'BAN_MEMBERS')
    const premium = require("../../Monitors/premium-monitor")(client, message);
    //if(devs === admins||premium) embed.addField(`> ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
    //if(admins === premium) embed.addField(`> ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
		try {
			if (dir.size === 0) return;
      message.channel.send(category === "Premium")
			if (devs) embed.addField(`> ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
      //if (admins) embed.addField(`> ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
     // if (premium) embed.addField(`> ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
			else if (category !== "Developer" && "Premium" && "Administrator") embed.addField(`> ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
      
		}
		catch (e) {
			console.log(e);
		}
	}); 
  
	return message.channel.send(embed);
};

module.exports.help = {
	name: "help",
	aliases: ["h","helpme","cmdinfo"],
	description: "Help command to show the commands",
	usage: "(command name)",
	category: "General",
};