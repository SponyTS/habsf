const discord = require('discord.js')

	module.exports.run = async (bot, message, args) => {
		if (message.channel.id !== '798476275106316313') return message.channel.send(`:no_entry: Bu komut burda engellenmiştir. <#798476275106316313> kanalında kullanın`)
	var kaccm =[
	"Senin Malafatın **3 CM** :eggplant:",
	"Senin Malafatın **192 CM** :eggplant:",
	"Senin Malafatın yok ki kanka :cry:",
	"Senin Malafatın **-3 CM** :eggplant:",
	"Senin Malafatın **18 CM** :eggplant:",
	"Senin Malafatın **11 CM** :eggplant:",
	"Senin Malafatın **32 CM** :eggplant:",
	"Senin Malafatın **35 CM** :eggplant:",
	"Senin Malafatın **8 CM** :eggplant:",
	"Senin Malafatın **65 CM** :eggplant:",
	"Senin Malafatın **5 CM** :eggplant:",
	"Senin Malafatın **31 CM** :eggplant:",
	"Senin Malafatın **14 CM** :eggplant:",
	"Senin Malafatın **1 CM** :eggplant:",
	"Daha ölçümü bitiremedim\n:eggplant: :eggplant: :eggplant: :eggplant: :eggplant:"
	];
		var kaccm = kaccm[Math.floor(Math.random(1) * kaccm.length)]
	
			const embed  = new discord.MessageEmbed()
				.setColor("RANDOM")
				.setDescription(`${kaccm}`)
				.setAuthor(`(${message.author.username}) Kişisinin Malafatı`)
				
			return message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kaccm', 'kaçcm'],
  permLevel: 0
};

exports.help = {
  name: 'kacsantim',
  description: 'Malafat boyunu ölçer',
  usage: '!kaçcm'
};