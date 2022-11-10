// variables sección productos
const seccionHombre = document.querySelector("#seccionHombre");

// variables carrito
const cantidadProductos = document.querySelector(".cantidadCarrito");

// cargar productos del storage
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    actualizarCantidadCarrito();
})

// agregar productos al html
fetch("../productos.json")
    .then(response => response.json())
    .then(result => {
        const listaProductos = result;
        const listaProductosHombre = listaProductos.filter(producto => producto.categoria == "hombre");

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

        // agregar productos al carrito
        const agregarAlCarrito = (e) => {
            let boton = e.target;
            let prodId = boton.getAttribute("id");

            let productoYaExiste = carrito.some(prod => prod.id == prodId);

            if (productoYaExiste) {
                const prod = carrito.map(prod => {
                    if (prod.id == prodId) {
                        prod.cantidad++
                    }
                })
            } else {
                let producto = listaProductos.find(prod => prod.id == prodId);
                carrito.push(producto);
            }

            actualizarCantidadCarrito();
            localStorage.setItem("carrito", JSON.stringify(carrito));

            Toastify({
                text: "Tu producto se añadió al carrito",
                duration: 3000,
                style: {
                    color: "black",
                    background: "#FFBD59",
                }
            }).showToast();
        }

        // ejecutar agregar productos carrito
        const botonesComprar = document.querySelectorAll(".botonComprar");

        botonesComprar.forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        })
    })

// actualizar cantidad de productos del carrito
const actualizarCantidadCarrito = () => {
    cantidadProductos.textContent = carrito.length;
}