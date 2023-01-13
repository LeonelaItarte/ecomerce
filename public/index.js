const getProductos = async () =>{

  const response  = await fetch("http://localhost:8080/productos")
  const productos = await response.json()
  console.log(productos)
}

getProductos()

const guardarProducto = async (e) =>{

  const options = {
    method: 'POST',
    headers: { accept: 'application/json' },
    body: JSON.stringify({
      nombre: document.getElementById("nombreInput").value,
      precio : document.getElementById("precioInput").value,
      foto: document.getElementById("fotoInput").value,
    })
  };
  const response = await fetch("http://localhost:8080/productos",options )
  //getProductos()
}

function product(){
    const html= listaProductos.map(producto=>{
      return(`<div class=producto-pincipal><div class='producto'>${producto.nombre}</div><div class='producto'>${producto.precio}</div><div class='producto-img'><img src='${producto.foto}'></div></div>`)
    }).join(' ')
  
    document.getElementById('producto').innerHTML=html
}
product()
