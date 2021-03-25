module.exports = (client, message, args, Discord) => {


    const fs = require("fs-extra");
    var colors = require("colors");
    const yaml = require('js-yaml');



    client.on("ready", () => {



        


    try { 
        let instrucciones = yaml.safeLoad(fs.readFileSync('./files/INSTRUCCIONES.yml', 'utf8'))
        let acces = yaml.safeLoad(fs.readFileSync('./files/ACCESS.yml', 'utf8'))
        if(!instrucciones && !acces) return;

    }catch(err){
      
        const leer = ''
        +'\nINSTRUCCIONES DE USO\n\n\n'

        +'PASO 1:\n'
        +' CONFIGURAR EL BOT || ARCHIVO config.yml\n\n'
        +'  NOTAS:\n'
        +'   1) LAS DIRECCIONES DE RUTAS DEBERAN SER ESCRITAS SIN "/" AL FINAL || EJEMPLO -> "/home/discord/Bot"\n'
        +'   2) TODOS LOS NOMBRES DE RANKS DEBERAN SER IGUAL QUE LOS ROLLES EN EL SERVIDOR DISCORD\n'
        +'   3) EL MODO MANTENIMIENTO BLOQUEA EL USO DE COMANDOS\n'
        +'   4) LOS RANGOS DE MANTENIMIENTO DEBEN SER 2, ESTOS TIENEN BYPASS A LOS COMANDOS\n'
        +'   5) LAS BASE DE DATOS SQLITE & MYSQL NO PUEDEN TRABAJAR AL MISMO TIEMPO || SOLO 1 DE ELLAS PUEDE SER "true"\n'
        +'   6) LA VARIABLE "logdatabase" ES PARA ASEGURARSE QUE LA BASE DE DATOS FUE CONECTADA CON EXITO (ACETIVARLO ES OPCIONAL)\n'
        +'   7) LA VARIABLE "RemoverDatos" ES PARA BORRAR LOS DATOS DE USUARIO EN LA BASE DE DATOS\n'
        +'      SIMPRE MOSTRARA LOS DATOS DEFAULT, ESTA PUEDE SER DESACTIVADA SI SE DESEA\n'
        +'   8) LA VARIABLE "ErrorReply" ES PARA CONTESTAR AL USUARIO CON "mensaje_error" DE lang.yml\n'
        +'   9) LOS RANKS STAFF SON PARA LOS COMANDOS "promote" Y "demote", EL MAXIMO ES 5\n'
        +'   10) LOS RANKS VIP SON PARA LOS COMANDOS "promote" Y "demote", EL MAXIMO ES 3\n'
        +'       ESTOS DEBEN LLEVAR EL NOMBRE DEL RANGO DONADOR EN DISCORD\n'

        +'PASO 2:\n'
        +' CONFIGURAR permissions.yml\n\n'
        +'  NOTAS:\n'
        +'   1) TODOS LOS COMANDOS DE ADMIN Y MOD DEBEN SER COLOCADOS\n'
        +'   2) EL MAXIMO DE RANGOS POR PERMISO ES 3\n'
        +'   3) LOS 3 ESPCAIOS DEBEN SER RELLENADOS, EN CASO DE QUE NO TODOS LOS RANGOS TENGAN\n'
        +'      EL PERMISO, REPEIR EL RANGO HASTA COMPLETAR LOS 3 ESPACIOS\n\n'

        +'PASO 3:\n'
        +' CONFIGURAR lang.yml ESTE ES 100% PERSONALIZABLE\n'


        const aceso = {
            WizBot:
            '################################################\n'
            +'################################################\n',
            "INSTRUCCIONES": 'LAS INSTRUCCIONES YA FUERON LEIDAS',
            "ACEPTAR" : false
        }

        let data1 = JSON.stringify(aceso, null, 2);
        let yamlStr = yaml.safeDump(leer);
        let yamlStri = yaml.safeDump(aceso);

        fs.writeFileSync('./files/INSTRUCCIONES.yml', yamlStr,'utf8')
        fs.writeFileSync("./files/ACCESS.yml", yamlStri, 'utf8')

        console.log(colors.bgGreen(`GRACIAS POR INSTALAR`))
        console.log(colors.bgRed('ANTES DE INICIAR EL BOT LEER EL ARCHIVO DE INSTRUCCIONES EN LA CARPETA files'))
        process.exit();
      
    };
      
    let accesso = yaml.safeLoad(fs.readFileSync('./files/ACCESS.yml', 'utf8'));
    const acces_yes = accesso.ACEPTAR
    if(acces_yes == true){
      
    }else{
        console.log(colors.bgRed('DEBES MARCAR COMO "true" EN ACEPTAR DE ACCES.yml'))
        process.exit();
    };

})
}