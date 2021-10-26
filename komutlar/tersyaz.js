const discord = require('discord.js')

module.exports.run = async (client, message, args) => {
if (message.channel.id !== '798476275106316313') return message.channel.send(`:no_entry: Bu komut burda engellenmiştir. <#798476275106316313> kanalında kullanın`)
  if (args.length < 1) {
    return message.reply('doğru kullanım !ters ')
  }
  await message.channel.send(args.join(' ').split('').reverse().join(''));
};

exports.conf = {
  aliases: [ 'ters' ],
  enabled: true,
  guildOnly: false,
  permLevel: 0
};

exports.help = {
  name: 'tersyaz',
  description: 'Gönderdiğiniz mesajın ters çevrilmiş halini yazar.',
  category: 'Kullanıcı',
  usage: '!tersyaz [yazı]',
};