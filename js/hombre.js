//? VARIABLES PRODUCTOS //
const seccionHombre = document.querySelector("#seccionHombre");
const listaProductosHombre = listaProductos.filter(producto => producto.categoria == "hombre");

//? VARIABLES CARRITO //
const btnCarrito = document.querySelector("#cart");
const ventanaCarrito = document.querySelector(".ventanaCarrito");
const cerrarCarrito = document.querySelector("#closeBtn");

//? VARIABLES PARA AGREGAR AL CARRITO //
const contenedorProductosCarrito = document.querySelector(".productosCarrito");
const totalCarrito = document.querySelector(".precioTotalCarrito");
const cantidadTotalProductos = document.querySelector(".cantidadCarrito");


//! AGREGAR PRODUCTOS AL HTML //
listaProductosHombre.forEach(producto => {
    seccionHombre.innerHTML += `
        <div class="col-xl-3 col-md-6 col-sm-6 my-2 sectorGaleria">
            <div class="card rounded-0">
                <img src=".${producto.img}" class="card-img-top" alt="${producto.tipo} ${producto.nombre}">
                <div class="card-body">
                    <h2 class="card-title precio">$${producto.precio}</h2>
                    <p class="card-text descripcion">${producto.nombre}</p>
                    <a id="${producto.id}" class="btn botonComprar">Comprar</a>
                </div>
            </div>
        </div>
    `
})


//! ABRIR CARRITO //
btnCarrito.addEventListener("click", () => {
    ventanaCarrito.classList.add("reveal");
})

//! CERRAR CARRITO //
cerrarCarrito.addEventListener("click", () => {
    ventanaCarrito.classList.remove("reveal");
})


//! AGREGAR AL CARRITO //
const agregarAlCarrito = (e) => {
    let boton = e.target;
    let prodId = boton.getAttribute("id");

    let producto = listaProductos.find(prod => prod.id == prodId);
    carrito.push(producto);

    actualizarCarrito();
}

const actualizarCarrito = () => {
    contenedorProductosCarrito.innerHTML = '';
    carrito.forEach(producto => {
        contenedorProductosCarrito.innerHTML += `
            <div class="productoCarrito">
                <img class="imgProductoCarrito" src=".${producto.img}" alt="${producto.tipo} ${producto.nombre}">
                <div>
                    <span class="nombreProductoCarrito">${producto.nombre}</span>
                    <span class="precioProductoCarrito">$${producto.precio}</span>
                </div>
                <div>
                    <input type="number" value="1" class="cantidadProductoCarrrito">
                    <button onclick="eliminarDelCarrito(${producto.id})" class="removeBtn"><i class="bi bi-trash"></i></button>
                </div>
            </div>
        `

        sessionStorage.setItem("carrito", JSON.stringify(carrito));
    })

    actualizarTotalCarrito();
    actualizarCantidadCarrito();
}

//! ACTUALIZAR PRECIO CARRITO //
const actualizarTotalCarrito = () => {
    let total = carrito.reduce((acc, producto) => acc + producto.precio, 0);
    totalCarrito.innerHTML = `$${total}`;
}

//! ACTUALIZAR CANTIDAD DE ELEMENTOS DEL CARRITO //
const actualizarCantidadCarrito = () => {
    cantidadTotalProductos.textContent = carrito.length;
}

//! ELIMINAR PRODUCTO DEL CARRITO //
const eliminarDelCarrito = (prodId) => {
    let producto = carrito.find(prod => prod.id == prodId);
    let indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);

    actualizarCarrito();
        
    if (carrito.length == 0) {
        sessionStorage.clear();
    }
}

//? EJECUTAR AGREGAR PROD CARRITO
const botonesComprar = document.querySelectorAll(".botonComprar");

botonesComprar.forEach(boton => {
    boton.addEventListener("click", agregarAlCarrito);
})


//? CARGAR PRODUCTOS DEL STORAGE
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    actualizarCarrito();
})