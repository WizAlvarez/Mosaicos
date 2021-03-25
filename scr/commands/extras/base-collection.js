const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");


//QUIEN PUEDE USAR EL COMANDO || MODO YML
const fs = require('fs');
const yaml = require('js-yaml');
  
/* let configbot = yaml.safeLoad(fs.readFileSync('./config.yml', 'utf8'));
let perms = yaml.safeLoad(fs.readFileSync('./files/permissions.yml', 'utf8'));
let langs = yaml.safeLoad(fs.readFileSync('./files/lang.yml', 'utf8'));

const prefijo = configbot.prefix
const ERR_REPLY = langs.ErrorReply
const NOPERMS_MSG = langs.lang.mensaje_nopermisos
const ADMIN0 = perms.permisos.admin[0];
 */
module.exports = {
  name: "help",
  aliases : ['ayuda'],
  description: "Muestra los comandos disponibles del bot.",
  run: async (client, message, args, Discord) => {


    //if(message.author.id !== botconfig.ownerID1) return message.reply("No tienes acceso para usar este comando!")

    if(!message.member.roles.cache.some(role => role.name === (`${ADMIN0}`, `${ADMIN1}`, `${ADMIN2}`)  )){
      if(ERR_REPLY == true){
        return message.reply(NOPERMS_MSG)
        .then( message => {
          message.delete({timeout: 3000})
        })
      }else{
        return;}
      }



    //CODIGO




  }
}