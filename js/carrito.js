document.addEventListener("DOMContentLoaded", () => {
    const contenedorCarrito = document.querySelector(".carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        if (contenedorCarrito) {
            contenedorCarrito.innerHTML = `<p class="text-2xl text-center p-10">Tu carrito está vacío</p>`;
        }
        return;
    }

    if (contenedorCarrito) {
        contenedorCarrito.innerHTML = `
            <h1 class="text-4xl font-bold mb-6 text-center text-red-500">Tu Carrito de Compras</h1>
            <div class="max-w-2xl mx-auto bg-slate-800 p-5 rounded-lg shadow-lg" id="lista-productos">
            </div>
            <div class="max-w-2xl mx-auto mt-4 flex justify-between items-center">
                <button id="vaciar-carrito" class="bg-red-700 hover:bg-red-600 p-2 rounded-lg cursor-pointer font-bold">Vaciar Carrito</button>
                <div class="text-2xl font-bold text-green-400" id="total-carrito"></div>
            </div>
        `;
    }

    const listaProductos = document.getElementById("lista-productos");
    const totalCarrito = document.getElementById("total-carrito");
    let total = 0;

    carrito.forEach((item) => {
        total += item.precio * item.cantidad;

        if (listaProductos) {
            listaProductos.innerHTML += `
                <div class="flex justify-between items-center border-b border-slate-700 py-3 px-2">
                    <div>
                        <h3 class="text-xl font-semibold">${item.titulo}</h3>
                        <p class="text-gray-400">Precio: $${item.precio} x ${item.cantidad}</p>
                    </div>
                    <div class="text-xl font-bold text-emerald-400">
                        $${item.precio * item.cantidad}
                    </div>
                </div>
            `;
        }
    });


    if (totalCarrito) {
        totalCarrito.innerHTML = `Total: $${total}`;
    }

    const botonVaciar = document.getElementById("vaciar-carrito");
    if (botonVaciar) {
        botonVaciar.addEventListener("click", () => {
            localStorage.removeItem("carrito"); 
            location.reload(); 
        });
    }
});