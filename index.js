const fs = require ('fs')
class Contenedor {
    constructor(rutaArchivo){
        this.rutaArchivo = rutaArchivo        
    }  

    async #leerUnArchivo(){
        try{
        const contenido = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
        const contenidoParseado = JSON.parse(contenido)
        return contenidoParseado
    }catch (err) {
        console.log(err)
    }
    }

    async save(product){
        const contenidoArchivo = await this.#leerUnArchivo()
        if (contenidoArchivo.length !== 0) {
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify ([...contenidoArchivo, {...product, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1 }], 'utf-8'))
        }else {
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([  {...product, id: 1}    ]), 'utf-8')
        }
    }
}

const contenedor = new Contenedor('./data.txt')
contenedor.save({nombre:'producto 1 ', precio: 100})