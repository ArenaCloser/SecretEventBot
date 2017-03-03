let prefix = "--"
let link = ""
let rules = ""
console.log("\x1b[34m", "Starting SecretEventBot...", "\x1b[0m")

client.on("ready", () => {
    console.log("\x1b[32m", "Logged in as " + client.user.username + "#" +client.user.discriminator +" - " + client.user.id, "\x1b[0m")
});
client.on("guildCreate", (guild) => {
    if(guild.id == "195278167181754369" || guild.id == "189913986312044544") {
        guild.defaultChannel.sendMessage("Hello! I am SecretEventBot, and my purpose is to make Secret Events on the Diep.io Discord Chat easier to handle and more fun. Try `" + prefix + "help` for more info.")
    } else {
        guild.defaultChannel.sendMessage("Sorry! I am dedicated to the Diep.io Discord Chat and cannot work on other servers.")
        guild.leave()
    }
});

client.on("message", (message) => {
  try {
      
    let servers = {"189913986312044544": "251897666881978375", "195278167181754369": "214580801461813249"}
    let eventchannel = {"189913986312044544": "189913986312044544", "195278167181754369": "252023797610315786"}
    var args = message.content.split(" ").slice(1).join(" ");

    if(message.guild.id == "195278167181754369" || message.guild.id == "189913986312044544") {
        if(message.content === prefix + "help") {
            let embed = new Discord.RichEmbed()
                .setTitle("Commands")
                .setColor("#f4d142")
                .setDescription(`**${prefix}addsecret**: Adds Secret Event Participant to the mentioned person. (Requires Event Leader)\n**${prefix}removesecret**: Removes Secret Event Participant from the mentioned person. (Requires Event Leader)\n**${prefix}rules** Used for Event Leaders to change the rules, then normal people can just do ${prefix}rules to get the output.\n**${prefix}link** is the same as ${prefix}rules but for the link instead.\n**${prefix}closeevent:** Removes event participant from everyone and removes event leader from the leader.\n**${prefix}addleader/removeleader:** For staff to set the leader of a Secret Event, and removeleader takes away leader.`)
            message.channel.sendEmbed(embed)
        } else if(message.member.roles.exists("name", "Event Leader") && message.content.startsWith(prefix + "addsecret ") && message.mentions.users.first()) {
            let role = message.guild.roles.find("name", "Secret Event Participant")
            let guildUser = message.guild.member(message.mentions.users.first())
            guildUser.addRole(role)
            message.reply("Added Secret Event Participant to " + guildUser + "!")
            message.guild.channels.get(servers[message.guild.id]).sendMessage(`**${message.author.username}** has added **${guildUser.user.username}** to the Secret Event.`)
        } else if(message.member.roles.exists("name", "Event Leader") && message.content.startsWith(prefix + "removesecret ") && message.mentions.users.first()) {
            let role = message.guild.roles.find("name", "Secret Event Participant")
            let guildUser = message.guild.member(message.mentions.users.first())
            guildUser.removeRole(role)
            message.reply("Removed Secret Event Participant from " + guildUser + "!")
            message.guild.channels.get(servers[message.guild.id]).sendMessage(`**${message.author.username}** has removed **${guildUser.user.username}** from the Secret Event.`)
        } else if(message.member.roles.exists("name", "Event Leader") && message.content.startsWith(prefix + "link ")) {
            link = message.content.split(" ").slice(1).join(" ");
            message.reply("Link set!")
        } else if(message.member.roles.exists("name", "Event Leader") && message.content.startsWith(prefix + "rules ")) {
            rules = message.content.split(" ").slice(1).join(" ");
            message.reply("Rules set!")
        } else if(message.content === prefix + "link" && (message.member.roles.exists("name", "Secret Event Participant") || message.member.roles.exists("name", "Event Leader"))) {
            message.channel.sendMessage(link);
        } else if(message.content === prefix + "rules" && (message.member.roles.exists("name", "Secret Event Participant") || message.member.roles.exists("name", "Event Leader"))) {
            message.channel.sendMessage(rules);
        } else if(message.member.roles.exists("name", "Event Leader") && message.content === (prefix + "closeevent")) {
            var arr = message.guild.members.map(g=>g)
            arr.forEach(function(element) {
                if(element.roles.exists("name", "Secret Event Participant")) {
                    let role = message.guild.roles.find("name", "Secret Event Participant")
                    element.removeRole(role)
                }
                if(element.roles.exists("name", "Event Leader")) {
                    let role = message.guild.roles.find("name", "Event Leader")
                    element.removeRole(role)
                }
            });
            message.reply("Closed Event.")
            message.guild.channels.get(servers[message.guild.id]).sendMessage(`**${message.author.username}** has closed the event.`)
        } else if(message.member.roles.exists("name", "Bot Commander") && message.content.startsWith(prefix + "addleader ") && message.mentions.users.first()) {
            let role = message.guild.roles.find("name", "Event Leader")
            let guildUser = message.guild.member(message.mentions.users.first())
            guildUser.addRole(role)
            message.reply("Added Event Leader to " + guildUser + "!")
            message.guild.channels.get(servers[message.guild.id]).sendMessage(`**${message.author.username}** has added **Event Leader** to **${guildUser.user.username}**.`)
        } else if(message.member.roles.exists("name", "Bot Commander") && message.content.startsWith(prefix + "removeleader ") && message.mentions.users.first()) {
            let role = message.guild.roles.find("name", "Event Leader")
            let guildUser = message.guild.member(message.mentions.users.first())
            guildUser.removeRole(role)
            message.reply("Removed Event Leader from " + guildUser + "!")
            message.guild.channels.get(servers[message.guild.id]).sendMessage(`**${message.author.username}** has removed **Event Leader** from **${guildUser.user.username}**.`)
        } else if(message.member.roles.exists("name", "Secret Event Participant") && message.content === (prefix + "leave")) {
            let role = message.guild.roles.find("name", "Secret Event Participant")
            let guildUser = message.guild.member(message.author)
            guildUser.removeRole(role)
            message.guild.channels.get(servers[message.guild.id]).sendMessage(`**${message.author.username}** has left the Secret Event.`)
        } else if(message.content === prefix + "sync" && message.author.id == "188844101519540225") {
            process.exit();
        }
    }
} catch(err) {
    console.log("\x1b[31m", err, "\x1b[0m")
}
});
