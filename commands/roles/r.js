const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
module.exports = class ReplyCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'r',
            aliases: ["role"],
            group: 'roles',
            memberName: 'r',
            description: 'Get or remove a role from the available list.',
            examples: ['r LiberiOS'],
            args: [
                {
                    key: "role",
                    prompt: "Please specify a role.",
                    type: "string"
                }
            ]
        });
    }
    hasPermission(message) {
        return message.guild;
    }
    async run(message, { role }) {
        const roles = ["iOS", "macOS", "tvOS", "watchOS", "Other Updates", "Electra", "Meridian", "g0blin", "LiberiOS", "h3lix", "overcl0ck", "Double H3lix"];
        if (!(roles.indexOf(role.name) > -1)) return message.reply("That role is invalid.").then(e => e.delete(5000)); //check if role exists
        const newRole = message.guild.roles.find("name", role);
        //const roleCollection = message.member.roles.array();
        if (message.member.roles.exists("name", role)) {
            message.member.roles.remove(newRole);
            return message.author.send(`Removed \`${newRole.name}\`.`).then(e => e.delete(1e4));
        }

    }
};
