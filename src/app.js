import express from 'express';
import routerProductos from './router.productos.js';
import routerCarrito from './router.carrito.js';
import cors from "cors"


const app = express()

app.use(express.static('public'))
//middleware
app.use(express.json())
app.use(cors({credentials:true, origin: true}))
app.use(express.urlencoded({extended: true}))

let administrador =true;

//ruta raiz
app.use('/productos',routerProductos)

app.use('/carrito',routerCarrito)

app.listen(8080,()=>{

    console.log('listening on port 8080')
})