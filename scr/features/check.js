module.exports = async (client, message, args, Discord) => {

    var colors = require("colors");
    const rango = require("../utils/range")


    const fs = require('fs-extra');
    const yaml = require('js-yaml');
    let config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
    const canalbot = config.channelsIDS.botchannel
    const prefijo = config.prefix

    client.on("message", (message) =>{

        if(message.channel.id !== `${canalbot}`){
            return;
        }else{

            if(message.attachments.size > 0) {
                message.attachments.forEach(Attachment => {

                    //EJECUTA EL METODO RANGO DE LA CARPETA utils                    
                    //REVISA SI TIENE LAS MEDIDAS CORRECTAS
                    rango(client, message, Attachment)

                    //EJECUTA EL METODO RANGO DE LA CARPETA utils                    
                    //REVISA SI TIENE EL COLOR CORRETO

                })

            }else{
                //MODO SEGURO
                //SI ES UN COMANDO REGRESA
                if(message.content.startsWith(`${prefijo}`)){return}

            }
        }

    })
}



//MANDAR ESTO A COMANDO

/* const probe = require('probe-image-size');
let result = await probe(`${Attachment.url}`)
console.log(result) */