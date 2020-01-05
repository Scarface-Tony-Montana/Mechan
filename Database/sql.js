const sql = require("sqlite3");
const database = new sql.Database("./Database/maindb.sqlite");
const Logger = require("../Monitors/console-monitor.js")
const request = require('snekfetch');


try {

    let djsVersion = require("../node_modules/discord.js/package.json").version;
    if (djsVersion !== '11.5.1') {
        Logger("\nOutdated Discord.JS Version\nPlease Update And Try Again!", "critical")
        process.exit(1)
    } else {
        console.log(`Version Up-to-date... \nRunning Bot...`)
        console.log("Initialized database connection.");
        const databaseInit = new Date();
        const tables = {
            blacklist: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "userID TEXT NOT NULL", "moderator TEXT NOT NULL", "reason TEXT NOT NULL"
            ],
            config: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "option TEXT NOT NULL", "value TEXT NOT NULL", "guildID TEXT NOT NULL"
            ],
            economy: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "userID TEXT NOT NULL", "userName TEXT NOT NULL", "money INTEGER NOT NULL", "lastDaily TEXT NOT NULL"
            ],
            register: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "userID TEXT NOT NULL", "userName TEXT NOT NULL", "registered TEXT NOT NULL"
            ],
            logs: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "channelID TEXT NOT NULL"
            ],
            prefix: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "prefix TEXT NOT NULL", "guildID TEXT NOT NULL"
            ],
            modlog: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "channelID TEXT NOT NULL"
            ],
            welcome: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "channelID TEXT NOT NULL", "welcome_message TEXT NOT NULL"
            ],
            muted: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "userID TEXT NOT NULL", "guildID TEXT NOT NULL"
            ],
            xp: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "userID TEXT NOT NULL", "exp TEXT NOT NULL", "level TEXT NOT NULL"
            ],
            toggleLevel: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "bool TEXT NULL"
            ],
            deleteinvites: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "bool TEXT NULL"
            ],
            toggleCaptcha: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "bool TEXT NULL"
            ],
            levelling: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "channelID TEXT NOT NULL"
            ],
            captcha: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "userID TEXT NOT NULL", "lookingfor TEXT NOT NULL"
            ],
            captchaset: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "channelID TEXT NOT NULL"
            ],
            captcharole: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "roleID TEXT NOT NULL"
            ],
            levels: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "level TEXT NOT NULL"
            ],
            warnings: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL",
                "userID TEXT NOT NULL",
                "guildID TEXT NOT NULL",
                "warnamount TEXT NOT NULL",
                "warnreason TEXT NOT NULL",
            ],
            deletelinks: [
                "id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "guildID TEXT NOT NULL", "bool TEXT NULL"
            ],
            blacklist: ["id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL", "userID TEXT NOT NULL", "moderator TEXT NOT NULL", "reason TEXT NOT NULL"],
            


        };

        for (let table in tables) {

            database.run(`CREATE TABLE ${table} (${
                tables[table].join(", ")
            })`, () => {
                const readyTime = new Date();
                const TimeTookToLoad = Math.floor((readyTime - databaseInit) / 1000);
                console.log(`Database Took ${TimeTookToLoad} second(s) to load table ${table}.`);
            });
        }
    }


} catch (err) {
    Logger(err.stack == undefined ? err : err.stack, "critical")
}

module.exports = database;
