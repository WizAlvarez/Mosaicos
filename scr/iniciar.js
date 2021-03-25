 /////////////////////
//   DEPENDENCIAS   //
/////////////////////


const {Collection} = require('discord.js')
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs-extra");
var colors = require("colors");
const yaml = require('js-yaml');
const timestamp = require('time-stamp');
const { config, features } = require('process');
const { ifError } = require('assert');
const { callbackify } = require('util');
require('dotenv').config()





//ERRORES
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));

 



////////////////////
//   K GLOBALES   //
///////////////////

const bot = process.env.token
client.login(bot)






////////////////////////
//   CONFIG & FILES   //
///////////////////////




try { //CONFIG

  let archivoconfigbot = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
  

  if(!archivoconfigbot) return
}
catch(err){

  const fs = require("fs-extra");
  const yaml = require('js-yaml');


  let datos = {
      prefix: "!",
      monitoreo: true,
      mantenimiento: true,
      ranks_mantenimiento: ["ADMIN", "MOD+"],
      ErrorReply: false,
      main_path: "./",
      database_path: "./database",
      sqlite: false,
      MySQL: {
          enable: false,
          host: "01.01.01.01",
          port: 3306,
          user: "USER",
          password: "PASSWORD"
      },
      logdatabase: false,
      RemoverDatos: false
  };


  let yamlStr = yaml.safeDump(datos);
  fs.writeFileSync('config.yml', yamlStr, 'utf8');

  console.log(colors.bgRed("[ERROR] NO HAY ARCHIVO DE CONFIGURACION || CREANDO EL DEAFULT"))
  process.exit();

};


try { //LANG

  let lang = yaml.safeLoad(fs.readFileSync('./files/lang.yml', 'utf8'))
  
  if(!lang) return

}catch(err){


  let datos = {    
      lang: {
          mensaje_mantenimiento: " Actualmente me encuentro en mantenimiento, intenta mas tarde.",
          mensaje_nopermisos: " no tienes acceso para usar este comando.",
          mensaje_error: " ese comando no existe o esta mal escrito."
      }
  };



  let yamlStr = yaml.safeDump(datos);
  fs.writeFileSync('./files/lang.yml', yamlStr,'utf8')

  console.log(colors.bgRed("[ERROR] NO HAY ARCHIVO LANG || CREANDO EL DEAFULT"))
  process.exit();

};


try {//PERMS

  let permissions = yaml.safeLoad(fs.readFileSync('./files/permissions.yml', 'utf8'))
  
  if(!permissions) return

}catch(err){


  const datos = {
      permisos: {
          admin:["ADMIN", "MOD+", "MOD+"],
          sqlshow:["ADMIN", "MOD+", "MOD+"],
          stop:["ADMIN", "MOD+", "MOD"],
          clear:["ADMIN", "MOD+", "MOD+"]
      }
  };



  let yamlStr = yaml.safeDump(datos);
  fs.writeFileSync('./files/permissions.yml', yamlStr,'utf8')

  console.log(colors.bgRed("[ERROR] NO HAY PERMISOS CONFIGURADOS || CREANDO PERMISOS DEAFULT"))
  process.exit();

};







//COMANDOS

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 







//////////////
//   YAML   //
//////////////

let configbot = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
let langs = yaml.safeLoad(fs.readFileSync('./files/lang.yml', 'utf8'));
const prefijo = configbot.prefix
const MANT_STATUS = configbot.mantenimiento
const ERR_CMD = configbot.ErrorReply
const MANT_MSG = langs.lang.mensaje_mantenimiento
const ERR_MSG = langs.lang.mensaje_error
const REMDATA = configbot.RemoverDatos
const SQLITE = configbot.sqlite
const MYSQL = configbot.MySQL.enable
const SQL_HOST = configbot.MySQL.host
const SQL_USER = configbot.MySQL.user
const ROLL_MANT0 = configbot.ranks_mantenimiento[0]
const ROLL_MANT1 = configbot.ranks_mantenimiento[1]
const monitor = configbot.monitoreo


if(monitor == true){

  //MS EN CONSOLA
  client.on("debug", (e) => console.info(e))
}






//////////////////
//   FEATURES   //
//////////////////


fs.readdir('./features/', (err, files) => {
  if (err) console.log(err);
  console.log(colors.bgCyan("[INFO]: CARGANDO FEATURES"))
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
      let features = require(`./features/${file}`);
      console.log(colors.cyan("        -> " + file + " cargado correctamente"))
      features(client)
  });
});







///////////////////////
//   MANTENIMIENTO   //
///////////////////////
if(MANT_STATUS == true){

  client.on("ready",() => {

/*     client.user.setPresence({
      status: "dnd", //online/idle/dnd/invisible para stream: stream, (url)
      activity: {
          name: "MANTENIMIENTO",
          type: "STREAMING",
          url: "https://www.twitch.tv/Ti2Core"
      }
    }); */
    client.user.setPresence({
      status: "dnd", //online/idle/dnd/invisible para stream: stream, (url)
      activity: {
          name: "MANTENIMIENTO",
          type: "PLAYING"
      }
    });
    console.log(colors.bgYellow(`[INFO]: INICIO EXITOSO  ||  ${client.user.tag} ENCENDIDO EN MODO MANTENIMIENTO`))


    //ASEGURAR QUE ESTE CONECTADO A BASE DE DATOS
    if(
      (SQLITE == true && MYSQL == false) ||
      (SQLITE == false && MYSQL == true)    ){
        //console.log(colors.green("[INFO]: CONFIGURACION DE BASE DE DATOS CORRECTA"))
        console.log(colors.yellow(`[INFO]: RECUERDA QUE SOLO ADMINISTRADORES PODRAN USAR LOS COMANDOS DE ${client.user.tag}`))
          
    }else{
          console.log(colors.bgRed("[ERROR] NO SE PUEDE CONECTAR A LA BASE DE DATOS || REVISA config.yml"))
          process.exit()}


  })

  
  client.on("message", message => {
    if (message.author === client.user) return; //SI EL BOT MANDA EL COMANDO NO SE CICLA
    if(message.content.indexOf(prefijo) !== 0) return;

    //MODO ADMIN
    if(   message.member.roles.cache.some(role => role.name === (`${ROLL_MANT0}`, `${ROLL_MANT1}`))       ){
    //if(   (message.author.id == bot.ownerID1 || (message.author.id == bot.ownerID2))    ){

      const args = message.content.slice(prefijo.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      if(cmd.length == 0 ) return;

      try {
        let command = client.commands.get(cmd) 
        if(!command) command = client.commands.get(client.aliases.get(cmd));
        if(command) command.run(client, message, args)

        console.log(colors.cyan(timestamp('[HH:mm:ss] ') + "[INFO]: " + message.author.tag + " ejecuto el comando: " + prefijo + cmd + " " + args));

      }catch (err) {
        console.log("[ERROR]: '" + cmd + "' no es un comando.");
        console.error("[ERROR]: " + err.message);
        if(ERR_CMD == true){
          console.log(colors.red(timestamp('[HH:mm:ss] ') + "[ERROR]: " + message.author.tag + " ejecuto un comando que no existe")),
          message.reply(`${ERR_MSG}`)
          .then(message => message.delete({timeout: 3000}))
          .catch(err)
          }
      }

    }else{ //ACCESO DENEGADO POR MODO MANTENIMIENTO
      message.reply(MANT_MSG)
      .then(message => message.delete({timeout: 5000}))
      return;}



  })

}else{

  client.on("ready", () => {

    //JUGANDO A
    client.user.setPresence({
      status: "online", //online/idle/dnd/invisible para stream: stream, (url)
      activity: {
          name: ">help",
          type: "PLAYING"
      }
    });
  

    //ASEGURAR QUE ESTE CONECTADO A BASE DE DATOS
    if(
      (SQLITE == true && MYSQL == false) ||
      (SQLITE == false && MYSQL == true)
      
    ){
      console.log(colors.green("[INFO]: CONFIGURACION DE BASE DE DATOS CORRECTA")) 
      console.log(colors.bgGreen(`[INFO]: INICIO EXITOSO  ||  ${client.user.tag} ENCENDIDO Y LISTO PARA USARSE`));
      
    }else{
      console.log(colors.bgRed("[ERROR] NO SE PUEDE CONECTAR A LA BASE DE DATOS || REVISA configuracion.json"))
      
      process.exit()}})

    

  client.on("message", message => {
    if (message.author === client.user) return; //SI EL BOT MANDA EL COMANDO NO SE CICLA
    if(message.content.indexOf(prefijo) !== 0) return;
   

    const args = message.content.slice(prefijo.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;

    try {
      let command = client.commands.get(cmd) 
      if(!command) command = client.commands.get(client.aliases.get(cmd));
      if(command) command.run(client, message, args)

      console.log(colors.cyan(timestamp('[HH:mm:ss] ') + "[INFO]: " + message.author.tag + " ejecuto el comando: " + prefijo + cmd + " " + args));

    }catch (err) {
      console.log("[ERROR]: '" + cmd + "' no es un comando.");
      console.error("[ERROR]: " + err.message);
      if(ERR_CMD == true){
        console.log(colors.red(timestamp('[HH:mm:ss] ') + "[ERROR]: " + message.author.tag + " ejecuto un comando que no existe")),
        message.reply(`${ERR_MSG}`)
        .then(message => message.delete({timeout: 3000}))
        .catch(err)
        }
    }
  });

}



/////////////////
//   EVENTOS   //
/////////////////


fs.readdir('./events/', (err, files) => {
  if (err) console.log(err);
  console.log(colors.bgYellow("[INFO]: CARGANDO EVENTOS"))
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
      let events = require(`./events/${file}`);
      console.log(colors.yellow("[INFO]: Evento " + file + " cargado"))
      let eventName = file.split(".")[0];
      client.on(eventName, events.bind(null, client));
  });
});






client.emit("RESUMED", (
  
  
  console.log(colors.bgBlue("EMIT"))
))  


 
