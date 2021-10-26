const Discord = require('discord.js');
exports.run = (client, message, args) => {
if(message.author.id !== "383700145822367745") return message.channel.send('**:x: Bu işlem için gerekli izne sahip değilsiniz!**');
    let guild = message.guild
    let user = message.mentions.members.first()

    if (!user) return message.reply('**Kimin Boom Oyun İznini Açayayım.**').catch(console.error);
    user.roles.remove('798476273927716867');
        const embed = new Discord.MessageEmbed()
        .setDescription(`${user} kullanıcısının Boom oyun izni açıldı!`)
        .setColor("RANDOM")
    message.channel.send({ embed })
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['boomizin'],
    permLevel: 0
};

exports.help = {
    name: 'boom-izin',
    description: 'Belirtilen kişinin boom iznini geri açar.',
    usage: '!boomizin @Kişi'
};