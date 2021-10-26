const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	if (message.channel.id !== '798476274124455937') return
	if(!message.member.roles.cache.has("798481847981047838")) return message.channel.send('**:x: Lütfen kayıt etmeleri için yetkilileri bekleyin..**');
	let guild = message.guild
    let user = message.mentions.members.first()

    if (!user) return message.reply('**Kayıt etmek için birini etiketlemen gerekmekte.**').catch(console.error);
    user.roles.add('798476273927716870');
    user.roles.remove('798476273927716865');
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kayit'],
    permLevel: 0
};

exports.help = {
    name: 'kayıt',
    description: 'Yetkililer için kayıt etmek komutu.',
    usage: '!kayıt @kişi'
};