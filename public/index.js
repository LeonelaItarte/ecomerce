const getProductos = async () =>{

  const response  = await fetch("http://localhost:8080/productos")
  const productos = await response.json()

  const html= productos.map(producto=>{
    return(`<div class=producto-pincipal><div class='producto'>${producto.nombre}</div><div class='producto'>${producto.precio}</div><div class='producto-img'><img src='${producto.foto}'></div></div>`)
  }).join(' ')

  document.getElementById('producto').innerHTML=html
}

formulario = document.getElementById("formulario")
formulario.addEventListener("submit", (e) => {guardarProducto(e)})

getProductos()

const guardarProducto = async (e) =>{
e.preventDefault()
  const options = {
    method: 'POST',
    headers: {  "Content-Type": 'application/json' },
    body: JSON.stringify({
      nombre: document.getElementById("nombreInput").value,
      precio : document.getElementById("precioInput").value,
      foto: document.getElementById("fotoInput").value,
    })
  };
  const response = await fetch("http://localhost:8080/productos",options )
  getProductos()
}


