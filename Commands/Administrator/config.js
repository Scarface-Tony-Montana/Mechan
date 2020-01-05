const Discord = require('discord.js');

module.exports = async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR" || "KICK_MEMBERS" || "BAN_MEMBERS")) return;

    if (!args[0]) return message.channel.send("Please use one of the following options:\nwelcome\nlogs\nguildprefix\nmodlog\ndellinks\ndelinvites\n\ntoggledellinks (true/false)\ntoggledelinvites (true/false)").then(() => message.delete(300 * 300))
    //if (!['setprefix', 'disablecaptcharole', 'setcaptcharole', 'captcharole', 'enablecaptcha', 'setcaptcha', 'disablecaptcha', 'togglecaptcha', 'dellinks', 'toggledellinks', "levelchannel", 'togglelevel', 'toggledelinvites', 'disablelogs', "logchannel", "guildprefix", "modlogs", "welcome", 'enablelogs', 'setlogs', 'enablelvl', 'setlvl', 'disablelvl', 'enablewelcome', 'setwelcome', 'disablewelcome'].includes(args[0])) return message.channel.send("Please use one of the following options:\nwelcome\nlogchannel\nguildprefix\nmodlog\n\nTo Setup Options:\nsetlogs <#channel>\nsetwelcome <#channel> <optional greeting>\n\nTo Disable Options: \ndisablelogs\ndisablewelcome").then(() => message.delete(300 * 300))
    if (args[0] === "dellinks") {
        client.database.get('SELECT bool FROM deletelinks WHERE guildID = ?', [message.guild.id], (err, row) => {
            if (!row) return message.channel.send("This guild doesn't have \`Delete Links\` set.");
            message.channel.send(`\n\`Delete Links\`: ${row.bool === "1" ? "Enabled" : "Disabled"}`).then(() => message.delete(300 * 300));


        })
    }
    if (args[0] === "delinvites") {
        client.database.get('SELECT bool FROM deleteinvites WHERE guildID = ?', [message.guild.id], (err, row) => {
            if (!row) return message.channel.send("This guild doesn't have \`Delete Invites\` set.");
            message.channel.send(`\n\`Delete Invites\`: ${row.bool === "1" ? "Enabled" : "Disabled"}`).then(() => message.delete(300 * 300));


        })
    }
    if (args[0] === "logs") {
        client.database.get("SELECT * FROM logs WHERE guildID = ?", message.guild.id, (err, row) => {
            if (err) throw err;

            if (!row) return message.channel.send("This guild has no log channel set.");
            message.channel.send(`\n\`Log Channel Set To\`: <#${row.channelID}>`).then(() => message.delete(300 * 300));
        });
    }
    if (args[0] === "guildprefix") {
        client.database.get("SELECT * FROM prefix WHERE guildID = ?", message.guild.id, (err, row) => {
            if (err) throw err;

            if (!row) return message.channel.send("This guild has no custom prefix set.");
            message.channel.send(`\n\`Custom Prefix Set To\`: ${row.prefix}`).then(() => message.delete(300 * 300));
        });
    }

    if (args[0] === "modlogs") {
        client.database.get("SELECT * FROM modlog WHERE guildID = ?", message.guild.id, (err, row) => {
            if (err) throw err;

            if (!row) return message.channel.send("This guild has no modlog channel set.");
            message.channel.send(`\n\`Moderation Log Channel Set To\`: <#${row.channelID}>`).then(() => message.delete(300 * 300));
        });
    }
    if (args[0] === "welcome") {
        client.database.get("SELECT * FROM welcome WHERE guildID = ?", message.guild.id, (err, row) => {
            if (err) throw err;

            if (!row) return message.channel.send("This guild has no welcome channel set.");
            message.channel.send(`\n\`Welcome Channel Set To\`: <#${row.channelID}>`).then(() => message.delete(300 * 300));
        });
    }
    if (args[0] === "levels") {
        client.database.get("SELECT * FROM levelling WHERE guildID = ?", message.guild.id, (err, row) => {
            if (err) throw err;

            if (!row) return message.channel.send("This guild has no levelling channel set.");
            message.channel.send(`\n\`Levelling Channel Set To\`: <#${row.channelID}>`).then(() => message.delete(300 * 300));
        });
    }


    
        if (['togglelevel'].includes(args[0])) {
            const value = args[1] ? args[1] : null;
            if (!value) return message.reply('You have to provide a value for the option!');
            if (value !== 'true' && value !== 'false') return message.reply('The value you provided is invalid! That option takes `true` or `false`.');
            const bool = value === 'true' ? 1 : 0;
            client.database.get('SELECT bool FROM togglelevel WHERE guildID = ?', [message.guild.id], (err, row) => {
                if ((!row && bool === 0) || (row && row.bool === bool)) return message.reply('The value you provided is the same as the current one!');

                if (!row) client.database.run('INSERT INTO toggleLevel (guildID, bool) VALUES (?, ?)', [message.guild.id, bool]);
                else client.database.run('UPDATE toggleLevel SET bool = ? WHERE guildID = ?', [bool, message.guild.id]);
                if (value !== "true") return message.channel.send(`Successfully updated \`togglelevel\` to \`OFF\`.`).then(m => m.delete(300 * 300));
                return message.channel.send(`Successfully updated \`togglelevel\` to \`ON\`.`).then(m => m.delete(300 * 300));

            })
        }
        if (['toggledelinvites'].includes(args[0])) {
            const value = args[1] ? args[1] : null;
            if (!value) return message.reply('You have to provide a value for the option!');
            if (value !== 'true' && value !== 'false') return message.reply('The value you provided is invalid! That option takes `true` or `false`.');
            const bool = value === 'true' ? 1 : 0;
            client.database.get('SELECT bool FROM deleteinvites WHERE guildID = ?', [message.guild.id], (err, row) => {
                if ((!row && bool === 0) || (row && row.bool === bool)) return message.reply('The value you provided is the same as the current one!');

                if (!row) client.database.run('INSERT INTO deleteinvites (guildID, bool) VALUES (?, ?)', [message.guild.id, bool]);
                else client.database.run('UPDATE deleteinvites SET bool = ? WHERE guildID = ?', [bool, message.guild.id]);
                if (value !== "true") return message.channel.send(`Successfully updated \`deleteinvites\` to \`OFF\`.`).then(m => m.delete(300 * 300));
                return message.channel.send(`Successfully updated \`deleteinvites\` to \`ON\`.\n*If any member has the following permissions \`"ADMINISTRATOR" or "MANAGE_MESSAGES" or "KICK_MEMBERS" or "BAN_MEMBERS"\` \nthey can automatically bypass this feature.*`).then(m => m.delete(300 * 300));

            })
        }


        if (['toggledellinks'].includes(args[0])) {
            const value = args[1] ? args[1] : null;
            if (!value) return message.reply('You have to provide a value for the option!');
            if (value !== 'true' && value !== 'false') return message.reply('The value you provided is invalid! That option takes `true` or `false`.');
            const bool = value === 'true' ? 1 : 0;
            client.database.get('SELECT bool FROM deletelinks WHERE guildID = ?', [message.guild.id], (err, row) => {
                if ((!row && bool === 0) || (row && row.bool === bool)) return message.reply('The value you provided is the same as the current one!');

                if (!row) client.database.run('INSERT INTO deletelinks (guildID, bool) VALUES (?, ?)', [message.guild.id, bool]);
                else client.database.run('UPDATE deletelinks SET bool = ? WHERE guildID = ?', [bool, message.guild.id]);
                if (value !== "true") return message.channel.send(`Successfully updated \`deletelinks\` to \`OFF\`.`).then(m => m.delete(300 * 300));
                return message.channel.send(`Successfully updated \`deletelinks\` to \`ON\`.\n***Note: Does __NOT__ delete invite links use \`sn!config deleteinvites true\` to delete invites.*** \n*If any member has the following permissions \`"ADMINISTRATOR" or "MANAGE_MESSAGES" or "KICK_MEMBERS" or "BAN_MEMBERS"\` \nthey can automatically bypass this feature.*`).then(m => m.delete(300 * 300));
            })
        }
        if (['togglecaptcha'].includes(args[0])) {
            const value = args[1] ? args[1] : null;
            if (!value) return message.reply('You have to provide a value for the option!');
            if (value !== 'true' && value !== 'false') return message.reply('The value you provided is invalid! That option takes `true` or `false`.');
            const bool = value === 'true' ? 1 : 0;
            client.database.get('SELECT bool FROM toggleCaptcha WHERE guildID = ?', [message.guild.id], (err, row) => {
                if ((!row && bool === 0) || (row && row.bool === bool)) return message.reply('The value you provided is the same as the current one!');

                if (!row) client.database.run('INSERT INTO toggleCaptcha (guildID, bool) VALUES (?, ?)', [message.guild.id, bool]);
                else client.database.run('UPDATE captcha SET bool = ? WHERE guildID = ?', [bool, message.guild.id]);
                return message.channel.send(`Successfully updated \`captcha\` to \`${value}\`.`).then(m => m.delete(300 * 300));

            })
        }
    }



    module.exports.help = {
        name: "config",
        aliases: ["con","guildconfig","gcon"],
        description: "List Current Config",
        usage: "(command name)",
        category: "Administrator",
    };