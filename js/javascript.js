document.addEventListener('DOMContentLoaded', () => {
    init();
});

// Inicializar el proceso para listar productos desde la API
function init() {
    fetchProducts().then(renderProducts);
}

const productsContainer = document.getElementById('products-container');
let products = [];

// Función para obtener los productos desde el backend
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        products = await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Función para renderizar los productos en el DOM (POST)
function renderProducts() {
    productsContainer.innerHTML = '';
    products.forEach((product, index) => {
        const productCard = `
            <div class="card">
                <img class="producto" src="${product.image}" alt="${product.name}"/>
                <div class="card-container--info">
                    <p>${product.name}</p>
                    <div class="card-container--value">
                        <p>$${product.price}</p>
                        <img src="./assets/bote-de-basura.png" alt="trashIcon" onclick="deleteProduct(${index})">
                    </div>
                </div>
            </div>
        `;
        productsContainer.innerHTML += productCard;
    });
}

// Función para agregar un producto
async function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const image = document.getElementById('image').value;
    
    try {
        const response = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, image })
        });
        const newProduct = await response.json();
        products.push(newProduct);
        renderProducts();
        clearForm();
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Función para eliminar un producto
async function deleteProduct(index) {
    const productId = products[index].id;
    
    try {
        await fetch(`http://localhost:3000/products/${productId}`, { method: 'DELETE' });
        products.splice(index, 1);
        renderProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

// Función para limpiar el formulario
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('image').value = '';
}

// Manejar el evento de agregar producto
document.querySelector('.agregar_producto_forma').addEventListener('submit', addProduct);
