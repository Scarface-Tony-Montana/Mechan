const chokidar = require("chokidar");
const { basename } = require("path");
const Logger = require("./console-monitor.js");
const fs = require("fs");

module.exports = (client) => {
    const categories = fs.readdirSync("./Commands");

    categories.forEach(category => {
        chokidar.watch(`./Commands/${category}`, { awaitWriteFinish: true }).on("change", (file) => {
            const commandName = basename(file, ".js")
            Logger(`Command ${commandName}.js`, "commandupdating");
            delete require.cache[require.resolve(`../Commands/${category}/${commandName}.js`)];
            client.commands.delete(`../Commands/${category}/${commandName}.js`);
            const props = require(`../Commands/${category}/${commandName}.js`);
            client.commands.set(commandName, props);
            Logger(`${commandName}.js`, "commandupdate");
        });
    });
};
