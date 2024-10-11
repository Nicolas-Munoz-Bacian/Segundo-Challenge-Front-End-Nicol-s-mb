const lista = document.querySelector("[data-lista]")

function crearCard (){
    const producto = document.createElement("div");
    producto.className="card";
    producto.innerHTML=`                      <div class="card">
                        <img class="producto" src="./assets/Leche soprole Nuevo envase.jpg" alt="Producto"/>
                        <div class="card-container--info">
                          <p class="name">Nueva leche Soprole 100% natural y ecológica</p>
                          <div class="card-container--value">
                            <p class="descripcion">$ 1.250</p>
                            <img src="./assets/bote-de-basura.png" alt="trashIcon">
                          </div>
                        </div>
                      </div>`;

                      return producto;
}

async function listarProductos(){
    const listAPI = await conexionAPI.listarProductos()

    listAPI.array.forEach(products => lista.appendChild(crearCard(products, imagen, titulo))
        
    );
}