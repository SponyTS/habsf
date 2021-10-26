const Discord = require("discord.js");
const moment = require("moment");
const os = require('os');
require("moment-duration-format");

module.exports.run = async (client, message) => {
if (message.channel.id !== '798476275106316312') return message.channel.send(`:no_entry: Bu komut burda engellenmiştir. <#798476275106316312> kanalında kullanın`)
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  message.channel.send(`= İstatistikler =
⭐ Discord.JS       :: v${Discord.version}
⭐ Node.JS          :: v14.15.0
⭐ İşletim Sistemi  :: Windows Server 2016
⭐ Bellek kullanımı :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
⭐ Kullanıcılar     :: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
⭐ Sunucular        :: ${client.guilds.cache.size.toLocaleString()}
⭐ Kanallar         :: ${client.channels.cache.size.toLocaleString()}
⭐ CPU              :: AMD Ryzen 3 2300X @ 3.50GHz
⭐ Ping             :: ${client.ws.ping}`, { code: 'asciidoc' })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["i", "botdurum"],
  permLevel: 0
};

exports.help = {
  name: 'istatistik',
  description: 'Botun istatistik gösterir.',
  usage: '!istatistik'
};