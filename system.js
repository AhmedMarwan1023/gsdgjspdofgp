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
  let role = message.guild.roles.find('name', '113');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '114');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '115');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '116');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '117');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '118');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '119');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '121');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '122');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith("!deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '123');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '124');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '125');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '126');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '127');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '128');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '129');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '130');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '131');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '132');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '133');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '134');
 
  role.delete()
  }
 
});
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '135');
 
  role.delete()
  }
 
});
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '136');
 
  role.delete()
  }
 
});
 
 
 
client.on('message', async message => {
 
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(`${prefix}deletecolors`)) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '137');
 
  role.delete()
  }
 
});
})














client.on('message', message => {
           let args = message.content.split(' ').slice(1);
    if(message.content.split(' ')[0] == '@color'){
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
 
 
 
 
 
 client.on('ready', function(){
    var ms = 10000 ;
    var setGame = ['@help' ];
    var i = -1;
    var j = 0;
    setInterval(function (){
        if( i == -1 ){
            j = 1;
        }
        if( i == (setGame.length)-1 ){
            j = -1;
        }
        i = i+j;
        client.user.setGame(setGame[i],`https://www.twitch.tv/n3k4a`);
    }, ms);

})













	var moment = require("moment");
client.on('message', message => {
if(message.author.bot) return;
  var prefix = '@'; // البريفكس
  
  if (message.content.startsWith(prefix + "id")) { // الامر
      message.react("🆔") 
  if(!message.channel.guild) return message.reply(`**__بس بالسيرفرات__**`);
   message.guild.fetchInvites().then(invs => {
      let member = client.guilds.get(message.guild.id).members.get(message.author.id);
      let personalInvites = invs.filter(i => i.inviter.id === message.author.id);
      let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
      var moment = require('moment');
      var args = message.content.split(" ").slice(1);
let user = message.mentions.users.first();
var men = message.mentions.users.first();
 var heg;
 if(men) {
     heg = men
 } else {
     heg = message.author
 }
var mentionned = message.mentions.members.first();
  var h;
 if(mentionned) {
     h = mentionned
 } else {
     h = message.member
 }
moment.locale('ar-TN');
      var id = new  Discord.RichEmbed()
    .setColor("!0a0909")
    .setAuthor(message.author.username, message.author.avatarURL) 
.addField('**تاريخ دخولك الدسكورد**:', `${moment(heg.createdTimestamp).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(heg.createdTimestamp).fromNow()}\`` ,true) 
.addField('**تاريخ دخولك السيرفر**:', `${moment(h.joinedAt).format('YYYY/M/D HH:mm:ss')} \n \`${moment(h.joinedAt).fromNow()}\``, true)
.addField("**اسمك**", `${message.author.username}`)
.addField('**تاقك**', message.author.discriminator)
.addField('**ايديك**', message.author.id)
.setFooter("『معلوماتك』")  
    message.channel.sendEmbed(id);
})
}       
});

	   
	   
	   
	   
	   
	   
	   
	   client.on('message', async function (message)  {
if(message.content.startsWith(prefix+"server")) {
const vlevel = ['None', 'Low (Must have verified email)', 'Medium (Must be register for 5 mineuts)', 'High (Need to wait 10 minutes)', 'Very High (Need verified phone on account)']
const members = await message.guild.members.filter(m=> m.presence.status === 'online').size + message.guild.members.filter(m=> m.presence.status === 'idle').size + message.guild.members.filter(m=> m.presence.status === 'dnd').size  
message.channel.send(new discord.RichEmbed() 
.setAuthor(`${message.guild.name} [Server Icon URL]`, message.guild.iconURL)
.setURL(message.guild.iconURL)
.addField('🆔 ايدي السيرفر', message.guild.id, true)
.addField('👑 اونر السيرفر', message.guild.owner, true)
.addField('🗺 منطقة', message.guild.region, true)
.addField(`👥 الاعضاء [${message.guild.memberCount}]`, `${members} online` ,true)
.addField(`💬 القنوات`, `**${message.guild.channels.filter(c => c.type === 'category').size}** الاقسام | **${message.guild.channels.filter(c=> c.type === 'text').size}**روم كتابي | **${message.guild.channels.filter(c=> c.type === 'voice').size}** روم صوتي` ,true)
.addField(`💠 مستوى التحقق`, vlevel[message.guild.verificationLevel] ,true)
.addField(`👔 الرتب`, message.guild.roles.size ,true)
.addField(`📆 تم انشأوها`, message.guild.createdAt ,true)
)
}
})










client.on("message", (message) => {
    /// DREAM
   if (message.content.startsWith("@new")) {     /// DREAM
        const reason = message.content.split(" ").slice(1).join(" ");     /// DREAM
        if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`لازم تسوي رتبة اسمها \`Support Team\` وتنطي البوت ادمنيتر حتا يقدر يسوي الرومات ويعدل برمشنات`);
        if (message.guild.channels.exists("name", "ticket-{message.author.id}" + message.author.id)) return message.channel.send(`You already have a ticket open.`);    /// ALPHA CODES
        message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
            let role = message.guild.roles.find("name", "Support Team");
            let role2 = message.guild.roles.find("name", "@everyone");
            c.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });    /// ALPHA CODES
            c.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            c.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });
            message.channel.send(`:white_check_mark: تم انشاء تذكرتك, #${c.name}.`);
            const embed = new Discord.RichEmbed()
                .setColor(0xCF40FA)
                .addField(`Hey ${message.author.username}!`, `تم فتح تذكرة الرجاء انتظار الى حين يأتي مشرف ويقوم بلرد عليك`)
                .setTimestamp();
            c.send({
                embed: embed
            });
        }).catch(console.error);
    }
 
 
  if (message.content.startsWith("@close")) {
        if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);
 
       message.channel.send(`هل انت متأكد من اقفالك للتذكرة اذا متأكد اكتب @confirm`)
           .then((m) => {
                       max: 1,
                   then((collected) => {
                       message.channel.delete();
                   })    /// DREAM
                   .catch(() => {
                       m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
                           m2.delete();
                       }, 3000);
                   });
           });
   }
 
});









client.on('message', msg => {
        if (msg.content.startsWith(`@warn`)) {
          if(!msg.member.hasPermission("MANAGE_MESSAGES")) return;
           let args = msg.content.split(" ").slice(1);
          if (!msg.mentions.members.first()) return msg.reply('منشن الشخص المحدد')
          if (!args[1]) return msg.reply('``اكتب السبب``')
          //غير اسم الروم او سوي روم بذا الاسم
          if (msg.guild.channels.find('name', 'warns')) {
            //اذا غيرت فوق غير هنا كمان
            msg.guild.channels.find('name', 'warns').send(`
          تم اعطائك تنبيه : ${msg.mentions.members.first()}
          لأنك قمت بما يلي
          ${args.join(" ").split(msg.mentions.members.first()).slice(' ')}
          `)
          }
        }
})



















client.on('message', message => {
    if (message.content.startsWith("@avatar")) {
if(!message.channel.guild) return;
        var mentionned = message.mentions.users.first();
    var client;
      if(mentionned){
          var client = mentionned; } else {
          var client = message.author;
      }
        const embed = new Discord.RichEmbed()
                           .addField('Requested by:', "<@" + message.author.id + ">")
        .setColor(000000)
        .setImage(`${client.avatarURL}`)
      message.channel.sendEmbed(embed);
    }
});



















client.on("message", message => {
        var prefix = "@";//البرفكس
    if(message.content.startsWith(prefix + "setout")) {
        let args = message.mentions.channels.first();
            if(!args) message.channel.send("** منشن روم . :x:**");
                if(!message.guild.member(message.author.id).hasPermission("MANAGE_CHANNELS")) return message.channel.send("**ليس لديك صلاحيات . :x:**");
                        message.channel.send(`**${args}. لقد تم شغل الروم هذا للترحيب.**`);
                    client.on("guildMemberRemove", (member) => {
                            if(member.user.bot) return;
                         var embed = new Discord.RichEmbed()
    .setAuthor(member.user.username, member.user.avatarURL)
  .setThumbnail(member.user.avatarURL)
  .setTitle('Out Member')
  .setDescription('GoodBye')
  .addField('**ID Member:',"" +  member.user.id, true)
    .addField('**Tage Member:', member.user.discriminator, true)
    .addField('Created At Member', member.user.createdAt, true)
    .addField(' :bust_in_silhouette:  Your Number',`**[ ${member.guild.memberCount} ]**`,true)
    .setColor('RED')
  .setFooter(member.guild.name, member.guild.iconURL, true)
                         
   args.send({embed : embed});
                    });
    }
});






















client.on("message", message => {
        var prefix = "@";// البرفكس
    if(message.content.startsWith(prefix + "setwlc")) {
        let args = message.mentions.channels.first();
            if(!args) message.channel.send("** منشن روم . :x:**").then(m => {    
m.delete(1500);
})
                if(!message.guild.member(message.author.id).hasPermission("MANAGE_CHANNELS")) return message.channel.send("**ليس لديك صلاحيات . :x:**");
                        message.channel.send(`**${args}. لقد تم شغل الروم هذا للترحيب.**`);
                    client.on("guildMemberAdd", (member) => {
                            if(member.user.bot) return;
                         var embed = new Discord.RichEmbed()
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle('New Member')
    .setDescription('Welcome To Server')
    .addField('**ID Member:',"" +  member.user.id, true)
    .addField('**Tage Member:', member.user.discriminator, true)
    .addField('Created At Member', member.user.createdAt, true)
    .addField(' :bust_in_silhouette:  Your Number',`**[ ${member.guild.memberCount} ]**`,true)
    .setColor('GREEN')
    .setFooter(member.guild.name, member.guild.iconURL, true)
                         
   args.send({embed : embed});
                    });
    }
});










    client.on('message', message => {
      if (message.author.x5bz) return;
      if (!message.content.startsWith(prefix)) return;
     
      let command = message.content.split(" ")[0];
      command = command.slice(prefix.length);
     
      let args = message.content.split(" ").slice(1);
     
      if (command == "ban") {
                   if(!message.channel.guild) return message.reply('** This command only for servers**');
             
      if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**You Don't Have ` BAN_MEMBERS ` Permission**");
      if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
      let user = message.mentions.users.first();
      let reason = message.content.split(" ").slice(2).join(" ");
      /*let b5bzlog = client.channels.find("name", "5bz-log");
     
      if(!b5bzlog) return message.reply("I've detected that this server doesn't have a 5bz-log text channel.");*/
      if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
      if(!reason) return message.reply ("**اكتب سبب الطرد**");
      if (!message.guild.member(user)
      .bannable) return message.reply("**لايمكنني طرد شخص اعلى من رتبتي يرجه اعطاء البوت رتبه عالي**");
     
      message.guild.member(user).ban(7, user);
     
      const banembed = new Discord.RichEmbed()
      .setAuthor(`BANNED!`, user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**User:**",  '**[ ' + `${user.tag}` + ' ]**')
      .addField("**By:**", '**[ ' + `${message.author.tag}` + ' ]**')
      .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
      message.channel.send({
        embed : banembed
      })
    }
    });






client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(`:rose:  ولكم نورت السيرفر:rose: 
:crown: ${member}:crown:  
انت العضو رقم ${member.guild.memberCount} `) 
}).catch(console.error)
})







client.on('message', function(msg) {
    const prefix = '@'
    if(msg.content.startsWith (prefix  + 'server2')) {
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`Showing Details Of  **${msg.guild.name}*`)
      .addField('🌐** نوع السيرفر**',`[** __${msg.guild.region}__ **]`,true)
      .addField('🏅** __الرتب__**',`[** __${msg.guild.roles.size}__ **]`,true)
      .addField('🔴**__ عدد الاعضاء__**',`[** __${msg.guild.memberCount}__ **]`,true)
      .addField('🔵**__ عدد الاعضاء الاونلاين__**',`[** __${msg.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
      .addField('📝**__ الرومات الكتابية__**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
      .addField('🎤**__ رومات الصوت__**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
      .addField('👑**__ الأونـر__**',`**${msg.guild.owner}**`,true)
      .addField('🆔**__ ايدي السيرفر__**',`**${msg.guild.id}**`,true)
      .addField('📅**__ تم عمل السيرفر في__**',msg.guild.createdAt.toLocaleString())
      msg.channel.send({embed:embed});
    }
  });


  
  
  
  
  
  
  
  
  
  
  
  
  
  client.on('message', message => {
    var prefix = "@";
   if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'clear')) {
if(!message.channel.guild) return message.channel.send('**This Command is Just For Servers**').then(m => m.delete(5000));
if(!message.member.hasPermission('MANAGE_MESSAGES')) return      message.channel.send('**You Do not have permission** `MANAGE_MESSAGES`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let request = `Requested By ${message.author.username}`;
message.channel.send(`**Are You sure you want to clear the chat?**`).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))
 
let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
 
let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`Chat will delete`).then(m => m.delete(5000));
var msg;
        msg = parseInt();
 
      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "`` Chat Deleted ``",
        color: 0x06DF00,
        footer: {
 
        }
      }}).then(msg => {msg.delete(3000)});
 
})
reaction2.on("collect", r => {
message.channel.send(`**Chat deletion cancelled**`).then(m => m.delete(5000));
msg.delete();
})
})
}
});

















client.on('message', message => {
 
    if (message.content === "@mc") {
                        if(!message.channel.guild) return message.reply(' هذا الامر فقط للسيرفرات !!');
 
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(' ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: false
 
           }).then(() => {
               message.reply("تم تقفيل الشات ✅ ")
           });
             }
if (message.content === "@unmc") {
    if(!message.channel.guild) return message.reply(' هذا الامر فقط للسيرفرات !!');
 
if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('ليس لديك صلاحيات');
           message.channel.overwritePermissions(message.guild.id, {
         SEND_MESSAGES: true
 
           }).then(() => {
               message.reply("تم فتح الشات✅")
           });
             }
 
 
 
});












 client.on('message', message => {
    const prefix = "@";
      if (message.author.kick) return;
      if (!message.content.startsWith(prefix)) return;
     
      let command = message.content.split(" ")[0];
      command = command.slice(prefix.length);
     
      let args = message.content.split(" ").slice(1);
     
      if (command == "kick") {
                   if(!message.channel.guild) return;
             
      if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("You Don't Have KICK_MEMBERS Permission").then(msg => msg.delete(5000));
      if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("I Don't Have KICK_Members Permission");
      let user = message.mentions.users.first();
      let reason = message.content.split(" ").slice(2).join(" ");
     
      if (message.mentions.users.size < 1) return message.reply("منشن شخص");
      if(!reason) return message.reply ("اكتب سبب الطرد");
      if (!message.guild.member(user)
      .bannable) return message.reply("لايمكنني طرد شخص اعلى من رتبتي");
     
      message.guild.member(user).kick(7, user);
     
      const banembed = new Discord.RichEmbed()
      .setAuthor('Kicked !', user.displayAvatarURL)
      .setColor("RANDOM")
      .setTimestamp()
      .addField("User:",  `[ + ${user.tag} + ]`)
      .addField("By:", `[  + ${message.author.tag} +  ]`)
      .addField("Reason:", `[ + ${reason} +  ]`)
      client.channels.get("492583022982463500").send({embed : banembed})
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




		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  
		  const sar7 = ["صراحة هل سرقت من ابوك فلوس؟", "صراحة هل سرقت سياره؟",  "هل اخذت مفتاح سيارت ابوك و هو نايم؟",   'صراحة كم مره سويته على نفسك فوق سريرك؟',    'صراحة هل سبيت احد؟',     'صراحة مسوي شي ورا امك و ابوك؟',      'صراحة هل رفعت صوتك على امك او ابوك؟',       'صراحة هل اعطيت احد غريب ماتعرفه كف؟',        'صراحة كم مره ابوك اعطاك كف؟',         'صراحة كم مره امك اعطاتك كف؟',];

client.on('message', message => {

 
if (message.content.startsWith('@sara7ah')) {

  if(!message.channel.guild) return message.reply('** This command only for servers **');
var Die = new Discord.RichEmbed()
.setTitle("لعبة صراحة  ..")
.setColor('RANDOM')
.setDescription(`${sar7[Math.floor(Math.random() * sar7.length)]}`)
.setImage("https://www.pal24.net/cachedImages/resize/677/452/pal24_images/appicon1-png-49341815748414091.png")
               .setTimestamp()
message.channel.sendEmbed(Die);
}

});







const minecraft = [  'ما معنى تطويرة؛ silk touch ؟',  'من هوة اللذي قد انهى سلسلة سيرفر مايت كرافت؟',  'ماهو الوحش اللذي يرسبن في معبد البحر؟',  'من افضل يوتيوبر ينزل شروحات)ردستونية؛عامة',  'ماذا يفعل لك الهيروبراين؟',  'ماهو الشئ اللذي يمكن مكاثرة الفلجر فيه؟',  'من هو اندر ثاني شئ في ماين كرافت',  'ماهو الامر اللذي يعطينا كوماند بلوك؟',  'كم من الوقت يستغرق اليوم العادي في ماين كرافت؟',  'هل لليردستون اهمية كبيرة في ماين كرافت؟',  'اندر اور',  'مطور ماين كرافت السابق',  'اصغر موب في ماين كرافت',  'كيف تصنع البوق',  'في اي ارتفاع تلقى الدايموند',  'موب مستحيل تضربة بالبو (السهم)',  'كم نحتاج من Glowstone Dust لكي نصنع بلكة كاملة منه',  'كم نحتاج حبة ايرون لصنع سكة الحديد (Track)',  'كم عدد قلوب البقرة',  'ن ماذا يخاف الكريبر',  'يشتهر الاندرمان ب…..?',  'كم عدد قلوب الايرون قولم',  'كم ضربة تضرب الدجاجة و تموت',  'كم بلوكة تحتاج بوابة النذر',  'كم بلوكة تحتاج بوابة الاند',  'كم تحتاج الفرن ايروون عشان تصنعها',  'كيف تصنع كرافتنق تيبل',  'كم ياخذ وقت النبات عشان يكبر',  'كم قلوب ستيفي',  'كم قلوب الاندر مان',  'هل الاندر مان يضرب',  'هل الزومبي غبي ؟ و في اي تحديث ؟',  'ماهو الافضل للتسخين الافا او فحم ؟',  'ماهو شئ الذي اقوى من الاوبسيدين ؟',]
client.on('message', message => {

 
if (message.content.startsWith(prefix + 'min')) {

  if(!message.channel.guild) return message.reply('** This command only for servers **');
var client= new Discord.RichEmbed()
.setTitle("لعبة ماين كرافت ..")
.setColor('RANDOM')
.setDescription(`${minecraft[Math.floor(Math.random() * minecraft.length)]}`)
.setImage("https://i.imgur.com/RyOXHmZ.png")
               .setTimestamp()

message.channel.sendEmbed(client);
message.react("??")
}

});















 const cuttweet = [
     'كت تويت ‏| تخيّل لو أنك سترسم شيء وحيد فيصبح حقيقة، ماذا سترسم؟',
     'كت تويت | أكثر شيء يُسكِت الطفل برأيك؟',
     'كت تويت | الحرية لـ ... ؟',
     'كت تويت | قناة الكرتون المفضلة في طفولتك؟',
     'كت تويت ‏| كلمة للصُداع؟',
     'كت تويت ‏| ما الشيء الذي يُفارقك؟',
     'كت تويت | موقف مميز فعلته مع شخص ولا يزال يذكره لك؟',
     'كت تويت ‏| أيهما ينتصر، الكبرياء أم الحب؟',
     'كت تويت | بعد ١٠ سنين ايش بتكون ؟',
     'كت تويت ‏| مِن أغرب وأجمل الأسماء التي مرت عليك؟',
     '‏كت تويت | عمرك شلت مصيبة عن شخص برغبتك ؟',
     'كت تويت | أكثر سؤال وجِّه إليك مؤخرًا؟',
     '‏كت تويت | ما هو الشيء الذي يجعلك تشعر بالخوف؟',
     '‏كت تويت | وش يفسد الصداقة؟',
     '‏كت تويت | شخص لاترفض له طلبا ؟',
     '‏كت تويت | كم مره خسرت شخص تحبه؟.',
     '‏كت تويت | كيف تتعامل مع الاشخاص السلبيين ؟',
     '‏كت تويت | كلمة تشعر بالخجل اذا قيلت لك؟',
     '‏كت تويت | جسمك اكبر من عٌمرك او العكسّ ؟!',
     '‏كت تويت |أقوى كذبة مشت عليك ؟',
     '‏كت تويت | تتأثر بدموع شخص يبكي قدامك قبل تعرف السبب ؟',
     'كت تويت | هل حدث وضحيت من أجل شخصٍ أحببت؟',
     '‏كت تويت | أكثر تطبيق تستخدمه مؤخرًا؟',
     '‏كت تويت | ‏اكثر شي يرضيك اذا زعلت بدون تفكير ؟',
     '‏كت تويت | وش محتاج عشان تكون مبسوط ؟',
     '‏كت تويت | مطلبك الوحيد الحين ؟',
     '‏كت تويت | هل حدث وشعرت بأنك ارتكبت أحد الذنوب أثناء الصيام؟',
]
 
 client.on('message', message => {
   if (message.content.startsWith("@cuttweet")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
   .setThumbnail(message.author.avatarURL)
 .addField('لعبه كت تويت' ,
  `${cuttweet[Math.floor(Math.random() * cuttweet.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});











const secre = [
  "**لو خيروك بين العيش وحدك في جزيرة كبيرة منعزلة مع أكبر درجات الرفاهية وبين العيش في مكان قديم ولكن مع أصدقائك المقربين**.",
  "**لو خيروك بين فقدان ذاكرتك والعيش مع أصدقائك وأقربائك أو بقاء ذاكرتك ولكن العيش وحيد**.",
  "**للو خيروك بين تناول الخضار والفاكهة طوال حياتك أو تناول اللحوم**.",
  "**لو خيروك بين رؤية الأشباح فقط أو سماع صوتها فقط**.",
  "**لو خيروك بين القدرة على سماع أفكار الناس أو القدرة على العودة في الزمن للخلف**.",
  "**لو خيروك بين القدرة على الاختفاء أو القدرة على الطيران**.",
  "**لو خيروك بين أن تعيش 5 دقائق في الماضي أو أن تعيشها في المستقبل**.",
  "**لو خيروك بين 5 ملايين دولار أو 5 ملايين لحظة سعادة حقيقيةا**.",
  "**لو خيروك بين الاعتذار عن خطأ اقترفته أو أن يقدم لك شخص أخطأ في حقق اعتذار**.",
  "**لو خيروك بين الحقد أو المسامحة**.",
  "**لو خيروك بين إنقاذ نفسك أو إنقاذ شخص وقد يعرضك ذلك للأذى**.",
  "**لو خيروك بين أن تعيش في القرن الرابع عشر أو القرن الحالي**.",
  "**لو خيروك بين امتلاك سرعة الفهد أو دهاء الثعلب**.",
  "**لو خيروك بين أن تحصل على درجة كاملة في كامل اختباراتك القادمة والسابقة أو أن تسافر إلى بلد تحبه**.",
  "**لو خيروك بين العيش بجانب الجبال والحدائق والأشجار أو العيش بجانب البحر**.",
  "**لو خيروك بين تحقيق 3 أمنيات (لا تتعلق بأشخاص) أو اختيار 3 أشخاص للعيش معهم طوال حياتك**.",
  "**لو خيروك بين النوم في غابة مظلمة أو على ظهر سفينة في يوم عاصف**.",
  "**لو خيروك بين المال أو الجمال**.",
  "**لو خيروك بين المال أو الذكاء**.",
  "**لو خيروك بين المال أو الصحة**.",
  "**لو خيروك بين الجمال أو الذكاء**.",
  "**لو خيروك بين الذكاء أو الصحة**.",
  "**لو خيروك بين إرسال رسالة صوتية لأمك مدة دقيقة كاملة لا تحتوي إلا على صراخك وخوفك، أو كسر بيضة نيئة على رأسك**.",
]
 
 
 client.on('message', message => {
   if (message.content.startsWith("@لو خيروك")) {
                if(!message.channel.guild) return message.reply('** This command only for servers**');
  var embed = new Discord.RichEmbed()
  .setColor('RANDOM')
 
   .setThumbnail(message.author.avatarURL)
 .addField('لعبه لو خيروك' ,
  `${secre[Math.floor(Math.random() * secre.length)]}`)
  message.channel.sendEmbed(embed);
  console.log('[id] Send By: ' + message.author.username)
    }
});


















client.on('message', message => {
if (message.content.startsWith(prefix + 'help')) { //DiamondCodes - [ X_KillerYT ]
    let pages = [`
***__وصف عن البوت__***
**
:gem:  البوت فيه كثير ميزات حلوة و جميلة
البوت تحت التطوير
**
        ***__General orders__***
**
『@server /يعرض لك معلومات عن السيرفر』
『@server2 / يعرض لك معلومات عن السيرفر ( الكود الثاني ) للمعلومات』
『@id / يعرض لك معلومات عنك』
『@invite / لدعوة البوت الى سيرفرك』
『@support / سيرفر المساعدة』
『@avatar / لرؤية صورة شخص 』
『@report / لرفع شكوى على عضو 』
**
  `
,`
        ***__Admin orders__***
**
『@clear / لحذف الشات 』
『@mc / لقفل الشات  』
『@unmc / لفتح الشات 』
『@bc / لارسال رسالة لجميع اعضاء السيرفر 』
『@kick / لطرد شخص من الدسكورد 』
『@ban / لاعطاء شخص باند من الدسكورد 』
『@mute / لاعطاء شخص ميوت 』
『@unmute / لفك ميوت شخص 』
**
  `
,`
        ***__Games orders__***
**
『@sara7ah /لعبة صراحه 』
『@cuttweet /لعبة كت تويت 』
『@لعبة لو خيروك / لو خيروك』
『@min / لعبة اسئله عن لعبة ماين كرافت/  』
**
   
`]
    let page = 1;
 
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setFooter(`Page ${page} of ${pages.length}`)
    .setDescription(pages[page-1])
 
    message.author.sendEmbed(embed).then(msg => {
 
        msg.react('◀').then( r => {
            msg.react('▶')
 
 
        const backwardsFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
        const forwardsFilter = (reaction, user) => reaction.emoji.name === '▶' && user.id === message.author.id;
 
 
        const backwards = msg.createReactionCollector(backwardsFilter, { time: 2000000});
        const forwards = msg.createReactionCollector(forwardsFilter, { time: 2000000});
 
 
 
        backwards.on('collect', r => {
            if (page === 1) return;
            page--;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        forwards.on('collect', r => {
            if (page === pages.length) return;
     
      page++;
            embed.setDescription(pages[page-1]);
            embed.setFooter(`Page ${page} of ${pages.length}`);
            msg.edit(embed)
        })
        })
    })
    }
});














client.on('message', message => {
                 if (!message.channel.guild) return;
         if(message.content =='@memb')
         var kayan = new Discord.RichEmbed()
         .setThumbnail(message.author.avatarURL)
         .setFooter(message.author.username, message.author.avatarURL)
         .setTitle('🌷| Members info')
         .addBlankField(true)
         .addField('📗| Online',
         `${message.guild.members.filter(m=>m.presence.status == 'online').size}`)
         .addField('📕| DND',`${message.guild.members.filter(m=>m.presence.status == 'dnd').size}`)
         .addField('📙| Idle',`${message.guild.members.filter(m=>m.presence.status == 'idle').size}`)
         .addField('📓| Offline',`${message.guild.members.filter(m=>m.presence.status == 'offline').size}`)
         .addField('➡| Server Members',`${message.guild.memberCount}`)
         message.channel.send(kayan);

       });
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   
	   const pubg = [
     'Fortnite | ما هو اقوي سلاح برائيك ؟',
     'Fortnite | ما هي افضل منطقة تنزل بها برايك ؟',
     'Fortnite | كم عدد فوزاتك ؟',
     'Fortnite | كم هو عدد اكثر قتلات لك ؟ ',
     'Fortnite | كم عدد اصدقائك ؟ ',
     'Fortnite | كم عدد سكناتك ؟ ',
     'Fortnite | من هو افضل لاعب اجنبي حسب رايك ؟ ',
     'Fortnite | من هو افضل لاعب عربي حسب رايك ؟ ',
     'Fortnite | ما هو افضل طور حسب رايك ؟ ',
     'Fortnite | هل انت محترف ام نوب ؟ ',
     'Fortnite | ما هما افضل سلاحين مع بعض حسب رايك ؟ ',
 
 
]
   client.on('message', message => {
       if (message.author.bot) return;
 if (message.content.startsWith('@fortnite')) {
     if(!message.channel.guild) return message.reply('** This command only for servers **');
  var client= new Discord.RichEmbed()
  .setTitle("لعبه اسئله فورت نايت")
  .setColor('#FFA500')
  .setDescription(`${pubg[Math.floor(Math.random() * pubg.length)]}`)
  .setImage("https://cdn.discordapp.com/attachments/497081825492074496/500662255004942346/images.jpg")
                  .setTimestamp()
 
   message.channel.sendEmbed(client);
   message.react("??")
 }
});
	   
	   
	   
	   
	   
	   
	   
	   
	   

  client.on('message', async (message) => {
    if(message.content.startsWith("@تقديم")) {
      await message.channel.send("**مااسمك الحقيقي ؟**").then(e => {
      let filter = m => m.author.id === message.author.id
      let lan = '';
      let md = '';
      let br = '';
      let chaLan = message.channel.awaitMessages(filter, { max: 1, time: 400000, errors: ['time'] })
        .then(collected => {
          lan = collected.first().content
          collected.first().delete()
          e.delete();
          message.channel.send('**ماهو عمرك ؟**').then(m => {
          let chaMd = message.channel.awaitMessages(filter, { max: 1, time: 400000, errors: ['time'] })
            .then(co => {
              md = co.first().content
              co.first().delete()
              m.delete();
              message.channel.send('**ماهو طلبك ؟**').then(ms => {
				  let br = message.channel.awaitMessages(filter, { max: 1, time: 400000, errors: ['time'] })
                .then(col => {
                  br = col.first().content
                  col.first().delete()
                  ms.delete()
                  message.channel.send('جاري التقديم ..').then(b => {
                  setTimeout(() => { 
                    b.edit(`**تم التقديم وسيتم الرد فـ اقرب وقت**`)
                  },2000);
                  var gg = message.guild.channels.find('name', 'rs--zako')
                  if(!gg) return;
                  if(gg) {
                    gg.send({
                        embed : new Discord.RichEmbed()
                        .setDescription(`** الاسم الحقيقي :shield:   :  : \n ${lan}\nالعمر :link: :\n ${md} \n طلبه :microphone2:  :\n ${br} \nتم التقديم بواسطة : <@${message.author.id}> **`)
                        .setFooter(`YourBot`)
                        .setTimestamp()
                      });
                    } 
                  })
                })
              })
            })
          })
        })
      })
    }
  })


  
  
  
  
  






client.on('message', msg => {
  if(msg.content === '@hideall') {
    msg.guild.channels.forEach(c => {
      c.overwritePermissions(msg.guild.id, {
        SEND_MESSAGES: false,
        READ_MESSAGES: false
    });
}); //JakeTOXIC
    msg.reply('**All Channels Have Been Hided** ✅')
  }
});
client.on('message', msg => {
  if(msg.content === '@showall') {
    msg.guild.channels.forEach(c => {
      c.overwritePermissions(msg.guild.id, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
    });
});
    msg.reply('**All Channels Have Been UnHided** ✅')
  }
});







client.on('guildMemberAdd', member=> {
    member.addRole(member.guild.roles.find("name","Members"));
    });



	
	
	
	
	










client.on('message', message => {
    if (message.content === "-serooms") {
    if(!message.channel.guild) return message.channel.send('This Command Only For Servers !')


     message.guild.createChannel('「 O W N E R 」', 'voice')
     message.guild.createChannel('「 C O - L E A D E R 」', 'voice')
     message.guild.createChannel('「ADMINSTRATOR」', 'voice')
     message.guild.createChannel('𖦲₁PARTY | بارتي𖦲', 'voice')
     message.guild.createChannel('𖦲₂PARTY | بارتي𖦲', 'voice')
     message.guild.createChannel('𖦲₂PARTY | بارتي𖦲', 'voice')
     message.guild.createChannel('✬ʝuşτ-1✬', 'voice')
 message.guild.createChannel('✬ʝuşτ-2✬', 'voice')
     message.guild.createChannel('✬ʝuşτ-3✬', 'voice')
     message.guild.createChannel('✬ʝuşτ-4✬', 'voice')
     message.guild.createChannel('✬ʝuşτ-5✬', 'voice')
     message.guild.createChannel('😴sleep', 'voice')
          message.guild.createChannel('༆كَبّـآرَ آلَشّـخٌـصِـيّآتُ༆', 'voice')
     message.guild.createChannel('welcome', 'text')
     message.guild.createChannel('info', 'text')
     message.guild.createChannel('bot', 'text')
     message.guild.createChannel('chat', 'text')
     message.guild.createChannel('Youtube', 'text')
     message.guild.createChannel('bo7', 'text')
     message.guild.createChannel('party', 'text')
     message.guild.createChannel('pic', 'text')


message.channel.sendMessage('الرجاء الانتظار ريث ما يتم صناعة السيرفر')
}
});


















  client.on('message', message=>{
            if(message.content.startsWith("#روم1")) {///n3k4a is one  
            if(!message.channel.guild) return;
                if(message.author.bot) return;
                if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("**تحتاج الى `MANAGE_CHANNELS`**");///n3k4a is one  
                message.guild.createChannel("✽-التقديمات", "text").then(c =>{///n3k4a is one  
                    c.overwritePermissions(message.guild.id, {///n3k4a is one  
                        SEND_MESSAGES: false
 
                          })
                })
    message.channel.send("**✅ تم انشاء روم التقديمات بنجاح**")
            }
            })///n3k4a is one  
    client.on('message',async message => {
  let mention = message.mentions.members.first();///n3k4a is one  
  let role = message.content.split(" ").slice(2).join(" ");///n3k4a is one  
  let mySupport = message.guild.roles.find('name',role);///n3k4a is one  
  if(message.content.startsWith("#قبول")) {
    let acRoom = message.guild.channels.find('name', '✽-قبول-ورفض');
    if(!acRoom) return message.reply("!!setac من فضلك انشاء روم **✽-قبول-ورفض** او اكتب الامر");
    if(acRoom) {///n3k4a is one  
    if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return;
    if(!mention) return message.reply('منشن شخص');///n3k4a is one  
    if(!role) return message.reply('@• Toxic » Support');
    if(!mySupport) return message.reply('هذه الرتبة غير موجودة');
    if(mention.roles.has(mySupport)) return message.reply('هذا الشخص معه الرتبة مسبقا');///n3k4a is one  
 
    mention.addRole(mySupport).then(() => {
      acRoom.send(`**[ ${mySupport} ] واعطائك رتبة ${mention} تم بنجاح قبولك**`);///n3k4a is one  
    });
  }
}
});
client.on('message',async message => {///n3k4a is one  
  let mention = message.mentions.members.first();///n3k4a is one  
  if(message.content.startsWith("#رفض")) {///n3k4a is one  
  if(!message.channel.guild) return;
  let acRoom = message.guild.channels.find('name', '✽-قبول-ورفض');
  if(!acRoom) return message.reply("!!setac من فضلك انشاء روم **✽-قبول-ورفض** او اكتب الامر");
  if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return;
  if(!mention) return message.reply("منشن شخص");
 ///n3k4a is one  
  acRoom.send(`**${mention} تم رفضك للاسف**`)///n3k4a is one  
  }
});
          client.on('message', message=>{
            if(message.content.startsWith("#روم2")) {///n3k4a is one  
         if(!message.channel.guild) return;
                if(message.author.bot) return;
                if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("**تحتاج الى `MANAGE_CHANNELS`**");
                message.guild.createChannel("✽-قبول-ورفض", "text").then(c =>{
                    c.overwritePermissions(message.guild.id, {///n3k4a is one  
                        SEND_MESSAGES: false///n3k4a is one  
 
                          })
                })
    message.channel.send("**✅ تم انشاء روم القبول والرفض بنجاح**")///n3k4a is one  
            }
            }) ///n3k4a is one















const adminprefix = "@";
const devs = ['ايدي2','ايدي1'];
client.on('message', message => {
  var argresult = message.content.split(` `).slice(1).join(' ');
    if (!devs.includes(message.author.id)) return;
    
if (message.content.startsWith(adminprefix + 'بلاي')) {
  client.user.setGame(argresult);
    message.channel.sendMessage(`**${argresult} تم تغيير بلاينق البوت إلى **`)
} else 
  if (message.content.startsWith(adminprefix + 'نيم')) {
client.user.setUsername(argresult).then
    message.channel.sendMessage(`**${argresult}** : تم تغيير أسم البوت إلى`)
return message.reply("**لا يمكنك تغيير الاسم يجب عليك الانتظآر لمدة ساعتين . **");
} else
  if (message.content.startsWith(adminprefix + 'افتار')) {
client.user.setAvatar(argresult);
  message.channel.sendMessage(`**${argresult}** : تم تغير صورة البوت`);
      } else     
if (message.content.startsWith(adminprefix + 'ستريم')) {
  client.user.setGame(argresult, "https://www.twitch.tv/idk");//wennnn
    message.channel.sendMessage(`**تم تغيير تويتش البوت إلى  ${argresult}**`)
}
});
















client.on('message' , message => {
var prefix = "@"

if (message.author.bot) return;
if (message.content.startsWith(prefix + "call")) {
if (!message.channel.guild) return;



let args = message.content.split(" ").slice(1).join(" ");



client.users.get("507533148897411082").send(
    "\n" + "**" + "● السيرفر :" + "**" +
    "\n" + "**" + "» " + message.guild.name + "**" +
    "\n" + "**" + " ● المرسل : " + "**" +
    "\n" + "**" + "» " + message.author.tag + "**" +
    "\n" + "**" + " ● الرسالة : " + "**" +
    "\n" + "**" + args + "**")

let embed = new Discord.RichEmbed()
     .setAuthor(message.author.username, message.author.avatarURL)
     .setDescription('📬 تم ارسال الرسالة الى صاحب البوت بنجاح')
     .setThumbnail(message.author.avatarURL)
     .setFooter("By : n3k4a 😃 ")
                                                

message.channel.send(embed);


}
    
});

















client.on('message', message => {
              if (!message.channel.guild) return;
      if(message.content =='@count')
      var n3k4a = new Discord.RichEmbed()
      .setThumbnail(message.author.avatarURL)
      .setFooter(message.author.username, message.author.avatarURL)
      .setTitle('🌷| Members info')
      .addBlankField(true)
      .addField('عدد اعضاء السيرفر',`${message.guild.memberCount}`)
      message.channel.send(n3k4a );
    });

	
	
	
	
	
	
	
	
	
	
	
	
	client.on('message' , async (message) => {
 if (message.content.startsWith(prefix + 'boob')) {
  const args = message.content.substring(prefix.length).split(' ');

 message.delete();
args.shift() 
let msg = args.join(' ') 
message.channel.createWebhook(message.author.username, message.author.avatarURL) 
    .then(wb => {
        const user = new Discord.WebhookClient(wb.id, wb.token) 
        user.send(msg); 
        user.delete() 
    })
    .catch(console.error)
 }
});


client.login("NTIyNzc0NTgyNjQyMzQzOTQ2.DvQoXg.r8fd8Thb5dnKhFAZuI2DhLkfLXY");