const Discord = require('discord.js')
var PastebinAPI = require('pastebin-js');
const hastebin = require('hastebin-gen');
const moment = require('moment')
require("moment-duration-format");
const os = require("os");
const snekfetch = require('snekfetch');
module.exports.run = (client, message, args) => {
    var pastebin = new PastebinAPI(`${client.auth.PastebinAPI}`); // Get from https://pastebin.com/api#1
    if (message.author.id !== client.auth.discord.owner) return;
    if (!pastebin) {
        console.log("Go to https://pastebin.com/api#1 and get an API Key and place it in the authentication.json")
        process.exit(1)
    } else {
        const clean = (text) => {
            if (typeof (text) === 'string') {
                return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
            } else {
                return text
            }
        }
        try {
            const code = args.join(' ')
            let evaled = eval(code)



            if (typeof evaled !== 'string') {
                evaled = require('util').inspect(evaled, {
                    depth: 0
                })
            } 

            if (evaled.includes(client.token || client.auth.discord.token || client.auth.site.secret)) {
                evaled = evaled.replace(client.token, 'REDACTED!')
                evaled = evaled.replace(client.auth.site.secret, 'REDACTED!')
            }

 
            if (clean(evaled).length > 1800) { //Limited to 10 pastes in a 24hour time period.
                pastebin.createPaste(`${evaled}`, `Eval output exceeds 2000 characters | ${args[0]}`).then(function (data) {

                    console.log(`[Eval output exceeds 2000 characters | ${args[0]}]: ${data}`);


                    const embed = new Discord.RichEmbed()
                        .setTitle(`Eval output exceeds 2000 characters | ${args[0]}`)
                        .setURL(`${data}`)
                        .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
                        .setDescription(`Eval output exceeds 2000 characters. \nView Pastebin [here](${data}).`)
                        .setFooter(`Eval Output`)
                        .setTimestamp()
                    message.channel.send({
                        embed
                    }).catch((e) => message.channel.send(e.message))
                })
                    .fail(function (error) { //Fallback Paste
                        hastebin(`[Eval output exceeds 2000 characters | ${args[0]}]: \n${evaled}`, "eval").then(r => {

                            var hastLink = r



                            console.log(`[Eval output exceeds 2000 characters | ${args[0]}]: ${hastLink}`);
                            const embed = new Discord.RichEmbed()
                                .setTitle(`Eval output exceeds 2000 characters | ${args[0]}`)
                                .setURL(`${hastLink}`)
                                .setColor(Math.floor(Math.random() * (0xFFFFFF + 1)))
                                .setDescription(`Eval output exceeds 2000 characters. \nView Evaluation [here](${hastLink}).`)
                                .setFooter(`Eval Output`)
                                .setTimestamp()
                            message.channel.send({
                                embed
                            }).catch((e) => message.channel.send(e.message))
                        }).catch(console.error);
                    })
            } else {
                message.channel.send(`${clean(evaled)}`, {
                    code: 'fix'
                })
            }
        } catch (err) {
            console.log(err)
            err = err.toString()
            if (err.includes(client.token || config.discord.token || config.site.secret)) {
                err = err.replace(client.token, 'REDACTED!')
                err = err.replace(client.auth.site.secret, 'REDACTED!')
            }
            message.channel.send(`\`ERROR\` \`\`\`fix\n${clean(err)}\n\`\`\``)
        }
    }
}


module.exports.help = {
    name: "eval",
	aliases: ["eval","e","edev"],
	description: "Evaluate Code",
	usage: "eval <command name>",
	category: "Developer",
};