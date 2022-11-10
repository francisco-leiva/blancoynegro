// variables carrito
let carrito = [];
const carritoVacio = document.querySelector(".carritoVacio");
const contenedorProductosCarrito = document.querySelector("#productosCarrito");
const finalizarCompra = document.querySelector(".finalizarCompra");
const precioTotal = document.querySelector(".precioTotalCarrito");
const botonFinalizarCompra = document.querySelector(".botonFinalizarCompra");

// cargar productos del storage
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length != 0) {
        carritoVacio.classList.add("hidden");
        contenedorProductosCarrito.classList.remove("hidden");
        finalizarCompra.classList.remove("hidden");

        actualizarCarrito();
    }
})

// agregar los productos al carrito
const actualizarCarrito = () => {
    contenedorProductosCarrito.innerHTML = '';
    carrito.forEach(producto => {
        contenedorProductosCarrito.innerHTML += `
            <div class="producto">
                <img class="imgProductoCarrito" src=".${producto.img}" alt="${producto.tipo} ${producto.nombre}">
                <span class="nombreProductoCarrito">${producto.tipo} ${producto.nombre}</span>
                <span class="precioProductoCarrito">$${producto.precio * producto.cantidad}</span>
                <span class="cantidadProductoCarrito">Cantidad: ${producto.cantidad}</span>
                <button onclick="eliminarDelCarrito(${producto.id})" class="removeBtn"><i class="bi bi-trash"></i></button>
            </div>
        `
    })

    actualizarTotalCarrito();
}

// suma total de precios de los productos del carrito
const actualizarTotalCarrito = () => {
    let total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    precioTotal.innerHTML = `$${total}`;
}


// eliminar un producto del carrito
const eliminarDelCarrito = (prodId) => {
    let producto = carrito.find(prod => prod.id == prodId);

    let indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);

    Toastify({
        text: "El producto fue eliminado del carrito",
        duration: 3000,
        style: {
            color: "black",
            background: "red",
        }
    }).showToast();

    actualizarCarrito();

    if (carrito.length == 0) {
        carritoVacio.classList.remove("hidden");
        contenedorProductosCarrito.classList.add("hidden");
        finalizarCompra.classList.add("hidden");
        localStorage.clear();
    }
}

// finalizar compra
botonFinalizarCompra.addEventListener("click", () => {
    Swal.fire(
        'Compra realizada con éxito!',
        'Gracias por elegirnos!',
        'success'
    );
    localStorage.clear();
    carrito = [];
    
    carritoVacio.classList.remove("hidden");
    contenedorProductosCarrito.classList.add("hidden");
    finalizarCompra.classList.add("hidden");
})