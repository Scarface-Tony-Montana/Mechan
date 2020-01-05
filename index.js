const Discord = require("discord.js");
const client = new Discord.Client({
  disableEveryone: true,
  fetchAllMembers: true
});
const fs = require("fs");
const Logger = require("./Monitors/console-monitor.js"); // Monitoring System for Console.Logs
require("./Monitors/command-reloader.js")(client); // Automated Command Reloader
require("./Monitors/event-reloader.js")(client); // Automated Event Reloader


client.auth = require("./Settings/config.json"); // Bot Token, API Keys, Etc
client.ascii = require("./Settings/ascii-console.json"); // Changable ASCII Font
client.packages = require("./package.json"); // Required to get Bot's Current Version. (DO NOT REMOVE)
client.database = require("./Database/sql.js"); // Database Setup & Functions
client.config = client.auth;

client.abused = new Set();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldowns = new Discord.Collection();

client.footer = `Developed By Tony Montana#0001`; // Footer of each Embed.
client.footerIMG = client.auth.discord.footerIMG;

client.on("ready", () => require("./Events/ready.js")(client));
client.on("message", message => require(`./Events/message.js`)(client, message));
client.on('messageDelete', message => require('./Events/messageDelete.js')(client, message));
client.on('messageUpdate', (oldMessage, newMessage) => require('./Events/messageUpdate.js')(client, oldMessage, newMessage));

// Guild Events
client.on('guildMemberAdd', member => require('./Events/guildMemberAdd.js')(client, member));
client.on('guildMemberRemove', member => require('./Events/guildMemberRemove.js')(client, member));
client.on('guildCreate', guild => require('./Events/guildCreate.js')(client, guild));
client.on('guildDelete', member => require('./Events/guildDelete.js')(client, member));
client.on('guildMemberUpdate', (oldMember, newMember) => require('./Events/guildMemberUpdate.js')(client, oldMember, newMember));
client.on('voiceStateUpdate', (oldMember, newMember) => require('./Events/voiceStateUpdate.js')(client, oldMember, newMember));




// Console Information
client.on("error", error => {
  Logger("[UNHANDLED REJECTION] " + (error.stack == undefined ? error : error.stack),"warn");
});
client.on("warn", warn => {
  Logger("[WARNING] " + warn, "warn");
});
if (client.config.disabled === true) {
  client.on("debug", debug => {
    Logger(debug, "debug");
  });
}else{
  
}

//Console Logger
process.on('unhandledRejection', (error) => {
    Logger("[UNHANDLED REJECTION] " + (error.stack == undefined ? error : error.stack), "warn");
});

process.on('uncaughtException', (err) => {
    Logger("[UNCAUGHT EXCEPTION] " + (err.stack == undefined ? err : err.stack), "critical");
});

client.login(client.auth.discord.token);
module.exports = client;
