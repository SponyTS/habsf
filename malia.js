const Discord = require("discord.js");
const medusa = require("./medusa.json");
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const chalk = require("chalk");
const source = require('gamedig');
const moment = require("moment");
const request = require("request");
const { Client, Util } = require("discord.js");
const fs = require("fs");
const { get } = require('snekfetch');
const CSGO = require("csgo-api") // Import the npm package.
const talkedRecently = new Set(); 

const srv = new CSGO.Server('185.29.121.21', '27015') // Set the IP with port.
let myChannel = '798476274124455939'

var guild = client.guilds.cache.get('798476273927716864')
require("./util/eventLoader")(client);

client.setMaxListeners(30)

var prefix = medusa.prefix;

const log = message => {
  console.log(`${message}`);
};

client.on("ready", async rd => {  
	const aktifmap = await srv.getMap();
	const oyuncusayisi = await srv.getPlayerCount();
	const maxoyuncusayisi = await srv.getMaxPlayers();
	
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("idle");
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ` + client.channels.cache.size + ` adet kanala, ` + client.guilds.cache.size + ` adet sunucuya ve ` + client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
	
	setInterval(() => {
		client.user.setActivity("🗺️ "+ aktifmap +" 👥"+ oyuncusayisi +"/"+ maxoyuncusayisi+"")
	}, 10000)
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === medusa.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!banlazim') {
    msg.reply('sunucuda şüpheli bir oyuncu olduğunu bildirdi.\nSunucuda şüpheli bir oyuncu var <@&840322753579450388> / <@&840322566928728065>').then(msg => msg.delete(({ timeout: 1800000})));
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam Hoşgeldin Nasılsın Umarım iyisindir. :innocent:').then(msg => msg.delete(({ timeout: 5000})));
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ip' && msg.content.toLowerCase() === '!ip') {
    msg.reply('Surf Sunucu IP : 185.193.164.204\nAwp Sunucu IP : YAKINDA!').then(msg => msg.delete(({ timeout: 25000})));
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!site' && msg.content.toLowerCase() === 'site') {
    msg.reply('İnternet Sitemiz : https://vlorion.com/').then(msg => msg.delete(({ timeout: 10000})));
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'grup' && msg.content.toLowerCase() === '!grup') {
    msg.reply('Steam Grubumuz : https://steamcommunity.com/groups/Vlorion').then(msg => msg.delete(({ timeout: 10000})));
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '!öy' && msg.content.toLowerCase() === '!ödeme' && msg.content.toLowerCase() === '!ödemeyöntemleri') {
    msg.reply('Ödeme Yöntemlerini özelden yazdım.').then(msg => msg.delete(({ timeout: 5000})));
    msg.member.send('```------------------------------------------------\nÖdeme Yöntemleri\n------------------------------------------------\nBanka Kartları - İninal - Paycell - PaPara\nMobil Ödeme + 5 TL\nSteam İtem + 10 TL\nSteam/Oyun Hesapları\n------------------------------------------------```')
  }
})

/// LİNK ENGEL ///
client.on("message", async msg => {  
if(msg.content === "https://vlorion.xyz/") return;
if(msg.content === "https://vlorion.xyz/sunucular/") return;
if(msg.content === "surf.vlorion.xyz") return;
if(msg.content === "discord.gg/fwW5HCMj6t") return;
if(msg.content === "http://discord.gg/fwW5HCMj6t") return;
if(msg.content === "https://discord.gg/fwW5HCMj6t") return;
if(msg.content === "https://discord.com/invite/fwW5HCMj6t") return;

  const kufur = ["discord.gg", ".gg/", ".gg /", ". gg /", ". gg/", "discord .gg /", "discord.gg /", "discord .gg/", "discord .gg", "discord . gg", "discord. gg", "discord gg", "discordgg", "discord gg /", ".com", ". com"];
    if (kufur.some(word => msg.content.includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();
                          
          return msg.reply('Bu Sunucuda Link Filtresi Aktiftir.').then(msg => msg.delete(({ timeout: 10000})));
        }              
      } catch(err) {
        console.log(err);
      }
    }
});
/// LİNK ENGEL ///

/// OTOROL ///
client.on("guildMemberAdd", (member) => {
    member.roles.add('798476273927716865')
});
/// OTOROL ///

/// OTOMESAJ ///
client.on("guildMemberAdd", (member) => {
    member.send('Sunucumuza Hoşgeldin\nSurf Sunucu IP : 185.193.164.204 / surf.vlorion.xyz \nSteam Grubumuz : https://steamcommunity.com/groups/Vlorion\nWeb Sitemiz : https://vlorion.xyz/')
});
/// OTOMESAJ ///

/// HG MESAJI GELİSMİS ///
client.on('guildMemberAdd', async member => {
moment.locale('tr');
  const hesaptarih = moment(member.user.createdAt).format('DD/MM/YYYY')
  member.guild.channels.cache.get("798476274124455937").send(" <a:alo:798476337408245780> Vlorion CS:GO Sunucularına Hoş geldin <@" + member.id + "> \n<a:alarm:798476335873261628> Hesabın oluşturulma tarihi ** "+ hesaptarih +" **\n\nEn kısa sürede <@&798481847981047838> seninle ilgilenecektir.");
});
/// HG MESAJI GELİSMİS ///

/// OTOMATİK MESAJ ///
setInterval(() => {
  client.channels.cache.get("798476274744950806").send("CS:GO Sunucumuzun IP'si: 185.193.164.204 / surf.vlorion.xyz\nTıkla Bağlan: steam://connect/185.193.164.204:27015")
}, 43200000)
/// OTOMATİK MESAJ ///

/////////////////////////////////////////
client.login(medusa.token);