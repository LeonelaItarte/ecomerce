import ProductsManager from "./productos.js";
import { Router } from "express";



const productsManager = new ProductsManager();

const routerProductos = new Router();


routerProductos.get('/',(req,res)=>{
    res.send(productsManager.listarAll())
 })

routerProductos.get('/:id',(req,res)=>{
  
  let producto = productsManager.listar(req.params.id)
   
  if(producto.length === 0){
    res.status(400).send({error:'error producto no encontrado'})
  }else{
    res.send(producto)
  }

 })

 routerProductos.post('/',(req,res)=>{

    let producto = req.body
    console.log(producto)

    producto.precio = parseInt(producto.precio)
   
    const productoResponse =  productsManager.guardar(producto)

    res.send(productoResponse)

 })

 routerProductos.put('/:id',(req,res)=>{

    let id = req.params.id

    let prod= req.body
   
    res.send(productsManager.actualizar(prod,id))


 })

 routerProductos.delete('/:id',(req,res)=>{

    let id = req.params.id

    res.send(productsManager.borrar(id))


 })
 export default routerProductos;