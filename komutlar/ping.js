const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (client, message) => {
if (message.channel.id !== '798476275106316312' && message.channel.id !== '798476275106316312') return message.channel.send(`:no_entry: Bu komut burda engellenmiştir. <#798476275106316312> kanalında kullanın`)
const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
    message.channel.send(`• Pingim : **${client.ws.ping}** \n• Mesaj Gecikmesi : **${new Date().getTime() - message.createdTimestamp}**`)
    message.channel.send(`• Çalışma Sürem : **${duration}**`)
}

exports.conf = {
    enabled : true,
    guildOnly : false,
    aliases : [''],
    permLevel : 0
}

exports.help = {
    name : 'ping',
    description : 'Botun anlık gecikmelerini gösterir',
    usage : '!ping'
}