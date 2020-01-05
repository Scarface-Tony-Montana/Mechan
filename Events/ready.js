const fs = require("fs");
const Logger = require("../Monitors/console-monitor.js");
var os = require('os'); // Used to get OS 
module.exports = async client => {

  console.clear();
  Object.values(client.ascii).forEach(line => console.log(line));
  console.log(`Mechan v${client.packages.version}\nProcess ID: ${process.pid} \nPlatform: ${os.type()} v${os.release()} ${os.arch()} ${os.platform()}`);
  const categories = fs.readdirSync("./Commands");
  if (client.config.disabled === true) {
    client.user.setPresence({
      game: {
        name: "in Development",
        type: "streaming",
        url: "https://www.twitch.tv/underdevelopment"
      }
    });
    console.log("Maintenance Mode Enabled");
  } else {
    client.user.setPresence({
      game: {
        name: `${client.user.tag} | Prefix: ${client.auth.discord.prefix}`,
        type: "watching",
        url: "https://www.youtube.com/"
      }
    });
  }
  categories.forEach(category => {
    const files = fs.readdirSync(`./Commands/${category}`);

    if (category === "General")
      Logger(
        `\n${client.user.tag} has loaded with: Total General [Public Use] Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`
      );
    else if (category === "Music")
      Logger(
        `\n${client.user.tag} has loaded with: Total Music Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`
      );
    else if (category === "Economy")
      Logger(
        `\n${client.user.tag} has loaded with: Total Economy Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`
      );
    else if (category === "Premium")
      Logger(
        `\n${client.user.tag} has loaded with: Total Premium Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`
      );
    else if (category === "Moderator")
      Logger(
        `\n${client.user.tag} has loaded with: Total Moderator Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`
      );
    else if (category === "Administrator")
      Logger(
        `\n${client.user.tag} has loaded with: Total Administrator Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`
      );
    else if (category === "Developer") {
      Logger(
        `\n${client.user.tag} has loaded with: Total Developer Commands ${files.length}, Users: ${client.users.size}, Watching: ${client.channels.size} Channels of ${client.guilds.size} guilds.`
      );

      const readyTime = new Date();
      const TimeTookToLoad = Math.floor((readyTime - nightcoreInit) / 1000);
      //console.log(`${client.user.tag} Took ${TimeTookToLoad} second(s) to load everything up.`);
      if (client.guilds.size === 0)
        Logger(
          `\nhttps://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=2146958591/`,
          "noguild"
        );
    }
    // This loop reads the /Commands/ folder and attaches each Command file to the appropriate command setting.
  
    files.forEach(command => {
      if (command.split(".").slice(-1)[0] !== 'js') return;
      
      const props = require(`../Commands/${category}/${command}`);
      //console.log(props.help)
      client.commands.set(props.help.name, props);
      props.help.aliases.forEach(alias => { // It could be that the command has aliases, so we go through them too
          client.aliases.set(alias, props.help.name);
          
          
         console.log(`Loaded ${command} from ${category} with aliases ${alias}`)
          
      });
    })
  });
};
