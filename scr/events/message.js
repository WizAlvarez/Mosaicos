const { realpathSync } = require("fs")

//Esta función se activara por cada mensaje enviado en un canal por el usuario:
module.exports = (client, message, args) => { 

    var colors = require("colors")
    const fs = require("fs-extra");
    const yaml = require('js-yaml');
    let configbot = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
    const prefijo = configbot.prefix
    let persona = message.author.tag;
    let personaID = message.author.id;
    const ROLL = configbot.autorole



    //GUARDA LOS DATOS DEL USUARIO EN SQL
    let dbruta = configbot.database_path + "/database.sqlite"
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database(dbruta, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);

    let SQLInsertUsurios = `INSERT INTO usuarios(NickDiscord, DiscordID, Roll, Estado, Ban) VALUES('${persona}', '${personaID}', '${ROLL}', 'Activo', 'False')`;
    
    db.run(SQLInsertUsurios, function(err) {
        if (err){ return
        }else{
            console.log(colors.bgGreen(`[INFO]: Los datos de ${persona} fueron guardados en la base de datos`));
        }

    });

    

    






  
  }//FINAL DE CODIGO