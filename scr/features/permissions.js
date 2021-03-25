module.exports = (client, message, args, Discord) => {


    const fs = require("fs-extra");
    var colors = require("colors");
    const yaml = require('js-yaml');

    try { 

        let permissions = yaml.safeLoad(fs.readFileSync('./files/permissions.yml', 'utf8'))
        
        if(!permissions) return

    }catch(err){
      
      
        const datos = {
            permisos: {
                admin:["ADMIN", "MOD+", "MOD+"],
                config:["ADMIN", "MOD+", "MOD+"],
                demote:["ADMIN", "MOD+", "MOD+"],
                image:["ADMIN", "MOD+", "MOD+"],
                promote:["ADMIN", "MOD+", "MOD+"],
                reload:["ADMIN", "MOD+", "MOD+"],
                res:["ADMIN", "MOD+", "MOD+"],
                sqlshow:["ADMIN", "MOD+", "MOD+"],
                status:["ADMIN", "MOD+", "MOD+"],
                stop:["ADMIN", "MOD+", "MOD"],
                ban:["ADMIN", "MOD+", "MOD+"],
                clear:["ADMIN", "MOD+", "MOD+"],
                kick:["ADMIN", "MOD+", "MOD+"],
                mute:["ADMIN", "MOD+", "MOD+"],
                unban:["ADMIN", "MOD+", "MOD+"],
                unban: ["RANK1", "RANK2", "RANK3"]
            }
        };
      
      
      
        let yamlStr = yaml.safeDump(datos);
        fs.writeFileSync('./files/permissions.yml', yamlStr,'utf8')
      
        console.log(colors.bgRed("[ERROR] NO HAY PERMISOS CONFIGURADOS || CREANDO PERMISOS DEAFULT"))
        process.exit();
      
    };






}