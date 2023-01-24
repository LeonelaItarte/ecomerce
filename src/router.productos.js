import ProductsManager from "./productos.js";
import { Router } from "express";



const productsManager = new ProductsManager("productos.txt");

const routerProductos = new Router();


routerProductos.get('/',async(req,res)=>{
    res.send(await productsManager.listarAll())
 })

routerProductos.get('/:id',async(req,res)=>{
  
  let producto = productsManager.listar(req.params.id)
   
  if(producto.length === 0){
    res.status(400).send({error:'error producto no encontrado'})
  }else{
    res.send(await producto)
  }

 })

 routerProductos.post('/',async(req,res)=>{

    let producto = req.body

    producto.precio = parseInt(producto.precio)
   
    const productoResponse = await productsManager.guardar(producto)

    res.send( productoResponse)

 })

 routerProductos.put('/:id',async(req,res)=>{

    let id = req.params.id
    let prod= req.body
   
    res.send(await productsManager.actualizar(id, prod))


 })

 routerProductos.delete('/:id',async(req,res)=>{

    let id = req.params.id

    res.send(await productsManager.deleteById(id))


 })
 export default routerProductos;