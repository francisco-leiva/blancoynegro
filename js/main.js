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
const getData = async () => {
    const response = await fetch(primerSeccionInicio ? "./productos.json" : "../productos.json");
    const data = await response.json();
    data && showData(data);
};

// ejecutando función asíncrona
getData();

// agregar productos a las secciones
const addProducts = (productList, section) => {
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

const showData = (data) => {
    // separar productos por categoría
    const listaProductosHombre = data.filter(producto => producto.categoria == "hombre");
    const listaProductosMujer = data.filter(producto => producto.categoria == "mujer");
    const listaProductosNinios = data.filter(producto => producto.categoria == "niños");

    // separar productos por secciones
    let productosPrimerSeccionInicio = data.slice(0, 4);
    let productosSegundaSeccionInicio = data.slice(4, 8);
    let productosTerceraSeccionInicio = data.slice(8, 12);
    let productosPrimerSeccionNinios = listaProductosNinios.slice(0, 4);
    let productosSegundaSeccionNinios = listaProductosNinios.slice(4, 8);

    // añadir productos a las secciones de inicio
    if (primerSeccionInicio) {
        addProducts(productosPrimerSeccionInicio, primerSeccionInicio);

        addProducts(productosSegundaSeccionInicio, segundaSeccionInicio);

        addProducts(productosTerceraSeccionInicio, terceraSeccionInicio);
    }

    // añadir productos a la sección hombre
    seccionHombre ? addProducts(listaProductosHombre, seccionHombre) : null;

    // añadir productos a la sección mujer
    seccionMujer ? addProducts(listaProductosMujer, seccionMujer) : null;

    // añadir productos a las secciones de niños
    if (primerSeccionNinios) {
        addProducts(productosPrimerSeccionNinios, primerSeccionNinios);

        addProducts(productosSegundaSeccionNinios, segundaSeccionNinios);
    }

    // agregar productos al carrito
    const agregarAlCarrito = (e) => {
        let boton = e.target;
        let prodId = boton.getAttribute("id");

        let productoYaExiste = carrito.some(prod => prod.id == prodId);

        if (productoYaExiste) {
            carrito.map(prod => {
                if (prod.id == prodId) {
                    prod.cantidad++
                }
            })
        } else {
            let producto = data.find(prod => prod.id == prodId);
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
}

// actualizar cantidad de productos del carrito
const actualizarCantidadCarrito = () => {
    cantidadProductos.textContent = carrito.length;
}

// agregar los productos al carrito
const actualizarCarrito = () => {
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
