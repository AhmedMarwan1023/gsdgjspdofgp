const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "@";

// ========================================== [ CONSTRUCTERS ] =========================================

client.on("ready", async() => {
    client.user.setGame("Loading...");
console.log(`Back Online In ${client.guilds.size} Servers!`);
console.log(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8\nInvite Me To Your Server!`);
    setTimeout(() => {
        client.user.setActivity(`${prefix}help | V 1.1`, {type: "WATCHING"});
    }, 3000);
});

// ========================================== [ BROADCAST COMMANDS ] ====================================


/*
السلام عليكم ورحمة الله وبركاته .
هذا ملف بوت برودكاست بوت بالظبط ولكن فيه بعض التصليحات لمشاكل موجودة في البوت
-
جميع الحقوق محفوظة لسيرفر كودز .
CODES SERVER - MOORZ
*/

client.on("message", async message => {
    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
        if(!message.channel.guild) return;
            var args = message.content.split(" ").slice(1).join(" ");
            if(command == "bc") {
                if(!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.channel.send("**للأسف لا تمتلك صلاحية `ADMINISTRATOR`**");
                }
                    if(!args) {
                        return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
                    }
                        message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟\nمحتوى البرودكاست: \`${args}\`**`).then(m => {
                            m.react("✅")
                            .then(() => m.react("❌"));

                            let yesFilter = (reaction, user) => reaction.emoji.name == "✅" && user.id == message.author.id;
                            let noFiler = (reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id;

                            let yes = m.createReactionCollector(yesFilter);
                            let no = m.createReactionCollector(noFiler);

                            yes.on("collect", v => {
                                m.delete();
                                    message.channel.send(`:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${message.guild.memberCount} Members`).then(msg => msg.delete(5000));
                                        message.guild.members.forEach(member => {
                                            let bc = new Discord.RichEmbed()
                                            .setColor("RANDOM")
                                            .setThumbnail(message.author.avatarURL)
                                            .setTitle("Broadcast")
                                            .addField("Server", message.guild.name)
                                            .addField("Sender", message.author.username)
                                            .addField("Message", args);

                                            member.sendEmbed(bc);
                                        });
                        });
                        no.on("collect", v => {
                            m.delete();
                            message.channel.send("**Broadcast Canceled.**").then(msg => msg.delete(3000));
                        });
                            
                        });
            }
            if(command == "bco") {
                if(!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.channel.send("**للأسف لا تمتلك صلاحية `ADMINISTRATOR`**");
                }
                    if(!args) {
                        return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
                    }
                        message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟\nمحتوى البرودكاست: \`${args}\`**`).then(m => {
                            m.react("✅")
                            .then(() => m.react("❌"));

                            let yesFilter = (reaction, user) => reaction.emoji.name == "✅" && user.id == message.author.id;
                            let noFiler = (reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id;

                            let yes = m.createReactionCollector(yesFilter);
                            let no = m.createReactionCollector(noFiler);

                            yes.on("collect", v => {
                                m.delete();
                                    message.channel.send(`:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${message.guild.members.filter(r => r.presence.status !== "offline").size} Members`).then(msg => msg.delete(5000));
                                        message.guild.members.filter(r => r.presence.status !== "offline").forEach(member => {
                                            let bco = new Discord.RichEmbed()
                                            .setColor("RANDOM")
                                            .setThumbnail(message.author.avatarURL)
                                            .setTitle("Broadcast")
                                            .addField("Server", message.guild.name)
                                            .addField("Sender", message.author.username)
                                            .addField("Message", args);

                                            member.sendEmbed(bco);
                                        });
                        });
                        no.on("collect", v => {
                            m.delete();
                            message.channel.send("**Broadcast Canceled.**").then(msg => msg.delete(3000));
                        });
                            
                        });
            }
});

// ========================================== [ OTHER COMMANDS ] ====================================


client.on("message", async message => {
    if(message.content == prefix + "server") {
        if(!message.channel.guild) return;
            if(!message.member.hasPermission("MANAGE_GUILD")) {
                return message.channel.send("ليس لديك الصلآحية الكآفية . :broken_heart:");
            }

                let server = new Discord.RichEmbed()
                    .setAuthor(message.guild.name)
                    .setColor("RANDOM")
                    .setTitle("Server Info :hearts: :sparkles:")
                    .setDescription(`Members :bust_in_silhouette: : ${message.guild.memberCount}\nOwner :crown: : ${message.guild.owner.user.username}\nServer ID :id: : ${message.guild.id}\nRoles :lock: : ${message.guild.roles.size}\nRegion :earth_africa: : ${message.guild.region.toUpperCase()}`);

                    message.channel.sendEmbed(server);

    }
});
client.on("message", async message => {
    if(message.content.startsWith(prefix + "banned")) {
        if(!message.guild) return;
        message.guild.fetchBans()
        .then(bans => {
            let b = bans.size;
            let bb = bans.map(a => `${a}`).join(" - ");
            message.channel.send(`**\`${b}\` | ${bb}**`);
        });
    }
});
client.on("message", async message => {
    if(message.content.startsWith(prefix + "invite")) {
        let invite = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor(message.author.username, message.author.displayAvatarURL)
            .setThumbnail(message.author.avatarURL)
            .setTitle("**Click Here To Invite The Bot To Your Server :sparkling_heart:**")
            .setURL(`https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`);
            message.channel.sendEmbed(invite);
    }
});
client.on("message", async message => {
    if(message.content.startsWith(prefix + "help")) {
        let help = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setThumbnail(message.author.avatarURL)
            .setDescription(`**__برودكاست بوت | Version 1.1__ 

            برودكاست عادي : ${prefix}bc
            دعوة البوت لسيرفرك : ${prefix}invite
            معلومات عن السيرفر : ${prefix}server
            برودكاست للأونلاين فقط : ${prefix}bco
            يعرض لك عدد المتبندين من سيرفرك : ${prefix}banned
            **`);
            message.channel.sendEmbed(help); // رابط السيرفر يعود الى سيرفر CODES .
    }
});

// DONE BY MOORZ .
// CODES - COPYRIGHT
















client.on('message', message => {
            if (message.content.startsWith("@rules")) {
     let embed = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.addField('     **اولا** ' ,' **ممنوع السب** ')
.addField('     **ثانيا** ' ,' **لا تسوي سبام ** ')
.addField('     **ثالثا** ' ,' **لا تزعج الاخرين** ')
.addField('    **رابعا**' ,' **ممنوع الاعلانات** ')
.addField('    **خامسا**' ,' **احترم الاخرين** ')
.addField('    **سادسا**' ,' **لا تنشر في الشات او بل خاص** ')
.addField('    **سابعا**' ,' **لا تنشر روابط!** ')
.addField('    **ثامنا**' ,' **لا تسوي سبام ايموجي** ')
.addField('    **تاسعا**' ,' **لا تطلب رتبه الاداره !** ')
.setColor('#7d2dbe')
  message.channel.sendEmbed(embed);
    }
});



client.on('message', message => {
    var prefix = "@" // Codes Server
    let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);


if(command == "@draw") {
    var Canvas = require('canvas')
  , Image = new Canvas.Image
  , canvas = new Canvas(450, 170)
  , ctx = canvas.getContext('2d');
  ctx.font = '30px Impact';
  let args = message.content.split(" ").slice(1);
  
Image.src = canvas.toBuffer();

    console.log(Image);
ctx.drawImage(Image, 0, 0, Image.width / 470, Image.height / 170);
ctx.fillText(args.join("  "),110, 70);


ctx.beginPath();
ctx.lineTo(50, 102);
ctx.stroke();

message.channel.sendFile(canvas.toBuffer());
}
}).on('ready', () => {

});











client.on('message', function(message) {
    if(message.content.startsWith(prefix + "report")) {
        let messageArgs = message.content.split(" ").slice(1).join(" ");
        let messageReason = message.content.split(" ").slice(2).join(" ");
        if(!messageReason) return message.reply("**# Specify a reason!**");
    let mUser = message.mentions.users.first();
    if(!mUser) return message.channel.send("Couldn't find user.");
    let Rembed = new Discord.RichEmbed()
    .setTitle("`New Report!`")
    .setThumbnail(message.author.avatarURL)
    .addField("**# - Reported User:**",mUser,true)
    .addField("**# - Reported User ID:**",mUser.id,true)
    .addField("**# - Reason:**",messageReason,true)
    .addField("**# - Channel:**",message.channel,true)
    .addField("**# - Time:**",message.createdAt,true)
    .setFooter("لو ان الابلاغ فيه مزح راح يتعرض صاحب الابلاغ لقوبات")
message.channel.send(Rembed)
message.channel.send("__Are you sure you want to send this to the Server owner??__").then(msg => {
    msg.react("?")
    msg.react("?")
.then(() => msg.react('?'))
.then(() =>msg.react('?'))
let reaction1Filter = (reaction, user) => reaction.emoji.name === '?' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '?' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
    message.guild.owner.send(Rembed)
    message.reply("**# - Done! ??**");
})
reaction2.on("collect", r => {
    message.reply("**# - Canceled!**");
})
})
}
});







client.on('message', message => {
 var prefix = "@"
    if(message.content.startsWith(prefix + 'new')) {
        let args = message.content.split(' ').slice(1).join(' ');
        let support = message.guild.roles.find("name","Support Team");
        let ticketsStation = message.guild.channels.find("name", "TICKETS");
        if(!args) {
            return message.channel.send('الرجاء كتابة سبب التذكرة');
        };
                if(!support) {
                    return message.channel.send('**Please make sure that `Support Team` role exists and it\'s not duplicated.**');
                };
            if(!ticketsStation) {
                message.guild.createChannel("Ticket", "category");
            };
                message.guild.createChannel(`𝑻𝑰𝑪𝑲𝑬𝑻`, "text").then(ticket => {
                    message.delete()
                        message.channel.send(`تم انشاء تذكرتك. [ ${ticket} ]`);
                    ticket.setParent(ticketsStation);
                    ticketsStation.setPosition(1);
                        ticket.overwritePermissions(message.guild.id, {
                            SEND_MESSAGES: false,
                            READ_MESSAGES: false
                        });
                            ticket.overwritePermissions(support.id, {
                                SEND_MESSAGES: true,
                                READ_MESSAGES: true
                            });
                                ticket.overwritePermissions(message.author.id, {
                                    SEND_MESSAGES: true,
                                    READ_MESSAGES: true
                                });
                    let embed = new Discord.RichEmbed()
                                .setTitle('**تذكرة جديدة.**')
                                .setColor("RANDOM")
                                .setThumbnail(`${message.author.avatarURL}`)
                                .addField('سبب التذكرة', args)
                                .addField('صاحب التذكرة', message.author)
                                .addField('الروم', `<#${message.channel.id}>`);

                                ticket.sendEmbed(embed);
                }) .catch();
    }
    if(message.content.startsWith(prefix + 'close')) {
            if(!message.member.hasPermission("ADMINISTRATOR")) return;
        if(!message.channel.name.startsWith("𝑻𝑰𝑪𝑲𝑬𝑻")) {
            return;
        };  
                let embed = new Discord.RichEmbed()
                    .setAuthor("هل تريد فعلآ اغلاق التذكرة ؟.")
                    .setColor("RANDOM");
                    message.channel.sendEmbed(embed) .then(codes => {

                    
                        const filter = msg => msg.content.startsWith(prefix + 'close');
                        message.channel.awaitMessages(response => response.content === prefix + 'close', {
                            max: 1,
                            time: 20000,
                            errors: ['time']
                        })
                        .then((collect) => {
                            message.channel.delete();
                        }) .catch(() => {
                            codes.delete()
                                .then(message.channel.send('**Operation has been cancelled.**')) .then((c) => {
                                    c.delete(4000);
                                })
                                    
                            
                        })


                    })


            
    }
});










 client.on('message' , message => {
     var prefix = "@";
 if(message.content.startsWith(prefix+"user")) {
     let user = message.mentions.users.first() || message.author;
     const joineddiscord = (user.createdAt.getDate() + 1) + '-' + (user.createdAt.getMonth() + 1) + '-' + user.createdAt.getFullYear() + ' | ' + user.createdAt.getHours() + ':' + user.createdAt.getMinutes() + ':' + user.createdAt.getSeconds();
     message.delete();
     let game;
     if (user.presence.game === null) {
         game = 'لا يلعب حاليا.';
     } else {
         game = user.presence.game.name;
     }
     let messag;
     if (user.lastMessage === null) {
         messag = 'لم يرسل رسالة. ';
     } else {
         messag = user.lastMessage;
     }
     let status;
     if (user.presence.status === 'online') {
         status = ':green_heart:';
     } else if (user.presence.status === 'dnd') {
         status = ':heart:';
     } else if (user.presence.status === 'idle') {
         status = ':yellow_heart:';
     } else if (user.presence.status === 'offline') {
         status = ':black_heart:';
     }
     if (user.presence.status === 'offline') {
         stat = 0x000000;
     } else if (user.presence.status === 'online') {
         stat = 0x00AA4C;
     } else if (user.presence.status === 'dnd') {
         stat = 0x9C0000;
     } else if (user.presence.status === 'idle') {
         stat = 0xF7C035;
     }
     const embed = new Discord.RichEmbed()
   .addField('**UserInfo:**', `**name:** ${user.username}#${user.discriminator}\n**JoinedDiscord:** ${joineddiscord}\n**LastMessage:** ${messag}\n**Playing:** ${game}\n**Status:** ${status}\n**Bot?** ${user.bot}`, true)
   .setThumbnail(user.displayAvatarURL)
   .addField(`Roles:`, message.guild.members.get(user.id).roles.array(role => role.name).slice(1).join(', '))
   .addField('DiscordInfo:', `**Discriminator:** #${user.discriminator}\n**ID:** ${user.id}\n**Username:** ${user.username}`)
   .setAuthor(`معلومات ${user.username}`, user.displayAvatarURL)
   .setColor(stat);
     message.channel.send({embed})
   .catch(e => logger.error(e));
 }
  });
  
  
  
  

  
  
  
  
  
   
  client.on("message", message => {
 if(!message.channel.guild) return;  
  if (message.author.bot) return;
 
  let command = message.content.split(" ")[0];
 
  if (message.content.split(" ")[0].toLowerCase() === prefix + "unmute") {
        if (!message.member.hasPermission('MANAGE_ROLES')) return;
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!muteRole) return message.reply(" I Can’t Find 'Muted' Role ").catch(console.error).then(message => message.delete(4000))
  if (message.mentions.users.size < 1) return message.reply(' Error : ``Mention a User``').catch(console.error).then(message => message.delete(4000))
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return;
 
  if (message.guild.member(user).removeRole(muteRole.id)) {
      return message.reply("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
  } else {
    message.guild.member(user).removeRole(muteRole).then(() => {
      return message.reply("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
    });
  }
 
};
 
});
 
 
client.on('message',function(message) {
 if(!message.channel.guild) return;    let messageArray = message.content.split(' ');
    let muteRole =  message.guild.roles.find('name', 'Muted');
    let muteMember = message.mentions.members.first();
    let muteReason = messageArray[2];
    let muteDuration = messageArray[3];
 if (message.content.split(" ")[0].toLowerCase() === prefix + "mute") {
           
  if (message.author.bot) return;
       if(!muteRole) return message.guild.createRole({name: 'Muted'}).then(message.guild.channels.forEach(chan => chan.overwritePermissions(muteRole, {SEND_MESSAGES:false,ADD_REACTIONS:false})));
       if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.channel.send(' Error : You Need `` MANAGE_ROLES ``Permission ');
       if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(' Error : I Don’t Have `` MANAGE_ROLES ``Permission ');
       if(!muteMember) return message.channel.send(' Error : ``Mention a User``').then(message => message.delete(4000))
       if(!muteReason) return message.channel.send(' Error : ``Supply a Reason``').then(message => message.delete(4000))
       if(!muteDuration) return message.channel.send(' Error : `` Supply Mute Time `` \n Ex: #mute @user reason 1m ').then(message => message.delete(4000))
       if(!muteDuration.match(/[1-7][s,m,h,d,w]/g)) return message.channel.send(' Error : `` Invalid Mute Duration``').then(message => message.delete(4000))
       message.channel.send(`${muteMember} Has Been Muted.`).then(message => message.delete(5000))
       muteMember.addRole(muteRole);
       muteMember.setMute(true)
       .then(() => { setTimeout(() => {
           muteMember.removeRole(muteRole)
           muteMember.setMute(false)
       }, mmss(muteDuration));
       });
   }
});


client.on('message', message => {
    if (message.content.startsWith("@رابط")) {
 
  message.channel.createInvite({
        thing: true,
        maxUses: 100,
        maxAge: 86400
    }).then(invite =>
      message.author.sendMessage(invite.url)
    )
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription("| :white_check_mark:  | :heart:  تم ارسال الرابط على الخاص  ")
      message.channel.sendEmbed(embed).then(message => {message.delete(10000)})
              const Embed11 = new Discord.RichEmbed()
        .setColor("RANDOM")
                .setAuthor(message.guild.name, message.guild.iconURL)
        .setDescription(`
**
---------------------
-[${message.guild.name}]  هذا هو رابط سيرفر
---------------------
-هذا الرابط صالح ل 100 مستخدم فقط
---------------------
-هذا الرابط صالح لمده 24 ساعه فقط
---------------------
**`)
      message.author.sendEmbed(Embed11)
    }
});













client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(`:rose:  ولكم نورت السيرفر:rose: 
:crown: ${member}:crown:  
انت العضو رقم ${member.guild.memberCount} `) 
}).catch(console.error)
})











client.on('message', message => {
                           if(!message.channel.guild) return;
               let args = message.content.split(' ').slice(1).join(' ');
               if (message.content.startsWith('@sabc')){
                if (message.author.id !== '507533148897411082') return message.reply(' هذا الأمر قفط لصاحب البوت و شكراًً ')
               message.channel.sendMessage('جار ارسال الرسالة |✅')
               client.users.forEach(m =>{
               m.sendMessage(args)
               })
               }
               });
			   
			   
			   






client.on('message', function(message) {
    if(message.content.startsWith(prefix + "report")) {
        let messageArgs = message.content.split(" ").slice(1).join(" ");
        let messageReason = message.content.split(" ").slice(2).join(" ");
        if(!messageReason) return message.reply("**# Specify a reason!**");
    let mUser = message.mentions.users.first();
    if(!mUser) return message.channel.send("Couldn't find user.");
    let Rembed = new Discord.RichEmbed()
    .setTitle("`New Report!`")
    .setThumbnail(message.author.avatarURL)
    .addField("**# - Reported User:**",mUser,true)
    .addField("**# - Reported User ID:**",mUser.id,true)
    .addField("**# - Reason:**",messageReason,true)
    .addField("**# - Channel:**",message.channel,true)
    .addField("**# - Time:**",message.createdAt,true)
    .setFooter("لو ان الابلاغ فيه مزح راح يتعرض صاحب الابلاغ لقوبات")
message.channel.send(Rembed)
message.channel.send("__Are you sure you want to send this to the Server owner??__").then(msg => {
    msg.react("?")
    msg.react("?")
.then(() => msg.react('?'))
.then(() =>msg.react('?'))
let reaction1Filter = (reaction, user) => reaction.emoji.name === '?' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '?' && user.id === message.author.id;
let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
    message.guild.owner.send(Rembed)
    message.reply("**# - Done! ??**");
})
reaction2.on("collect", r => {
    message.reply("**# - Canceled!**");
})
})
}
});










client.on('guildMemberAdd', (member) => {
    var channel = member.guild.channels.find('name', 'zako');
channel.send(`@${member.user.tag} تم اعطاء العضو رتبت ممبر`)
member.addRole(member.guild.roles.find('name', 'Member'));
});			   
			   
			   
			   
			   
			   
			   
			   
			   
			   
			   
			   
			   
			   
			   const sWlc = {}
client.on('message', message => {
var prefix = "@";
if(message.channel.type === "dm") return;
if(message.author.bot) return;
  if(!sWlc[message.guild.id]) sWlc[message.guild.id] = {
    channel: "welcome"
}
const channel = sWlc[message.guild.id].channel
  if (message.content.startsWith(prefix + "setwelcomer")) {
    if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
    let newChannel = message.content.split(' ').slice(1).join(" ")
    if(!newChannel) return message.reply(`**${prefix}setwelcomer <channel name>**`)
    sWlc[message.guild.id].channel = newChannel
    message.channel.send(`**${message.guild.name}'s channel has been changed to ${newChannel}**`);
  }
});
 
client.on("guildMemberAdd", member => {
      if(!sWlc[member.guild.id]) sWlc[member.guild.id] = {
    channel: "#▫『welcome』 "
  }
  const channel = sWlc[member.guild.id].channel
    const sChannel = sWlc[member.guild.id].channel
    let welcomer = member.guild.channels.find('name', sChannel);
    let memberavatar = member.user.avatarURL
      if (!welcomer) return;
      if(welcomer) {
         moment.locale('ar-ly');
         var h = member.user;
        let heroo = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(h.avatarURL)
        .setAuthor(h.username,h.avatarURL)
        .addField(': تاريخ دخولك الدسكورد',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)            
         .addField(': تاريخ دخولك السيرفر',`${moment(member.joinedAt).format('D/M/YYYY h:mm a ')} \n\`\`${moment(member.joinedAt).startOf(' ').fromNow()}\`\``, true)      
         .setFooter(`${h.tag}`,"https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif")
     welcomer.send({embed:heroo});          
         
      var Canvas = require('canvas')
      var jimp = require('jimp')
     
    const w = ['./w1.png'];
 
              let Image = Canvas.Image,
                  canvas = new Canvas(400, 200),
                  ctx = canvas.getContext('2d');
 
              fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
                  if (err) return console.log(err)
                  let BG = Canvas.Image;
                  let ground = new Image;
                  ground.src = Background;
                  ctx.drawImage(ground, 0, 0, 400, 200);
 
      })
 
                      let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".gif" : member.user.displayAvatarURL;
                      jimp.read(url, (err, ava) => {
                          if (err) return console.log(err);
                          ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                              if (err) return console.log(err);
 
                                    ctx.font = "bold 12px Arial";
                              ctx.fontSize = '20px';
                              ctx.fillStyle = "#f1f1f1";
                                ctx.fillText(member.user.username, 200, 150);
 
                              //NAMEً
                              ctx.font = "bold 12px Arial";
                              ctx.fontSize = '20px';
                              ctx.fillStyle = "#f1f1f1";
      ctx.fillText(`Welcome To Server`, 220, 125);
 
                              //AVATARً
                              let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.beginPath();
                              ctx.arc(77, 101, 62, 0, Math.PI*2);
                              ctx.stroke();
                                 ctx.clip();
                                 ctx.drawImage(ava, 13, 38, 128, 126);
 
 
    welcomer.sendFile(canvas.toBuffer())
 
 
 
      })
      })
 
      }
      });
   
   
const invites = {};
 
const wait = require('util').promisify(setTimeout);
 
client.on('ready', () => {
  wait(1000);
 
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
 
client.on('guildMemberAdd', member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(channel => channel.name === "welcome");
    logChannel.send(`${member} Invited by: <@${inviter.id}>`);
  });
});










client.on('message', message => {
var prefix = "@";
if(message.channel.type === "dm") return;
if(message.author.bot) return;
  if(!sWlc[message.guild.id]) sWlc[message.guild.id] = {
    channel: "welcome"
}
const channel = sWlc[message.guild.id].channel
  if (message.content.startsWith(prefix + "setwelcomer")) {
    if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
    let newChannel = message.content.split(' ').slice(1).join(" ")
    if(!newChannel) return message.reply(`**${prefix}setwelcomer <channel name>**`)
    sWlc[message.guild.id].channel = newChannel
    message.channel.send(`**${message.guild.name}'s channel has been changed to ${newChannel}**`);
  }
});
 
client.on("guildMemberAdd", member => {
      if(!sWlc[member.guild.id]) sWlc[member.guild.id] = {
    channel: "#▫『welcome』 "
  }
  const channel = sWlc[member.guild.id].channel
    const sChannel = sWlc[member.guild.id].channel
    let welcomer = member.guild.channels.find('name', sChannel);
    let memberavatar = member.user.avatarURL
      if (!welcomer) return;
      if(welcomer) {
         moment.locale('ar-ly');
         var h = member.user;
        let heroo = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(h.avatarURL)
        .setAuthor(h.username,h.avatarURL)
        .addField(': تاريخ دخولك الدسكورد',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)            
         .addField(': تاريخ دخولك السيرفر',`${moment(member.joinedAt).format('D/M/YYYY h:mm a ')} \n\`\`${moment(member.joinedAt).startOf(' ').fromNow()}\`\``, true)      
         .setFooter(`${h.tag}`,"https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif")
     welcomer.send({embed:heroo});          
         
      var Canvas = require('canvas')
      var jimp = require('jimp')
     
    const w = ['./w1.png'];
 
              let Image = Canvas.Image,
                  canvas = new Canvas(400, 200),
                  ctx = canvas.getContext('2d');
 
              fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
                  if (err) return console.log(err)
                  let BG = Canvas.Image;
                  let ground = new Image;
                  ground.src = Background;
                  ctx.drawImage(ground, 0, 0, 400, 200);
 
      })
 
                      let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".gif" : member.user.displayAvatarURL;
                      jimp.read(url, (err, ava) => {
                          if (err) return console.log(err);
                          ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                              if (err) return console.log(err);
 
                                    ctx.font = "bold 12px Arial";
                              ctx.fontSize = '20px';
                              ctx.fillStyle = "#f1f1f1";
                                ctx.fillText(member.user.username, 200, 150);
 
                              //NAMEً
                              ctx.font = "bold 12px Arial";
                              ctx.fontSize = '20px';
                              ctx.fillStyle = "#f1f1f1";
      ctx.fillText(`Welcome To Server`, 220, 125);
 
                              //AVATARً
                              let Avatar = Canvas.Image;
                              let ava = new Avatar;
                              ava.src = buf;
                              ctx.beginPath();
                              ctx.arc(77, 101, 62, 0, Math.PI*2);
                              ctx.stroke();
                                 ctx.clip();
                                 ctx.drawImage(ava, 13, 38, 128, 126);
 
 
    welcomer.sendFile(canvas.toBuffer())
 
 
 
      })
      })
 
      }
      });
   
     
client.on('ready', () => {
  wait(1000);
 
  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});
 
client.on('guildMemberAdd', member => {
  member.guild.fetchInvites().then(guildInvites => {
    const ei = invites[member.guild.id];
    invites[member.guild.id] = guildInvites;
    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const inviter = client.users.get(invite.inviter.id);
    const logChannel = member.guild.channels.find(channel => channel.name === "welcome");
    logChannel.send(`${member} Invited by: <@${inviter.id}>`);
  });
});












 
 client.on('message' , message => {
     var prefix = "@";
 if(message.content.startsWith(prefix+"user")) {
     let user = message.mentions.users.first() || message.author;
     const joineddiscord = (user.createdAt.getDate() + 1) + '-' + (user.createdAt.getMonth() + 1) + '-' + user.createdAt.getFullYear() + ' | ' + user.createdAt.getHours() + ':' + user.createdAt.getMinutes() + ':' + user.createdAt.getSeconds();
     message.delete();
     let game;
     if (user.presence.game === null) {
         game = 'لا يلعب حاليا.';
     } else {
         game = user.presence.game.name;
     }
     let messag;
     if (user.lastMessage === null) {
         messag = 'لم يرسل رسالة. ';
     } else {
         messag = user.lastMessage;
     }
     let status;
     if (user.presence.status === 'online') {
         status = ':green_heart:';
     } else if (user.presence.status === 'dnd') {
         status = ':heart:';
     } else if (user.presence.status === 'idle') {
         status = ':yellow_heart:';
     } else if (user.presence.status === 'offline') {
         status = ':black_heart:';
     }
     if (user.presence.status === 'offline') {
         stat = 0x000000;
     } else if (user.presence.status === 'online') {
         stat = 0x00AA4C;
     } else if (user.presence.status === 'dnd') {
         stat = 0x9C0000;
     } else if (user.presence.status === 'idle') {
         stat = 0xF7C035;
     }
     const embed = new Discord.RichEmbed()
   .addField('**UserInfo:**', `**name:** ${user.username}#${user.discriminator}\n**JoinedDiscord:** ${joineddiscord}\n**LastMessage:** ${messag}\n**Playing:** ${game}\n**Status:** ${status}\n**Bot?** ${user.bot}`, true)
   .setThumbnail(user.displayAvatarURL)
   .addField(`Roles:`, message.guild.members.get(user.id).roles.array(role => role.name).slice(1).join(', '))
   .addField('DiscordInfo:', `**Discriminator:** #${user.discriminator}\n**ID:** ${user.id}\n**Username:** ${user.username}`)
   .setAuthor(`معلومات ${user.username}`, user.displayAvatarURL)
   .setColor(stat);
     message.channel.send({embed})
   .catch(e => logger.error(e));
 }
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
   
const ms = require("ms");
  client.on("message", message => {
 if(!message.channel.guild) return;  
  if (message.author.bot) return;
 
  let command = message.content.split(" ")[0];
 
  if (message.content.split(" ")[0].toLowerCase() === prefix + "unmute") {
        if (!message.member.hasPermission('MANAGE_ROLES')) return;
  let user = message.mentions.users.first();
  let modlog = client.channels.find('name', 'log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!muteRole) return message.reply(" I Can’t Find 'Muted' Role ").catch(console.error).then(message => message.delete(4000))
  if (message.mentions.users.size < 1) return message.reply(' Error : ``Mention a User``').catch(console.error).then(message => message.delete(4000))
  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return;
 
  if (message.guild.member(user).removeRole(muteRole.id)) {
      return message.reply("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
  } else {
    message.guild.member(user).removeRole(muteRole).then(() => {
      return message.reply("User Has Been UnMuted.").catch(console.error).then(message => message.delete(4000))
    });
  }
 
};
 
});
 
 
client.on('message',function(message) {
 if(!message.channel.guild) return;    let messageArray = message.content.split(' ');
    let muteRole =  message.guild.roles.find('name', 'Muted');
    let muteMember = message.mentions.members.first();
    let muteReason = messageArray[2];
    let muteDuration = messageArray[3];
 if (message.content.split(" ")[0].toLowerCase() === prefix + "mute") {
           
  if (message.author.bot) return;
       if(!muteRole) return message.guild.createRole({name: 'Muted'}).then(message.guild.channels.forEach(chan => chan.overwritePermissions(muteRole, {SEND_MESSAGES:false,ADD_REACTIONS:false})));
       if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.channel.send(' Error : You Need `` MANAGE_ROLES ``Permission ');
       if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(' Error : I Don’t Have `` MANAGE_ROLES ``Permission ');
       if(!muteMember) return message.channel.send(' Error : ``Mention a User``').then(message => message.delete(4000))
       if(!muteReason) return message.channel.send(' Error : ``Supply a Reason``').then(message => message.delete(4000))
       if(!muteDuration) return message.channel.send(' Error : `` Supply Mute Time `` \n Ex: #mute @user reason 1m ').then(message => message.delete(4000))
       if(!muteDuration.match(/[1-7][s,m,h,d,w]/g)) return message.channel.send(' Error : `` Invalid Mute Duration``').then(message => message.delete(4000))
       message.channel.send(`${muteMember} Has Been Muted.`).then(message => message.delete(5000))
       muteMember.addRole(muteRole);
       muteMember.setMute(true)
       .then(() => { setTimeout(() => {
           muteMember.removeRole(muteRole)
           muteMember.setMute(false)
       }, mmss(muteDuration));
       });
   }
});













 
client.on('message',async message => {
    const moment = require('moment');
const ms = require('ms')
    var prefix = '@' //بريفكس البوت
  var time = moment().format('Do MMMM YYYY , hh:mm');
  var room;
  var title;
  var duration;
  var currentTime = new Date(),
hours = currentTime.getHours() + 3 ,
minutes = currentTime.getMinutes(),
done = currentTime.getMinutes() + duration,
seconds = currentTime.getSeconds();
if (minutes < 10) {
minutes = "0" + minutes;
}
var suffix = "AM";
if (hours >= 12) {
suffix = "PM";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
 
  var filter = m => m.author.id === message.author.id;
  if(message.content.startsWith(prefix + "gstart")) {
 
    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(':heavy_multiplication_x:| **يجب أن يكون لديك خاصية التعديل على السيرفر**');
    message.channel.send(`:eight_pointed_black_star:| **Send Name channel For the Giveaway**`).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        let room = message.guild.channels.find('name' , collected.first().content);
        if(!room) return message.channel.send(':heavy_multiplication_x:| **i Found It :(**');
        room = collected.first().content;
        collected.first().delete();
        msg.edit(':eight_pointed_black_star:| **Time For The Giveaway**').then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            if(!collected.first().content.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send('**The Bot Not Support This Time**');
            duration = collected.first().content
            collected.first().delete();
            msg.edit(':eight_pointed_black_star:| **Now send The Present **').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                title = collected.first().content;
                collected.first().delete();
                msg.delete();
                message.delete();
                try {
                  let giveEmbed = new Discord.RichEmbed()
                  .setDescription(`**${title}** \nReact With 🎉 To Enter! \nTime remaining : ${duration} \n **Created at :** ${hours}:${minutes}:${seconds} ${suffix}`)
                  .setFooter(message.author.username, message.author.avatarURL);
                  message.guild.channels.find("name" , room).send(' :heavy_check_mark: **Giveaway Created** :heavy_check_mark:' , {embed: giveEmbed}).then(m => {
                     let re = m.react('🎉');
                     setTimeout(() => {
                       let users = m.reactions.get("🎉").users
                       let list = users.array().filter(u => u.id !== m.author.id !== client.user.id);
                       let gFilter = list[Math.floor(Math.random() * list.length) + 0]
                       let endEmbed = new Discord.RichEmbed()
                       .setAuthor(message.author.username, message.author.avatarURL)
                       .setTitle(title)
                       .addField('Giveaway Ended !🎉',`Winners : ${gFilter} \nEnded at :`)
                       .setTimestamp()
                     m.edit('** 🎉 GIVEAWAY ENDED 🎉**' , {embed: endEmbed});
                    message.guild.channels.find("name" , room).send(`**Congratulations ${gFilter}! You won The \`${title}\`**` , {embed: {}})
                }, ms(duration));
            });
                } catch(e) {
                message.channel.send(`:heavy_multiplication_x:| **i Don't Have Prem**`);
                  console.log(e);
                }
              });
            });
          });
        });
      });
    });
  }
});






















  client.on('message', msg => {//msg
    if (msg.content === `${prefix}colors`) {
      msg.channel.send({file : "https://cdn.discordapp.com/attachments/501774006966419458/501774646467887105/colors.png"})
    }
  });;
 
  client.on('message', message => {
    let args = message.content.split(' ').slice(1);
    if(message.content.split(' ')[0] == `${prefix}color`){
    const embedd = new Discord.RichEmbed()
    .setFooter('Requested by '+message.author.username, message.author.avatarURL)
    .setDescription(`**لا يوجد لون بهذا الأسم ** :x: `)
    .setColor(`ff0000`)
   
    if(!isNaN(args) && args.length > 0)
   
   
    if    (!(message.guild.roles.find("name",`${args}`))) return  message.channel.sendEmbed(embedd);
   
   
    var a = message.guild.roles.find("name",`${args}`)
     if(!a)return;
    const embed = new Discord.RichEmbed()
   
    .setFooter('Requested by '+message.author.username, message.author.avatarURL)
    .setDescription(`**Done , تم تغير لونك . :white_check_mark: **`)
   
    .setColor(`${a.hexColor}`)
    message.channel.sendEmbed(embed);
    if (!args)return;
    setInterval(function(){})
       let count = 0;
       let ecount = 0;
    for(let x = 1; x < 201; x++){
   
    message.member.removeRole(message.guild.roles.find("name",`${x}`))
   
    }
     message.member.addRole(message.guild.roles.find("name",`${args}`));
   
   
    }
    });
 
   
client.on('message', message => {
  if(message.content === prefix + 'createcolors') {
                       if(!message.channel.guild) return message.channel.send('**This Commnad only For Servers !**');
       if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**You Dont Have** `ADMINISTRATOR` **premission**').then(msg => msg.delete(6000))
    message.guild.createRole({
                name: "1",
                  color: "#FFB6C1",
                  permissions: []
   })
         message.guild.createRole({
                name: "2",
                  color: "#FFC0CB",
                  permissions: []
   })
              message.guild.createRole({
                name: "3",
                  color: "#FF69B4",
                  permissions: []
   })
                   message.guild.createRole({
                name: "4",
                  color: "#FF1493",
                  permissions: []
   })
                   message.guild.createRole({
                name: "5",
                  color: "#DB7093",
                  permissions: []
   })
                   message.guild.createRole({
                name: "6",
                  color: "#C71585",
                  permissions: []
   })
                   message.guild.createRole({
                name: "7",
                  color: "#E6E6FA",
                  permissions: []
   })
                   message.guild.createRole({
                name: "8",
                  color: "#D8BFD8",
                  permissions: []
   })
                   message.guild.createRole({
                name: "8",
                  color: "#DDA0DD",
                  permissions: []
   })
                   message.guild.createRole({
                name: "9",
                  color: "#DA70D6",
                  permissions: []
   })
                   message.guild.createRole({
                name: "10",
                  color: "#EE82EE",
                  permissions: []
   })
                   message.guild.createRole({
                name: "11",
                  color: "#FF00FF",
                  permissions: []
   })
                   message.guild.createRole({
                name: "12",
                  color: "#BA55D3",
                  permissions: []
   })
                   message.guild.createRole({
                name: "13",
                  color: "#9932CC",
                  permissions: []
   })
                        message.guild.createRole({
                name: "14",
                  color: "#9400D3",
                  permissions: []
   })
                        message.guild.createRole({
                name: "15",
                  color: "#8A2BE2",
                  permissions: []
   })
                             message.guild.createRole({
                name: "16",
                  color: "#8B008B",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "17",
                  color: "#800080",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "18",
                  color: "#9370DB",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "19",
                  color: "#7B68EE",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "20",
                  color: "#6A5ACD",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "21",
                  color: "#483D8B",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "22",
                  color: "#663399",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "23",
                  color: "#4B0082",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "24",
                  color: "#FFA07A",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "25",
                  color: "#FA8072",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "26",
                  color: "#E9967A",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "27",
                  color: "#F08080",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "28",
                  color: "#CD5C5C",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "29",
                  color: "#DC143C",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "30",
                  color: "  #FF0000",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "31",
                  color: "#B22222",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "32",
                  color: "#8B0000",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "33",
                  color: "#FFA500",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "34",
                  color: "#FF8C00",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "35",
                  color: "#FF7F50",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "36",
                  color: "#FF6347",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "37",
                  color: "#FF4500",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "38",
                  color: "#FFD700",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "39",
                  color: "#FFFFE0",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "40",
                  color: "#FFFACD",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "41",
                  color: "#FAFAD2",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "42",
                  color: "  #FFEFD5",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "43",
                  color: "#FFE4B5",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "44",
                  color: "#FFDAB9",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "45",
                  color: "#EEE8AA",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "46",
                  color: "#F0E68C",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "47",
                  color: "#BDB76B",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "48",
                  color: "#ADFF2F",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "49",
                  color: "#7FFF00",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "50",
                  color: "#7CFC00",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "51",
                  color: "#00FF00",
                  permissions: []
   })  
   
                                       message.guild.createRole({
                name: "52",
                  color: "#32CD32",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "53",
                  color: "#98FB98",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "54",
                  color: "#90EE90",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "55",
                  color: "#00FA9A",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "56",
                  color: "#00FF7F",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "57",
                  color: "#3CB371",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "58",
                  color: "#2E8B57",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "59",
                  color: "#2E8B57",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "60",
                  color: "#008000",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "61",
                  color: "#006400",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "62",
                  color: "#9ACD32",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "63",
                  color: "#6B8E23",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "64",
                  color: "#556B2F",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "65",
                  color: "#66CDAA",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "66",
                  color: "#8FBC8F",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "67",
                  color: "#20B2AA",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "68",
                  color: "#008B8B",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "69",
                  color: "#008080",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "70",
                  color: "#00FFFF",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "71",
                  color: "#E0FFFF",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "72",
                  color: "#AFEEEE",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "73",
                  color: "#7FFFD4",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "74",
                  color: "#40E0D0",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "75",
                  color: "#48D1CC",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "76",
                  color: "#00CED1",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "77",
                  color: "#5F9EA0",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "78",
                  color: "#4682B4",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "79",
                  color: "#B0C4DE",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "80",
                  color: "#ADD8E6",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "81",
                  color: "#B0E0E6",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "82",
                  color: "#87CEFA",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "83",
                  color: "#87CEEB",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "84",
                  color: "#6495ED",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "85",
                  color: "#00BFFF",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "86",
                  color: "#1E90FF",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "87",
                  color: "#4169E1",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "88",
                  color: "#0000FF",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "89",
                  color: "#0000CD",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "90",
                  color: "#00008B",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "91",
                  color: "#000080",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "92",
                  color: "#191970",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "93",
                  color: "#FFF8DC",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "94",
                  color: "#FFEBCD",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "95",
                  color: "#FFE4C4",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "96",
                  color: "#FFDEAD",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "97",
                  color: "#F5DEB3",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "98",
                  color: "#DEB887",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "99",
                  color: "#D2B48C",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "100",
                  color: "#BC8F8F",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "101",
                  color: "#F4A460",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "102",
                  color: "#DAA520",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "103",
                  color: "#B8860B",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "104",
                  color: "#CD853F",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "105",
                  color: "#D2691E",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "106",
                  color: "#808000",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "107",
                  color: "#8B4513",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "108",
                  color: "#A0522D",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "109",
                  color: "#A52A2A",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "110",
                  color: "#800000",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "111",
                  color: "#FFFFFF",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "112",
                  color: "#FFFAFA",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "113",
                  color: "#F0FFF0",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "114",
                  color: "#F5FFFA",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "115",
                  color: "#F0FFFF",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "116",
                  color: "#F0F8FF",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "117",
                  color: "#F8F8FF",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "118",
                  color: "#F5F5F5",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "119",
                  color: "#FFF5EE",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "120",
                  color: "#F5F5DC",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "121",
                  color: "#FDF5E6",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "122",
                  color: "#FFFAF0",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "123",
                  color: "#FFFFF0",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "124",
                  color: "#FAEBD7",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "125",
                  color: "#FAF0E6",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "126",
                  color: "#FFF0F5",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "127",
                  color: "#FFE4E1",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "128",
                  color: "#DCDCDC",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "129",
                  color: "#D3D3D3",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "130",
                  color: "#C0C0C0",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "131",
                  color: "#f7f7f7",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "132",
                  color: "#b2b2b2",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "133",
                  color: "#6f6c6c",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "134",
                  color: "#4d4646",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "135",
                  color: "#4c4c4c",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "136",
                  color: "#2F4F4F",
                  permissions: []
   })    
                                       message.guild.createRole({
                name: "137",
                  color: "#040000",
                  permissions: []
   })    
 
   
        message.channel.sendMessage({embed: new Discord.RichEmbed()
   .setColor('#502faf').setAuthor(`${message.author.username}'`, message.author.avatarURL).setDescription('``Colors Has Been Created``')});
  }
 
 
 
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '1');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '2');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '3');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '4');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '5');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '6');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '7');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '8');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '9');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '10');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '11');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '12');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '13');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '14');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '15');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '16');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '17');
 
  role.delete()
  }
 
});
 
 
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '18');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '19');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '20');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith("+!deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '21');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '22');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '23');
 
  role.delete()
  }
 
});
 
 
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '24');
 
  role.delete()
  }
 
});
 
 
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '25');
 
  role.delete()
  }
 
});
 
 
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '26');
 
  role.delete()
  }
 
});
 
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '27');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '28');
 
  role.delete()
  }
 
});
 
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '29');
 
  role.delete()
  }
 
});
 
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '30');
 
  role.delete()
  }
 
});
 
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '31');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '32');
 
  role.delete()
  }
 
});
 
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '33');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '34');
 
  role.delete()
  }
 
});
 
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '35');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '36');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '37');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '38');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '39');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '40');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '41');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '42');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '43');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '44');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '45');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '46');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '47');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '48');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '49');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '50');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '51');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '52');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '53');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '54');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '55');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '56');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '57');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '58');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '59');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '60');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '-61');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '62');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '63');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '64');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '65');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '66');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '67');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '68');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '69');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '70');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '71');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '72');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '73');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '74');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '75');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '76');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '77');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '78');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '79');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '80');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '81');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '82');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '83');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '84');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '85');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '86');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '87');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '88');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '89');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '90');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '91');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '92');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '93');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '94');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '95');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '96');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith (`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '97');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '98');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '99');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '100');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '101');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '102');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '103');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '104');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '105');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith (`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '106');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '107');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '108');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '109');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '110');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '111');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '112');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '11
        
      
      
      })
      })
      
      }
      });





client.login(process.env.BOT_TOKEN);
