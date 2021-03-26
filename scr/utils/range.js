/* AL MOMENTO DE ENVIAR UNA IMAGEN SE DETECTA
SI LA IMAGEN TIENE POR NOMBRE Y TIPO DE ARCHIVO "MODELO_IDEAL.jpg" SERA RECHAZADA EN AUTOMATICO
DE LO CONTRARIO REVISARA EL ANCHO Y ALTO PARA PROCESAR */

module.exports = async(client, message, Attachment) => {

    var colors = require("colors");
    const download = require('image-downloader')
    const fs = require("fs-extra");
    const sizeOf = require('image-size')


    console.log(colors.bgGreen(`[INFO]: IMAGEN ENVIADA POR ${message.author.tag}`) + colors.yellow(` >> Url: ${Attachment.url}`))

    const options = {
        url: `${Attachment.url}`,       //'http://someurl.com/image.jpg'
        dest: '../src/files/fotos/',    // will be saved to /path/to/dest/image.jpg
    }

    download.image(options) //LA FOTO ES DESCARGADA
    .then(({ filename }) => {

        console.log(colors.green("IMAGEN GUARDADA EN: "), filename)  // saved to /path/to/dest/photo.jpg

        const foto = filename
        const dimensions = sizeOf(foto)

        setTimeout(() => {
            if(foto){ 
                 //SI LA FOTO CUMPLE CON LOS REQUISITOS => PROCESA
                console.log(colors.yellow("[IMAGEN]: Ancho:" + dimensions.width, " Altura: " + dimensions.height))

                //SI LA FOTO NO ES DE LAS MEDIDAS REGRESA
                if(    (dimensions.width != 250) && (dimensions.height != 250)    ){

                    message.fetch({limit:1}).then(m => m.delete())

                    message.reply(" tu imagen no cumple con las medidas correctas") //OPCIONAL => CREAR EMBED DE RECHAZO PARA QUE SEA MAS ESTETICO
                    .then(m => m.delete({timeout: 3000}))

                    //BORRAR LA FOTO DE LOS ARCHIVOS
                    .then(() => fs.unlinkSync(filename, function(err){
                        if(err) return console.log(err)})
                    )

                    return console.log(colors.red("[INFO]: LA IMAGEN NO CUMPLE CON LAS MEDIDAS CORRECTAS."))
                }else{
                    console.log(colors.green("[INFO]: MEDIAS DE LA IMAGEN CORRECTAS."))
                }
            }    
    
        }, 500)
    })
    .catch((err) => console.error(err))
    




    




}