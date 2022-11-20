// variables sección productos
const primerSeccionInicio = document.querySelector("#primerSeccion");
const segundaSeccionInicio = document.querySelector("#segundaSeccion");
const terceraSeccionInicio = document.querySelector("#terceraSeccion");
const seccionHombre = document.querySelector("#seccionHombre");
const seccionMujer = document.querySelector("#seccionMujer");
const primerSeccionNinios = document.querySelector("#primerSeccionNinios");
const segundaSeccionNinios = document.querySelector("#segundaSeccionNinios");

// variables carrito
let carrito = [];
const cantidadProductos = document.querySelector(".cantidadCarrito");
const contenedorCarrito = document.querySelector("#carrito")
const carritoVacio = document.querySelector(".carritoVacio");
const contenedorProductosCarrito = document.querySelector("#productosCarrito");
const finalizarCompra = document.querySelector(".finalizarCompra");
const precioTotal = document.querySelector(".precioTotalCarrito");
const botonFinalizarCompra = document.querySelector(".botonFinalizarCompra");

// cargar productos del storage
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (cantidadProductos) {
        actualizarCantidadCarrito();
    }

    if (contenedorCarrito && carrito.length != 0) {
        carritoVacio.classList.add("hidden");
        contenedorProductosCarrito.classList.remove("hidden");
        finalizarCompra.classList.remove("hidden");

        actualizarCarrito();
    }
})

// agregando productos al html
fetch("../productos.json")
    .then(response => response.json())
    .then(result => {
        // variables listas de productos
        const listaProductos = result;
        const listaProductosHombre = listaProductos.filter(producto => producto.categoria == "hombre");
        const listaProductosMujer = listaProductos.filter(producto => producto.categoria == "mujer");
        const listaProductosNinios = listaProductos.filter(producto => producto.categoria == "niños");

        // variables productos por secciones
        let productosPrimerSeccionInicio = listaProductos.slice(0, 4);
        let productosSegundaSeccionInicio = listaProductos.slice(4, 8);
        let productosTerceraSeccionInicio = listaProductos.slice(8, 12);
        let productosPrimerSeccionNinios = listaProductosNinios.slice(0, 4);
        let productosSegundaSeccionNinios = listaProductosNinios.slice(4, 8);


        if (primerSeccionInicio && segundaSeccionInicio && terceraSeccionInicio) {
            // agregar productos a la primer sección de inicio
            productosPrimerSeccionInicio.forEach(producto => {
                primerSeccionInicio.innerHTML += `
                    <div class="col-xl-3 col-md-6 col-sm-6 my-2 sectorGaleria">
                        <div class="card rounded-0">
                            <img src="${producto.img}" class="card-img-top" alt="${producto.tipo} ${producto.nombre}">
                            <div class="card-body">
                                <h2 class="card-title precio">$${producto.precio}</h2>
                                <p class="card-text descripcion">${producto.nombre}</p>
                                <a id="${producto.id}" class="btn botonComprar">Comprar</a>
                            </div>
                        </div>
                    </div>
                `
            })

            // agregar productos a la segunda sección de inicio
            productosSegundaSeccionInicio.forEach(producto => {
                segundaSeccionInicio.innerHTML += `
                    <div class="col-xl-3 col-md-6 col-sm-6 my-2 sectorGaleria">
                        <div class="card rounded-0">
                            <img src="${producto.img}" class="card-img-top" alt="${producto.tipo} ${producto.nombre}">
                            <div class="card-body">
                                <h2 class="card-title precio">$${producto.precio}</h2>
                                <p class="card-text descripcion">${producto.nombre}</p>
                                <a id="${producto.id}" class="btn botonComprar">Comprar</a>
                            </div>
                        </div>
                    </div>
                `
            })

            // agregar productos a la tercer sección de inicio
            productosTerceraSeccionInicio.forEach(producto => {
                terceraSeccionInicio.innerHTML += `
                    <div class="col-xl-3 col-md-6 col-sm-6 my-2 sectorGaleria">
                        <div class="card rounded-0">
                            <img src="${producto.img}" class="card-img-top" alt="${producto.tipo} ${producto.nombre}">
                            <div class="card-body">
                                <h2 class="card-title precio">$${producto.precio}</h2>
                                <p class="card-text descripcion">${producto.nombre}</p>
                                <a id="${producto.id}" class="btn botonComprar">Comprar</a>
                            </div>
                        </div>
                    </div>
                `
            })
        }

        if (seccionHombre) {
            // agregar productos a la sección hombre
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
        }

        if (seccionMujer) {
            // agregar productos a la sección mujer
            listaProductosMujer.forEach(producto => {
                seccionMujer.innerHTML += `
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
        }

        if (primerSeccionNinios && segundaSeccionNinios) {
            // agregando productos a la primer sección niños
            productosPrimerSeccionNinios.forEach(producto => {
                primerSeccionNinios.innerHTML += `
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

            // agregando productos a la segunda sección niños
            productosSegundaSeccionNinios.forEach(producto => {
                segundaSeccionNinios.innerHTML += `
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
        }

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
    });

// actualizar cantidad de productos del carrito
const actualizarCantidadCarrito = () => {
    cantidadProductos.textContent = carrito.length;
}

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
if (contenedorCarrito) {
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
}