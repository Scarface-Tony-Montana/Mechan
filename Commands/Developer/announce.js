const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
  if (message.author.id !== client.auth.discord.owner) return;
  /* IN DEVELOPMENT */
  // if(message.author.id !== client.auth.discord.owner) return;
  //    message.channel.send(`Sending the announcement to ${client.guilds.size} guilds... This process will take a while...`);
  //    let blacklisted = client.auth.global_announcement_blacklist;
  //    let interval = 750;
  //    let promise = Promise.resolve();
  //    client.guilds.forEach(g => {
  //        promise = promise.then(() => {
  //            if(!g || !g.name) return console.log('Guild doesn\'t exist');
  //            if(Object.values(blacklisted).includes(g.id)) return console.log(`Skipped Guild | ${g.name} | ${g.id}`);
  //            const gC = client.channels.filter(channel => message.guild.me.hasPermission('SEND_MESSAGES') && channel.id)[0]
  //            console.log(gC)
  //            if(!gC) {
  //                console.log('Skipped guild due to no permission to send messages')
  //              message.channel.send(`Skipped ${g.name} | ${g.id} due to no permission to send messages`)
  //            } else {
  //                let everyone = message.guild.members.get(client.user.id).hasPermission('MENTION_EVERYONE')
  //                if(!everyone) {
  //                    gC.send(args.join(" ")).catch(err => console.log('Had trouble sending an announcement'));
  //                    console.log(`Announcement sent to [${g.name}]`)
  //                } else {
  //                    gC.send(`@everyone ${args.join(" ")}`).catch(err => console.log('Had trouble sending an announcement'));
  //                    console.log(`Everyone Alerted | Announcement sent to [${g.name}]`)
  //                }
  //                return new Promise(resolve => {
  //                    setTimeout(resolve, interval);
  //                });
  //            }
  //        });
  //    });
  //    promise.then(() => {
  //        console.log('Finished Announcing!');
  //        message.channel.send(`Finished Announcing to ${client.guilds.size} guilds!`)
  //    });

  var toSay = message.content.substring(9);
  client.guilds.map(guild => {
    let found = 0;
    message.channel.send(
      `Sending the announcement to ${client.guilds.size} guilds... This process will take a while...`
    );
    let blacklisted = client.auth.global_announcement_blacklist;
     if (Object.values(blacklisted).includes(guild.id)) {
        console.log(`Skipped Guild | ${guild.name} | ${guild.id}`);
        message.channel.send(`Skipped Guild | ${guild.name} | ${guild.id}`);
      }
    guild.channels.map(c => {
     
      if (found === 0) {
        if (c.type === "text") {
          if (c.permissionsFor(client.user).has("VIEW_CHANNEL") === true) {
            if (c.permissionsFor(client.user).has("SEND_MESSAGES") === true) {
              try {
                let everyone = message.guild.members
                  .get(client.user.id)
                  .hasPermission("MENTION_EVERYONE");
                if (!everyone) {
                  c.send(args.join(" ")).catch(err =>
                    console.log("Had trouble sending an announcement")
                  );
                  console.log(`Announcement sent to [${c.name}|${guild.name}]`);
                } else {
                  c.send(`@everyone ${args.join(" ")}`).catch(err =>
                    console.log("Had trouble sending an announcement")
                  );
                  console.log(
                    `Everyone Alerted | Announcement sent to [${c.name}|${guild.name}]`
                  );
                }
                // c.send(toSay)
                found = 1;
                message.channel.send(
                  `Announcement sent to [${c.name}|${guild.name}]`
                );
              } catch {
                console.log("could not send");
                message.channel.send(
                  `Announcement failed to send to [${c.name}|${guild.name}]`
                );
              }
            }
          }
        }
      }
    });
    console.log("Finished Announcing!");
    message.channel.send(`Finished Announcing to ${found} guilds!`);
  });
};
module.exports.help = {
  name: "announce",
  aliases: ["ga", "announce", "global"],
  description: "Globally Announce to each guild",
  usage: "ga <your_message>",
  category: "Developer"
};
