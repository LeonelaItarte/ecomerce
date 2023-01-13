

class ProductsManager{
    constructor() {

        this.productos = [];
        this.id = 0;
    }

    listar(id){

        let contenido = this.productos.filter((elemento) => { return elemento.id == id })


        return contenido

    }

    listarAll(){
        
        return this.productos
      
    }

    guardar(prod){
        if (this.productos.length == 0) {
            prod.id = 1
        } else {

            // tenemos que buscar en que posicion del array esta el ultimo elemento agregado
            const ultimaPosicion =   this.productos.length - 1

            // ahora que tenemos la posicion obtemos el ultimo producto
            const ultimoProducto = this.productos[ultimaPosicion]

            // ahora obtenemos el id de ese pdroducto y le sumamos 1
            const id = ultimoProducto.id + 1

            prod.id = id
        }

        this.productos.push(prod);
        return prod

    }

    actualizar(prod,id){
        let posicion = null
        for(let prod in this.productos){
            if (this.productos[prod].id == id){
                posicion = prod
            } 
        }
        this.productos[posicion] = {...prod}


    //let productoActualizado = this.productos.filter((e) => {e.id == id})
    return this.productos[posicion]

    }

    borrar(id){

        this.productos = this.productos.filter((elemento) => { return elemento.id !== id })

    }
}

export default ProductsManager