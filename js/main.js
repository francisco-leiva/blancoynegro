const iva = 1.21;

function productoNuevo() {
    let nombreArticulo = prompt("Nombre del artículo");
    let tipoArticulo = prompt("Tipo de artículo");
    let stockArticulo = parseInt(prompt("¿Cuánto hay en stock?"));
    let precioArticulo = parseInt(prompt("Precio del artículo"));
    let precioFinal = precioArticulo * iva;
    let articulo = console.log(`Artículo: ${nombreArticulo}; Tipo: ${tipoArticulo}; Stock: ${stockArticulo}; Precio: ${precioFinal}`);
    return articulo;
}

function aplicarDescuento() {
    let nombreArticulo = prompt("Nombre del artículo");
    let precioArticulo = parseInt(prompt("Precio del artículo"));

    if ((precioArticulo >= 9000) && (precioArticulo <= 15000)) {
        console.log(`Artículo: ${nombreArticulo}; Precio: $${precioArticulo}; Precio con IVA: $${precioArticulo * iva}; Precio con descuento: $${(precioArticulo - (precioArticulo * 0.10)) * iva}`);
    } else if ((precioArticulo > 15000) && (precioArticulo <= 25000)) {
        console.log(`Artículo: ${nombreArticulo}; Precio: $${precioArticulo}; Precio con IVA: $${precioArticulo * iva}; Precio con descuento: $${(precioArticulo - (precioArticulo * 0.15)) * iva}`);
    } else {
        console.log(`Artículo: ${nombreArticulo}; Precio: $${precioArticulo}; Precio con IVA: $${precioArticulo * iva}; Precio con descuento: $${(precioArticulo - (precioArticulo * 0.20)) * iva}`);
    }
}