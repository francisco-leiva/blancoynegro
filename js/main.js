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

    cantidadProductos ? actualizarCantidadCarrito() : false;

    if (contenedorCarrito && carrito.length != 0) {
        carritoVacio.classList.add("hidden");
        contenedorProductosCarrito.classList.remove("hidden");
        finalizarCompra.classList.remove("hidden");

        actualizarCarrito();
    }
})

// obtener datos
async function getData () {
    const response = await fetch(primerSeccionInicio ? "./productos.json" : "../productos.json");
    const data = await response.json();
    return data;
};

// función para agregar productos a las diferentes secciones
function addProducts (productList, section) {
    productList.forEach(prod => {
        section.innerHTML += `
                    <article class="col-xl-3 col-md-6 col-sm-6 my-2 sectorGaleria">
                        <div class="card rounded-0">
                            <img src="${primerSeccionInicio ? prod.img : `.${prod.img}`}" class="card-img-top" alt="${prod.tipo} ${prod.nombre}">
                            <div class="card-body">
                                <h2 class="card-title precio">$${prod.precio}</h2>
                                <p class="card-text descripcion">${prod.nombre}</p>
                                <a id="${prod.id}" class="btn botonComprar">Comprar</a>
                            </div>
                        </div>
                    </article>
                `;
    })
}

// funciones para añadir productos a las diferentes páginas
async function mostrarProductos () {
    const listaProductos = await getData();

    // separar productos en categorías
    const listaProductosHombre = listaProductos.filter(producto => producto.categoria == "hombre");
    const listaProductosMujer = listaProductos.filter(producto => producto.categoria == "mujer");
    const listaProductosNinios = listaProductos.filter(producto => producto.categoria == "niños");

    // separar productos por secciones
    const productosPrimerSeccionInicio = listaProductos.slice(0, 4);
    const productosSegundaSeccionInicio = listaProductos.slice(4, 8);
    const productosTerceraSeccionInicio = listaProductos.slice(8, 12);
    const productosPrimerSeccionNinios = listaProductosNinios.slice(0, 4);
    const productosSegundaSeccionNinios = listaProductosNinios.slice(4, 8);

    // añadir productos por páginas
    // añadir productos inicio
    if (primerSeccionInicio) {
        addProducts(productosPrimerSeccionInicio, primerSeccionInicio);

        addProducts(productosSegundaSeccionInicio, segundaSeccionInicio);
    
        addProducts(productosTerceraSeccionInicio, terceraSeccionInicio);
    }

    // añadir productos hombres
    if (seccionHombre) addProducts(listaProductosHombre, seccionHombre);

    // añadir productos mujeres
    if (seccionMujer) addProducts(listaProductosMujer, seccionMujer);

    // añadir productos niños
    if (primerSeccionNinios) {
        addProducts(productosPrimerSeccionNinios, primerSeccionNinios);

        addProducts(productosSegundaSeccionNinios, segundaSeccionNinios);
    }
    
    // añadir funcionalidad a los botones de compra
    const botonesComprar = document.querySelectorAll(".botonComprar");

    botonesComprar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

// ejecutar función para añadir productos a las distintas páginas
mostrarProductos();

// funciones de carrito
// agregar productos al carrito
async function agregarAlCarrito (e) {
    const boton = e.target;
    const prodId = boton.getAttribute("id");

    const productoYaExiste = carrito.some(prod => prod.id == prodId);

    if (productoYaExiste) {
        carrito.map(prod => {
            if (prod.id == prodId) {
                prod.cantidad++
            }
        })
    } else {
        const listaProductos = await getData();
        const producto = listaProductos.find(prod => prod.id == prodId);
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

// actualizar cantidad de productos del carrito
function actualizarCantidadCarrito () {
    cantidadProductos.textContent = carrito.length;
}

// agregar los productos al carrito
function actualizarCarrito () {
    contenedorProductosCarrito.innerHTML = '';
    carrito.length !== 0
        ? carrito.forEach(producto => {
            contenedorProductosCarrito.innerHTML += `
                <article class="producto">
                    <img class="imgProductoCarrito" src=".${producto.img}" alt="${producto.tipo} ${producto.nombre}">
                    <span class="nombreProductoCarrito">${producto.tipo} ${producto.nombre}</span>
                    <span class="precioProductoCarrito">$${producto.precio * producto.cantidad}</span>
                    <span class="cantidadProductoCarrito">Cantidad: ${producto.cantidad}</span>
                    <button onclick="eliminarDelCarrito(${producto.id})" class="removeBtn"><i class="bi bi-trash"></i></button>
                </article>
            `
        })
        : null

    actualizarTotalCarrito();
}

// suma total de precios del carrito
function actualizarTotalCarrito () {
    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);
    precioTotal.innerHTML = `$${total}`;
}


// eliminar un producto del carrito
function eliminarDelCarrito (prodId) {
    const producto = carrito.find(prod => prod.id == prodId);

    const indice = carrito.indexOf(producto);
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
contenedorCarrito &&
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
