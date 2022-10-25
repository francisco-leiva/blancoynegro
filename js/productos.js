//! PRODUCTOS //
const listaProductos = [
    { id: 1, nombre: "Lexington", tipo: "Zapatillas", stock: 10, precio: 21000, categoria: "hombre", img: "./img/zapatillas-lexington.jpg" },
    { id: 2, nombre: "Dina", tipo: "Borcegos", stock: 8, precio: 27000, categoria: "mujer", img: "./img/borcego-dina.jpg" },
    { id: 3, nombre: "Demeter", tipo: "Borcegos", stock: 10, precio: 29000, categoria: "hombre", img: "./img/borcego-demeter.jpg" },
    { id: 4, nombre: "Chicago W", tipo: "Zapatillas", stock: 9, precio: 17500, categoria: "mujer", img: "./img/zapatillas-chicago-w.jpg" },
    { id: 5, nombre: "Acton", tipo: "Mocasines", color: "Marrones", stock: 9, precio: 24000, categoria: "hombre", img: "./img/mocasines-acton-marrones.jpg" },
    { id: 6, nombre: "Bone", tipo: "Mocasines", color: "Azules", stock: 9, precio: 9900, categoria: "hombre", img: "./img/mocasines-bone-azules.jpg" },
    { id: 7, nombre: "Acton", tipo: "Mocasines", color: "Beige", stock: 9, precio: 24000, categoria: "hombre", img: "./img/mocasines-acton-beige.jpg" },
    { id: 8, nombre: "Bone", tipo: "Mocasines", color: "Marrones", stock: 9, precio: 9900, categoria: "hombre", img: "./img/mocasines-bone-marrones.jpg" },
    { id: 9, nombre: "Climbing", tipo: "Zapatillas", color: "Negras", stock: 9, precio: 25000, categoria: "mujer", img: "./img/zapatillas-climbing-negras.jpg" },
    { id: 10, nombre: "Peak", tipo: "Zapatillas", stock: 8, precio: 24900, categoria: "mujer", img: "./img/zapatillas-peak.jpg" },
    { id: 11, nombre: "Montara", tipo: "Zapatillas", stock: 10, precio: 26500, categoria: "mujer", img: "./img/zapatillas-montara.jpg" },
    { id: 12, nombre: "Climbing", tipo: "Zapatillas", color: "Marrones", stock: 9, precio: 25000, categoria: "mujer", img: "./img/zapatillas-climbing.jpg" },
    { id: 13, nombre: "Detroit", tipo: "Zapatillas", stock: 9, precio: 19000, categoria: "hombre", img: "./img/zapatillas-detroit.jpg" },
    { id: 14, nombre: "New Church", tipo: "Zapatillas", stock: 9, precio: 21000, categoria: "hombre", img: "./img/zapatillas-new-church.jpg" },
    { id: 15, nombre: "Holden", tipo: "Borcegos", stock: 9, precio: 33500, categoria: "hombre", img: "./img/borcego-holden.jpg" },
    { id: 16, nombre: "Marc", tipo: "Zapatillas", stock: 11, precio: 19000, categoria: "hombre", img: "./img/zapatillas-marc.jpg" },
    { id: 17, nombre: "Maxx", tipo: "Zapatillas", stock: 11, precio: 19000, categoria: "hombre", img: "./img/zapatillas-maxx.jpg" },
    { id: 18, nombre: "New Sky", tipo: "Zapatillas", stock: 10, precio: 21000, categoria: "hombre", img: "./img/zapatillas-new-sky.jpg" },
    { id: 19, nombre: "Pluton", tipo: "Zapatillas", stock: 8, precio: 19900, categoria: "mujer", img: "./img/zapatillas-pluton.jpg" },
    { id: 20, nombre: "Maddie", tipo: "Zapatillas", stock: 9, precio: 18500, categoria: "mujer", img: "./img/zapatillas-maddie.jpg" },
    { id: 21, nombre: "Mixter", tipo: "Zapatillas", stock: 7, precio: 16500, categoria: "mujer", img: "./img/zapatillas-mixter.jpg" },
    { id: 22, nombre: "Lizary", tipo: "Borcegos", stock: 10, precio: 34000, categoria: "mujer", img: "./img/borcego-lizary.jpg" },
    { id: 23, nombre: "Katia", tipo: "Zapatillas", stock: 8, precio: 17500, categoria: "mujer", img: "./img/zapatillas-katia.jpg" },
    { id: 24, nombre: "Nicky", tipo: "Zapatillas", stock: 12, precio: 16500, categoria: "mujer", img: "./img/zapatillas-nicky.jpg" },
    { id: 25, nombre: "Kolly", tipo: "Borcegos", stock: 7, precio: 14500, categoria: "niños", img: "./img/borcegos-kolly.jpg" },
    { id: 26, nombre: "Manhattan", tipo: "Zapatillas", stock: 8, precio: 9000, categoria: "niños", img: "./img/zapatillas-manhattan.jpg" },
    { id: 27, nombre: "Salva", tipo: "Zapatillas", stock: 7, precio: 9000, categoria: "niños", img: "./img/zapatillas-salva.jpg" },
    { id: 28, nombre: "Chloe", tipo: "Zapatillas", stock: 8, precio: 11500, categoria: "niños", img: "./img/zapatillas-chloe.jpg" },
    { id: 29, nombre: "Mount", tipo: "Zapatillas", stock: 6, precio: 13900, categoria: "niños", img: "./img/zapatillas-mount.jpg" },
    { id: 30, nombre: "Syra", tipo: "Zapatillas", stock: 8, precio: 11500, categoria: "niños", img: "./img/zapatillas-syra.jpg" },
    { id: 31, nombre: "Sierra", tipo: "Zapatillas", stock: 8, precio: 13900, categoria: "niños", img: "./img/zapatillas-sierra.jpg" },
    { id: 32, nombre: "Kildy", tipo: "Zapatillas", stock: 9, precio: 11500, categoria: "niños", img: "./img/zapatillas-kildy.jpg" },
];

//! AGREGAR UN PRODUCTO //
class Producto {
    constructor(nombre, tipo, stock, precio, categoria) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.stock = stock;
        this.precio = precio;
        this.categoria = categoria;
    }
}

const nuevoProducto = () => {
    let nombreArticulo = prompt("Nombre del artículo");
    let tipoArticulo = prompt("Tipo de artículo");
    let stockArticulo = parseInt(prompt("¿Cuánto hay en stock?"));
    let precioArticulo = parseFloat(prompt("Precio del artículo"));
    let categoriaArticulo = prompt("Categoría del artículo");

    let articulo = new Producto(nombreArticulo, tipoArticulo, stockArticulo, precioArticulo, categoriaArticulo);
    listaProductos.push(articulo);
    return listaProductos;
}


//! CARRITO //
let carrito = [];