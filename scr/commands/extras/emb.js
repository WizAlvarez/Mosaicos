exports.run = (client, message, args, Discord) => {


    //QUIEN PUEDE USAR EL COMANDO
    const config = require('../bot.json');
    if(message.author.id !== config.ownerID1) return message.reply("No tienes acceso para usar este comando!")


	const embed = new Discord.MessageEmbed() 
	
    .setTitle("Este es su título, puede contener 256 caracteres")
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor(0x00AE86)
    .setDescription("Este es el cuerpo principal del texto, puede contener 2048 caracteres.")
    .setFooter("Pie de página, puede contener 2048 caracteres", client.user.avatarURL())
    .setImage(message.author.avatarURL())
    .setThumbnail(message.author.avatarURL())
    .setURL("https://portalmybot.com/guia/mybot")
    .addField("Este es un título de campo, puede contener 256 caracteres",
      "Este es un valor de campo, puede contener 2048 caracteres.")
    .addField("Campo en línea", "Debajo del campo en línea", true)
    .addField("Campo en línea 3", "Puede tener un máximo de 25 campos.", true);
    
    message.channel.send(embed);




//FINAL DE CODIGO    
};