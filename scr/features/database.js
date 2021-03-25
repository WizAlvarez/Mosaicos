module.exports = (client, message, args, Discord) => {


    var colors = require("colors")
    const fs = require('fs');
    const yaml = require('js-yaml');
    let config = yaml.safeLoad(fs.readFileSync('config.yml', 'utf8'));
    const SQLITE = config.sqlite
    const MYSQL = config.MySQL.enable
    const SQL_HOST = config.MySQL.host
    const SQL_USER = config.MySQL.user
    const REMDATA = config.RemoverDatos
    const LOGDB = config.logdatabase

    client.on("ready",() => {


    
    //ASEGURAR QUE ESTE CONECTADO A BASE DE DATOS
    if( (SQLITE == true && MYSQL == false) || (SQLITE == false && MYSQL == true) ){
        console.log(colors.bgGreen("[DB INFO]: CONFIGURACION DE BASE DE DATOS CORRECTA")) 
        
    }else{
        console.log(colors.bgRed("[DB ERROR] NO SE PUEDE CONECTAR A LA BASE DE DATOS || REVISA config.yml"))
        process.exit()
    }
        
        
        
    //REVISAR EN QUE BASE DE DATOS || USAR SQLITE
    if(SQLITE == true && MYSQL == false){
        
        console.log(colors.yellow("[DB INFO]: INICIANDO CONEXION SQLITE..."));
        let dbruta = config.database_path + "/database.sqlite"
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database(dbruta, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
          
        
        let SQLCreateUsuarios = "CREATE TABLE IF NOT EXISTS usuarios (NickDiscord TEXT NOT NULL, DiscordID TEXT NOT NULL UNIQUE, Roll TEXT NOT NULL, Estado TEXT NOT NULL, Ban TEXT NOT NULL)"


        db.run(SQLCreateUsuarios) // USUARIOS
          

        //////////////
        // USUARIOS //
        //////////////
        let SQLInsertUsurios = "INSERT INTO usuarios(NickDiscord, DiscordID, Roll, Estado, Ban) VALUES('AccesoTotal', 535253806066302977, 'Ti2Core', 'Activo', 'False')"
          
        db.run(SQLInsertUsurios, function(err) {
        if (err) return console.error(err.message)
        });
        
        //MMUESTRA LA TABLA CREADA EN LA CONSOLA
        let SQLSelectAllU = "SELECT * FROM usuarios WHERE DiscordID = 535253806066302977";
        
        db.all(SQLSelectAllU, (err, filasU) => {
        if (err) return console.error(err.message)
        else{

            if(LOGDB == true){
                console.log(filasU)
                console.log(colors.green("[DB INFO]: BASE DE DATOS DE USUARIOS CARGADA"));
            }else{
                console.log(colors.green("[DB INFO]: BASE DE DATOS DE USUARIOS CARGADA"));
            }
        }
        })
        
    }else{

        //REVISAR EN QUE BASE DE DATOS || USAR MYSQL
        if(SQLITE == false && MYSQL == true){
            console.log(colors.yellow("[DB INFO]: INICIANDO CONEXION MySQL..."))
            console.log(colors.bgRed("[DB ERROR]: PRIMERO PROGRAMA LA CONEXION A MySQL ANTES DE QUERER CONECTAR!!!"))
            process.exit();
        }
        
    }


    
    //FINAL DEL CODIGO
    })

}





