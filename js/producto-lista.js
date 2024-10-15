// ... (tu código actual)

// Función para actualizar la lista de productos
async function updateProductList() {
    try {
      // Obtener los productos actualizados de la API
      const updatedProducts = await añadirProductos();
  
      // Renderizar la lista de productos actualizada
      renderProducts(updatedProducts);
    } catch (error) {
      console.error('Error al actualizar la lista de productos:', error);
    }
  }
  
  // ... (tu código actual)
  
  // Función para renderizar los productos en el DOM
function renderProducts(products) {
    const productsContainer = document.querySelector('.card'); // Selecciona el contenedor de productos
    productsContainer.innerHTML = ''; // Limpia el contenido anterior
  
    products.forEach(product => {
      const productCard = `
        <div class="card" data-id="${product.id}">
          <img class="image" src="${product.url}" alt="${product.name}"/>
          <div class="card-container--info">
            <p class="name">${product.name}</p>
            <div class="card-container--value">
              <p class="price">${product.price}</p>
              <button class="btn__eliminar__producto" type="button">
                <img src="./assets/bote-de-basura.png" alt="Eliminar producto">
              </button>
            </div>
          </div>
        </div>
      `;
      productsContainer.innerHTML += productCard;
    });
  
    // Añadir eventos a los botones de borrar después de renderizar
    document.querySelectorAll('.btn__eliminar__producto').forEach(button => {
      button.addEventListener('click', handleDelete);
    });
  }
  
  // Dentro del bloque try del envío del formulario
  try {
    // ... (tu código actual)
    await enviarProducto(newProduct);
    alert('Producto agregado exitosamente.');
    productForm.reset();
  
    // Actualizar la lista de productos
    updateProductList();
  } catch (error) {
    // ... (tu código actual)
  }
  
  // ... (tu código actual)