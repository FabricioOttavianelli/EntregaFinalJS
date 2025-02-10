// Header

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
});

// Traer productos del json

let totalCarrito = 0

fetch ("./js/productos.json")
    .then(response => {
        if(!response.ok){
        throw new error ("problema al cargar procuctos.json")
        }
        return response.json()
    })
    .then(productos => {
        let listaDeProductos = document.getElementById("listadeproductos");
        productos.forEach(producto => {
            let productoDiv = document.createElement ("div");
            productoDiv.classList.add("productos")
            productoDiv.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>
                <img src="${producto.imagen}" alt="">
                <button class="agregaralcarrito">Agregar al Carrito</button>
                `;

                let agregarItem = productoDiv.querySelector('.agregaralcarrito')
                agregarItem.addEventListener('click',() => agregarproducto(producto))

            
                listaDeProductos.appendChild(productoDiv)

        });
    })
    .catch (Error => console.error("hay un error en la peticion"));

    // Funcion para agregar al carrito


    function agregarproducto(producto) {
        let totalPrecio = document.getElementById("total")
        let itemCarrito = document.createElement("li")
        itemCarrito.textContent = `${producto.nombre} - ${producto.precio}`
        carrito.appendChild(itemCarrito)
    

    // Total de la compra
    
    totalCarrito += producto.precio
    totalPrecio.textContent = `Total: $${totalCarrito}`

    
    }





