const Discord = require("discord.js");
const moment = require("moment");
let os = require("os");
let cpuStat = require("cpu-stat");
const ostb = require("os-toolbox");
const { exec } = require("child_process");
const ipInfo = require("ipinfo");
module.exports.run = (client, message) => {
  if (message.member.hasPermission("MANAGE_MESSAGES")) {
    message.delete();
  }
  let cpuLol;
  cpuStat.usagePercent(function(err, percent, seconds) {
    if (err) {
      return console.log(err);
    }

    if (err) console.error(err);

    const embed = new Discord.RichEmbed();

    message.channel.send("Loading...").then(m => {
      
      m.edit("Doing Speedtest...")
      exec("speedtest-cli --simple --share", (error, stdout, stderr) => {
        m.edit("Loading Everything...")
        ipInfo((err, cLoc) => {
        ostb.cpuLoad().then(cpuusage => {
          ostb.memoryUsage().then(memusage => {
            ostb
              .currentProcesses()
              .then(processes => {
                const curpro = processes;
                const meuse = memusage;
                const acusage = cpuusage;
                embed.setColor("#2C2F33");
                embed.setAuthor(`${client.user.username} Bot Information`, client.user.displayAvatarURL);

               // embed.setFooter(client.footer, client.footerIMG);
                embed.setTitle(`**__${client.user.username}'s Bot Information__**`);

                //embed.addField("\ub200", `> **Latest Bot Commit**: ${date.toISOString().replace("T", " ").split(".")[0]}`)
                embed.setDescription(
                  [
                    `> **Memory Usage:** ${(process.memoryUsage().heapUsed/1024/1024).toFixed(2)}/${(os.totalmem()/1024/1024).toFixed(2)} MB`,
                    //`> **Edit Time:** ${m.createdTimestamp - message.createdTimestamp}ms`,
                    `> **API Response:** ${Math.round(client.ping)}ms`,
                    `> **Uptime:** ${moment.duration(process.uptime()*1000).humanize()}`,
                    `> **Arch:** ${os.arch()}`,
                    `> **Operating System:** ${os.platform()} | v${os.release()}`,
                    `> **CPU Model:** ${os.cpus().map(i => `${i.model}`)[0]}`,
                    `> **CPU Usage:** ${percent.toFixed(2)}%`,
                    `> **CPU Cores:** ${os.cpus().length}`,
                    `> **CPU Clock:** ${cpuStat.clockMHz(2)}MHz`,
                    `> **Server Memory Usage:** ${meuse}%`,
		                `> **Hosting** : ${cLoc.org}`,
                    `**VPS Speedtest:**\n${stdout}`
                  ].join("\n")
                );
                //console.log(stdout)
                message.delete();

                //}else{

                m.edit(embed);
              })
              .catch(err =>
                message.channel.send(`Technical Error Retrieving Information\n[ERROR]: ${err}`)
              );
          }); 
        });
      });
    });
  });
});
};


module.exports.help = {
  name: "botinfo",
  aliases: ["binfo", "botinfo", "bi"],
  description: "Find out information about the bot",
  usage: "(command name)",
  category: "General"
};
