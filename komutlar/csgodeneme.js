const Discord = require('discord.js');
const CSGO = require("csgo-api") // Import the npm package.

module.exports.run = async (client, message, args) => {
	if (message.channel.id !== '798476275106316312') return message.channel.send(`:no_entry: Bu komut burda engellenmiştir. <#798476275106316312> kanalında kullanın`)
   let host = '185.29.121.21';
    let port = 27015;

    const srv = new CSGO.Server(host, port) // Set the IP with port.

	let oyuncusayisi = await srv.getPlayerCount();
	let swadi = await srv.getServerName();
	let maxoyuncusayisi = await srv.getMaxPlayers();
	let map = await srv.getMap();

    let stats = [
      {
        name: 'Server IP',
        value: `\`${host}\``,
        inline: true
      },
      {
        name: 'Oyuncular',
        value: `${oyuncusayisi}/${maxoyuncusayisi}`,
        inline: true
      },
      {
        name: 'Harita',
        value: map
      },
    ];

	stats.push(
        {
          name: 'Katıl',
          value: "steam://connect/185.29.121.21:27015"
        }
      );

    message.channel.send({
      embed: {
        color: 0x4287f5,
        title: swadi,
        description: '[Counter-Strike: Global Offensive](https://store.steampowered.com/app/730/)',
        fields: stats,
      }
    });
};

exports.conf = {
  aliases: ["server", "csgo"],
  enabled: true,
  guildOnly: false,
permLevel: 0
};

exports.help = {
  name: 'sunucu',
  description: 'CS:GO Sunucumuzun bilgilerini gösterir.',
  usage: '!sunucu'
};