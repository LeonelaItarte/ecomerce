
import * as fs from 'fs';


class ProductsManager {

    constructor(nombreArchivo) {

        this.nombreArchivo = nombreArchivo;
        
    }
    async actualizar(id,prod){
        const productos= await this.listarAll()

        let posicion = null
        for(let prod in productos){
            console.log('prod', productos[prod].id)
            console.log(id)
            if (productos[prod].id == id){
                posicion = prod
                console.log('holaaa')
            } 
        }
     productos[posicion] = {...prod}

        const contenido = JSON.stringify(productos, null, '\t');

       

        await fs.promises.writeFile(this.nombreArchivo, contenido)
    }

    async guardar(obj) {

        try {

            if (!fs.existsSync(this.nombreArchivo)) {
                await fs.promises.writeFile(this.nombreArchivo, '[]')
            };


            const data = JSON.parse(await fs.promises.readFile(this.nombreArchivo));


            if (data.length == 0) {
                obj.id = 1
            } else {
                obj.id = data[data.length - 1].id + 1;
            }

            data.push(obj);

            const contenido = JSON.stringify(data, null, '\t');

            await fs.promises.writeFile(this.nombreArchivo, contenido)

            console.log('funcion save')

            return contenido




        }
        catch (e) {
            console.log(e)
        }



    }

    async listar(id) {

        try {
            const contenido = JSON.parse(await fs.promises.readFile(this.nombreArchivo))

            let contenido1 = contenido.filter((elemento) => { return elemento.id == id })

            return contenido1[0];


        }
        catch (e) {
            console.log(e)
        }

    }

    async listarAll() {

        try {
            const data = await fs.promises.readFile(this.nombreArchivo, 'utf-8')
            let contenido = JSON.parse(data);
           
            return contenido;
        }


        catch (e) {
            console.log(e)
        }


    }

    async deleteById(id) {

        try {

            const contenido = await this.listarAll()

            let contenido1 = contenido.filter((elemento) => { return elemento.id != id })
            console.log(contenido1)

            const contenidoFinal = JSON.stringify(contenido1, null, '\t');

            await  fs.writeFile(this.nombreArchivo, contenidoFinal, error => {
                if (error) {
                    console.log('hubo un error')
                } else {
                    console.log('deleteById guardado')
                }
            })

        }


        catch (e) {
            console.log(e)
        }

    }



    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombreArchivo, '')
            console.log('guardado deleteAll')
        }
        catch (error) {
            console.log(error)
        }
    }



}

export default ProductsManager