import { Router } from "express";
import Carrito from "./carrito.js";

import * as fs from 'fs';
import ProductsManager from "./productos.js";

const routerCarrito = new Router();

const carritos= new Carrito();

let listaCarritos = [];

//crea un carrito
routerCarrito.post('/',(req,res)=>{
 
    
    const contenido = JSON.stringify(listaCarritos, null, '\t')

    fs.writeFile('carrito.txt',contenido,error=>{
    if(error){console.log('hubo un error')}
    else{
      console.log('guardado')
    }
   })

   const carrito = new Carrito(listaCarritos.length)
    listaCarritos.push(carrito)
   

  const contenido2 = JSON.stringify(listaCarritos, null, '\t');

  fs.writeFile('carrito.txt',contenido2,error=>{
    if(error){console.log('hubo un error')}
    else{
      console.log('guardado')
    }
   })

res.send(listaCarritos)

})


routerCarrito.post('/:id/productos', async (req,res)=>{

    let id = req.params.id

    let prod= req.body

    const data = JSON.parse(await fs.promises.readFile("carrito.txt"));

    const prodManager = new ProductsManager("productos.txt")

    const producto = await prodManager.listar(prod.id)
    
   data.map(carrito=>{
    if(carrito.id == id){
      carrito.productos.push(producto)
      console.log("Entr ")
    }
   })

   const contenido2 = JSON.stringify(data, null, '\t');

  fs.writeFile('carrito.txt',contenido2,error=>{
    if(error){console.log('hubo un error')}
    else{
      console.log('guardado')
    }
   })
   res.send(data)
  
})


routerCarrito.get('/:id/productos',async(req,res)=>{
    let id = req.params.id

  const data = JSON.parse(await fs.promises.readFile("carrito.txt"));

   let carrito =await  data.find(carrito=>carrito.id == id)

    res.send(carrito.productos)
  
   })

   
  routerCarrito.delete('/:id',async(req,res)=>{
    
    let id = req.params.id
  
    let data = JSON.parse(await fs.promises.readFile("carrito.txt"));

   let carrito = data.filter((elemento) => ( elemento.id != id ))
    
   data = [...carrito]
   
   const contenido2 = JSON.stringify(data, null, '\t');

   fs.writeFile('carrito.txt',contenido2,error=>{
     if(error){console.log('hubo un error')}
     else{
       console.log('guardado')
     }
    })
   res.send(data)

  
   })

   routerCarrito.delete('/:id/productos/:id_prod',async(req,res)=>{
   
    let id = req.params.id;

    let id_prod= req.params.id_prod;

    let data = JSON.parse(await fs.promises.readFile("carrito.txt"));

   data.map(carrito=>{
    if(carrito.id == id){
      console.log("asd",carrito.productos)
      let listaSinProducto =carrito.productos.filter((prod) => ( prod.id != id_prod ))
      carrito.productos = [...listaSinProducto]
     
    }
   })

   const contenido2 = JSON.stringify(data, null, '\t');

   fs.writeFile('carrito.txt',contenido2,error=>{
     if(error){console.log('hubo un error')}
     else{
       console.log('guardado')
     }
    })

    res.send(data)
   

  
   })
export default routerCarrito