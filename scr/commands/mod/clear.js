const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");


//QUIEN PUEDE USAR EL COMANDO || MODO YML
const fs = require('fs');
const yaml = require('js-yaml');
  
let configbot = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
let perms = yaml.safeLoad(fs.readFileSync('./files/permissions.yml', 'utf8'));
let langs = yaml.safeLoad(fs.readFileSync('./files/lang.yml', 'utf8'));

const prefijo = configbot.prefix
const ERR_REPLY = configbot.ErrorReply
const NOPERMS_MSG = langs.lang.mensaje_nopermisos
const CLEAR0 = perms.permisos.clear[0]
const CLEAR1 = perms.permisos.clear[1]
const CLEAR2 = perms.permisos.clear[2]

module.exports = {
  name: "clear",
  aliases : ['limpiar', 'borrar'],
  description: "Elimina una cantidad de mensajes.",
  run: async (client, message, args, Discord) => {

    message.delete();

    if(!message.member.roles.cache.some(role => role.name === (`${CLEAR0}`, `${CLEAR1}`, `${CLEAR2}`)  )){
      if(ERR_REPLY == true){
        return message.reply(NOPERMS_MSG)
        .then( message => {
          message.delete({timeout: 3000})
        })
      }else{
        return;}
    }


   
    if(!args) return message.channel.send('Escriba la cantidad de mensajes a eliminar');
    let cantidad = parseInt(args[0])
      
    if(!cantidad || isNaN(cantidad)){
      cantidad = 1
      //return message.reply('Introduce un numero por favor') 
    } 
      
    if(cantidad > 99){

      cantidad = 99

      message.channel.send('El maximo de mensajes que puedo borrar es 99, por lo tanto lo establecere automaticamente ahi')
        .then( message => {
          message.delete({timeout: 2500})
      })

    }
    
    message.channel.bulkDelete(cantidad + 1)
    .then(() => {
      message.channel.send(`Listo, borre los ${cantidad} mensajes :ok_hand:`)
      .then(m => {m.delete({ timeout: 3000 })})

    })
    .catch((err) => {
      message.channel.send("Ocurrio un error y no pude borrar los mensajes"),
      console.log(err)}
    );
        

      


  }
}