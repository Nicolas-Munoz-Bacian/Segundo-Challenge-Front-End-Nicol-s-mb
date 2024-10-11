async function listarProductos() {
    try {
        const conexion = await fetch("http://localhost:3000/products");
        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    } catch (error) {
        console.error('Error al listar productos:', error);
    }
}

async function enviarCard(titulo, price, url, imagen) {
    try {
        const conexion = await fetch("http://localhost:3000/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: titulo,
                price: price,
                url: url,
                image: imagen
            })
        });
        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    } catch (error) {
        console.error('Error al enviar producto:', error);
    }
}

async function buscarProductos(palabraClave) {
    try {
        const conexion = await fetch(`http://localhost:3000/products?q=${palabraClave}`);
        const conexionConvertida = await conexion.json();
        return conexionConvertida;
    } catch (error) {
        console.error('Error al buscar productos:', error);
    }
}

export const conexionAPI = {
    listarProductos,
    enviarCard,
    buscarProductos
};

// Puedes probar las funciones como necesarias
// listarProductos().then(data => console.log(data));
// enviarCard('Nuevo Producto', 100, 'https://example.com/image.jpg', 'some-image.jpg').then(data => console.log(data));
// buscarProductos('Stormtrooper').then(data => console.log(data));
