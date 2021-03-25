module.exports = async (client, message, args, Discord) => {

    var colors = require("colors");
    const probe = require('probe-image-size');


    client.on("message", (message) =>{


        if (message.attachments.size > 0) {
            message.attachments.forEach(Attachment => {

                console.log(colors.bgGreen(`[INFO]: IMAGEN ENVIADA POR ${message.author.tag}`) + colors.yellow(` >> Url: ${Attachment.url}`))
                message.reply(` tu imagen es: ${Attachment.url}`)
 
                let result = probe(`${Attachment.url}`)
                console.log(result)
              


            })
        } else {
            //console.log(`\nCHATLOGS - [${message.guild}] ${message.author.tag}: ${message.content}`);
            return;
        }





    })
}