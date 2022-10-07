// PRODUCTOS //
const listaProductos = [
    {nombre: "Lexington", tipo: "Zapatillas", stock: 10, precio: 21000},
    {nombre: "Dina", tipo: "Borcegos", stock: 8, precio: 27000},
    {nombre: "Demeter", tipo: "Borcegos", stock: 10, precio: 29000},
    {nombre: "Chicago W", tipo: "Zapatillas", stock: 9, precio: 17500},
    {nombre: "Bone", tipo: "Mocasines", stock: 9, precio: 9900},
    {nombre: "Acton", tipo: "Mocasines", stock: 9, precio: 24000},
    {nombre: "Climbing", tipo: "Zapatillas", stock: 9, precio: 25000},
];

class Producto {
    constructor(nombre, tipo, stock, precio) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.stock = stock;
        this.precio = precio;
    }
}

const nuevoProducto = () => {
    let nombreArticulo = prompt("Nombre del artículo");
    let tipoArticulo = prompt("Tipo de artículo");
    let stockArticulo = parseInt(prompt("¿Cuánto hay en stock?"));
    let precioArticulo = parseFloat(prompt("Precio del artículo"));
    let precioFinal = precioArticulo * iva;

    let articulo = new Producto(nombreArticulo, tipoArticulo, stockArticulo, precioFinal);
    listaProductos.push(articulo);
    return listaProductos;
}

// BUSQUEDA //
const buscar = () => {
    let elementoABuscar = prompt("¿Querés buscar por nombre, tipo o precio?");
    switch (elementoABuscar) {
        case "nombre":
            let ingresarNombre = prompt("Ingrese el nombre a buscar");
            let buscarPorNombre = listaProductos.filter(producto => producto.nombre == ingresarNombre);
            return buscarPorNombre;
        case "tipo":
            let ingresarTipo = prompt("Ingrese el tipo a buscar");
            let buscarPorTipo = listaProductos.filter(producto => producto.tipo == ingresarTipo);
            return buscarPorTipo;
        case "precio":
            let ingresarPrecio = prompt("¿Cuánto tiene pensado gastar?");
            let buscarPorPrecio = listaProductos.filter(producto => producto.precio <= ingresarPrecio);
            return buscarPorPrecio;
        default:
            alert("Dato no válido");
            break;
    }
}

// CARRITO //
const carrito = [];

const totalCarrito = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0);

// DESCUENTO //
const iva = 1.21;

function calcularDescuento() {
    let nombreArticulo = prompt("Nombre del artículo");
    let precioArticulo = parseFloat(prompt("Precio del artículo"));

    if (precioArticulo <= 15000) {
        console.log(`Artículo: ${nombreArticulo}; Precio: $${precioArticulo}; Precio con IVA: $${precioArticulo * iva}; Precio con descuento: $${(precioArticulo - (precioArticulo * 0.10)) * iva}`);
    } else if (precioArticulo <= 25000) {
        console.log(`Artículo: ${nombreArticulo}; Precio: $${precioArticulo}; Precio con IVA: $${precioArticulo * iva}; Precio con descuento: $${(precioArticulo - (precioArticulo * 0.15)) * iva}`);
    } else {
        console.log(`Artículo: ${nombreArticulo}; Precio: $${precioArticulo}; Precio con IVA: $${precioArticulo * iva}; Precio con descuento: $${(precioArticulo - (precioArticulo * 0.20)) * iva}`);
    }
}
