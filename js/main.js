// Header

document.addEventListener("DOMContentLoaded", function () {
    let menuHamburguesa = document.getElementById("menuhamburguesa");
    let menu = document.getElementById("menu");

    menuHamburguesa.addEventListener("click", function () {
        menu.classList.toggle("active");
    });
    cargarCarrito();
});

function cargarCarrito() {
    let carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        let carritoRecuperado = JSON.parse(carritoGuardado);
        carritoRecuperado.forEach(producto => {
            agregarproducto(producto, false); // No mostrar Toastify al cargar
        });
    }
}

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

        Toastify({
            text: "Producto agregado, ingresa al carrito para completar la compra",
            duration: 3000,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "linear-gradient(135deg, #ff6600, rgb(124, 106, 84))",
            },
            onClick: function(){} // Callback after click
            }).showToast();

        let totalPrecio = document.getElementById("total")
        let itemCarrito = document.createElement("li")
        itemCarrito.textContent = `${producto.nombre} - $${producto.precio}`
        carrito.appendChild(itemCarrito)
    

    // Total de la compra
    
    totalCarrito += producto.precio
    totalPrecio.textContent = `Total: $${totalCarrito}`

    guardarCarrito();

    
    }

    function guardarCarrito() {
        let productosEnCarrito = [];
        document.querySelectorAll("#carrito li").forEach(item => {
            let nombre = item.textContent.split(" - $")[0];
            let precio = parseFloat(item.textContent.split(" - $")[1]);
            productosEnCarrito.push({ nombre, precio });
        });
        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    }

    document.addEventListener("DOMContentLoaded", () => {

        let totalCarrito = 0

            // Elementos del carrito
        let botonCarrito = document.getElementById("botoncarrito");
        let carritoContainer = document.getElementById("carritocontainer");
        let cerrarCarrito = document.getElementById("cerrarcarrito");

        // Verificar si los elementos existen antes de usarlos
        if (botonCarrito && carritoContainer && cerrarCarrito) {
        // Mostrar el carrito
        botonCarrito.addEventListener("click", () => {
            carritoContainer.classList.add("active");
        });

        // Cerrar el carrito
        cerrarCarrito.addEventListener("click", () => {
            carritoContainer.classList.remove("active");
        });
        }
    })

    carrito.addEventListener ('click', (evento) => {

        const ITEM = evento.target;

        if (ITEM.tagName === 'LI') {
            const PRECIOPRODUCTO = parseInt(ITEM.textContent.split('$')[1])
            totalCarrito -= PRECIOPRODUCTO
            const TOTAL_PRECIO = document.getElementById("total");
            TOTAL_PRECIO.textContent = `Total: $${totalCarrito}`;
            carrito.removeChild(ITEM)
        }

        guardarCarrito();

    })
    
    let checkoutButton = document.getElementById("checkout");

    checkoutButton.addEventListener("click", () => {
    Swal.fire({
        title: "¿Seguro que deseas realizar esta compra?",
        icon: "question",
        showCancelButton: true, 
        confirmButtonText: "Comprar",
        cancelButtonText: "Cancelar",
        customClass: {confirmButton: "swal-button-green" }
    }).then((result) => {
        if (result.isConfirmed) { 
            
            carrito.innerHTML = "";
            totalCarrito = 0;
            document.getElementById("total").textContent = `Total: $${totalCarrito}`;
            
            // Mostrar mensaje de éxito
            Swal.fire({
                title: "¡Compra realizada!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

            guardarCarrito();
        } else {
            // Si cancela, no pasa nada
            Swal.fire({
                title: "Compra cancelada",
                icon: "info",
                timer: 2000,
                showConfirmButton: false
            });
        }
    })

    
})









