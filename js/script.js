// Importar función desde el archivo de API
import { enviarProducto, añadirProductos, eliminarProducto } from './conexionAPI.js';

const productsContainer = document.getElementById('products-container');
const productForm = document.getElementById('product-form');
const clearFormButton = document.getElementById('clearFormBtn');// Obteniendo el botón de limpiar

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const productos = await añadirProductos(); // Obtener productos desde la API
        renderProducts(productos); // Renderizar los productos
    } catch (error) {
        console.error('Error al inicializar:', error);
    }
});

// Manejar el evento de agregar producto
productForm.addEventListener('submit', async event => {
    event.preventDefault(); // Evitar envío por defecto
    
    const name = document.querySelector("[data-name]").value.trim();
    const price = document.querySelector("[data-price]").value.trim();
    const url = document.querySelector("[data-image]").value.trim();
    
    if (!name || !price || !url) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    if (!isValidURL(url)) {
        alert('Por favor, ingresa una URL válida.');
        return;
    }

    const newProduct = { name, price: parseFloat(price), url };

    try {
        await enviarProducto(newProduct);
        alert('Producto agregado exitosamente.');
        renderProducts(await añadirProductos()); // Actualizar el listado de productos
        clearForm(); // Limpiar el formulario después de agregar
    } catch (error) {
        console.error('Error al agregar producto:', error);
        alert('Ocurrió un error al agregar el producto.');
    }
});


// Función para renderizar los productos en el DOM
async function renderProducts(products) {
    productsContainer.innerHTML = ''; // Limpiar el contenido anterior

    products.forEach(product => {
        const productCard = `
            <div class="card" data-id="${product.id}">
                <img class="image" src="${product.url}" alt="${product.name}"/>
                <div class="card-container--info">
                    <p class="name">${product.name}</p>
                    <div class="card-container--value">
                        <p class="price">$ ${product.price.toFixed(2)}</p>
                        <button class="btn__eliminar__producto" type="button" data-id="${product.id}">
                            <img src="./assets/bote-de-basura.png" alt="Eliminar producto">
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard; // Añadir la tarjeta al contenedor
    });

      // Añadir eventos a los botones de borrar después de renderizar
      
      document.querySelectorAll('.btn__eliminar__producto').forEach(button => {
        button.addEventListener('click', handleDelete);
      });attachDeleteEventListeners();
    }
    
    // Función para limpiar el formulario
    function clearForm() {
        productForm.reset(); // Resetea todos los campos del formulario
    }
    
    // Función para manejar la eliminación de un producto
    function attachDeleteEventListeners() {
        document.querySelectorAll('.btn__eliminar__producto').forEach(button => {
            button.addEventListener('click', async event => {
                const productId = button.getAttribute('data-id');
                try {
                    await eliminarProducto(productId); // Eliminar producto de la API
                    alert('Producto eliminado exitosamente.');
                    renderProducts(await añadirProductos()); // Actualizar el listado de productos
                } catch (error) {
                    console.error('Error al eliminar producto:', error);
                    alert('Ocurrió un error al eliminar el producto.');
                }
            });
        });
    }

 // Añadir eventos a los botones de borrar después de renderizar
 document.querySelectorAll('.btn__eliminar__producto').forEach(button => {
    button.addEventListener('click', async event => {
        const productId = button.getAttribute('data-id');
        try {
            await eliminarProducto(productId);
            alert('Producto eliminado exitosamente.');
            renderProducts(await añadirProductos());
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            alert('Ocurrió un error al eliminar el producto.');
        }
    });
});

function attachDeleteEventListeners() {
    document.querySelectorAll('.btn__eliminar__producto').forEach(button => {
        button.addEventListener('click', async event => {
            const productId = button.getAttribute('data-id');
            try {
                await eliminarProducto(productId);
                alert('Producto eliminado exitosamente.');
                renderProducts(await añadirProductos());
            } catch (error) {
                console.error('Error al eliminar producto:', error);
                alert('Ocurrió un error al eliminar el producto.');
            }
        });
    });
}

function clearForm() {
    document.querySelector("[data-name]").value = '';
    document.querySelector("[data-price]").value = '';
    document.querySelector("[data-image]").value = '';
}