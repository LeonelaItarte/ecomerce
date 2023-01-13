import express from 'express';
import routerProductos from './router.productos.js';


//const {Router} = express;

const app = express()

app.use(express.static('public'))
//middleware
app.use(express.json())

app.use(express.urlencoded({extended: true}))


//const routerMascotas = new Router()

//const routerPersonas = new Router()

//configuramos los routes
//Mascotas
//almacenamos en memoria

//const mascotas = [];

//const personas = [];

/*routerMascotas.get('/',(req,res)=>{
    res.json({mascotas: mascotas})
})

routerMascotas.post('/',(req,res)=>{
    console.log('ingresar mascota');
    mascotas.push(req.body)
    res.json('se guardo la mascota')
})


routerPersonas.get('/',(req,res)=>{
    res.json({personas: personas})
})

routerPersonas.post('/',(req,res)=>{
    console.log('ingresar persona');
    personas.push(req.body)
    res.json('se guardo la persona')
})*/




//ruta raiz
app.use('/productos',routerProductos)
//app.use('/carrito',routerCarrito)

//app.use('/mascotas',routerMascotas)

//app.use('/personas',routerPersonas)

app.listen(8080,()=>{

    console.log('listening on port 8080')
})