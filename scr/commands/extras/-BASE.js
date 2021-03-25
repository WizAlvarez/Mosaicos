module.exports = {
    category: 'Admin',
    name: 'BASE', // Optional
    commands: ['runbase'], // Optional
    aliases: ['base:base'], // Optional
    description: 'Base',
    requiredPermissions: ['ADMINISTRATOR'],
    cooldown: '60s', // s m h d
    minArgs: 0,
    maxArgs: 0, // -1 means no limit
    syntaxError: 'Incorrect syntax! Use `{PREFIX}`ping',
    callback: (client, message, args, Discord) => {


    if(!message.member.roles.cache.some(role => role.name === "DISCORD", "*")) return message.reply("No tienes acceso para usar este comando!");





    }//Cierra callback
  }//Cierra module.exports



  exports.run = (client, message, args, Discord) => {


    //QUIEN PUEDE USAR EL COMANDO || MODO JSON
    const botconfig = require("../../bot.json")
    const config = require('../configuracion.json');
    const permissions = require("../../permissions.json")
    if(message.author.id !== botconfig.ownerID1) return message.reply("No tienes acceso para usar este comando!")

    if(!message.member.roles.cache.some(role => role.name === (permissions.clear[1], permissions.clear[2], permissions.clear[3], permissions.clear[4], permissions.clear[5]   )  )){
      return message.reply(` ${config.mensaje_nopermisos}`)
    }


    //QUIEN PUEDE USAR EL COMANDO || MODO YML
    //const botconfig = require("../../bot.json")
    const fs = require('fs');
    const yaml = require('js-yaml');
  
    let configbot = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
    const prefijo = configbot.prefix
    const MANT_STATUS = configbot.mantenimiento
    const ERR_REPLY = configbot.ErrorReply
    const MANT_MSG = configbot.lang.mensaje_mantenimiento
    const NOPERMS_MSG = configbot.lang.mensaje_nopermisos
    const ERR_MSG = configbot.lang.mensaje_error
    const PATH = configbot.main_path
    let dbruta = configbot.database_path + "/database.sqlite"
    const SQLITE = configbot.sqlite
    const MYSQL = configbot.MySQL.enable
    const SQL_HOST = configbot.MySQL.host
    const SQL_USER = configbot.MySQL.user
    const adminchannel = configbot.channelsIDS.sugchannelID
    const sug_channel = configbot.channelsIDS.logschannelID
    const calabozoID = configbot.channelsIDS.sancioneschannelID
    const REMDATA = configbot.RemoverDatos
    const ROLL = configbot.autorole 
    const ADMIN0 = configbot.permisos.admin[0]
    const BAN0 = configbot.permisos.ban[0]
    const CLEAR0 = configbot.permisos.clear[0]
    const CONFIG0 = configbot.permisos.config[0]
    const DEMOTE0 = configbot.permisos.demote[0]


    if(!message.member.roles.cache.some(role => role.name === (`${ADMIN0}`, `${ADMIN1}`)  )){
      if(ERR_REPLY == true){
        return message.reply(NOPERMS_MSG)
        .then( message => {
          message.delete({timeout: 3000})
        })
      }else{
        return;}
    }


    
    
}; //FINAL DE CODIGO

//if(message.author.id !== botconfig.ownerID1) return message.reply("No tienes acceso para usar este comando!")