// database completa:
const boton_database_completa = document.getElementById("boton_database_completa")


// database item:
const boton_buscar_item = document.getElementById("boton_buscar")

const buscador = document.getElementById("buscador")


// post \ put:
const boton_post = document.getElementById("boton_post")
const boton_put = document.getElementById("boton_put");

const id_item = document.getElementById("id_item")
const titulo_item = document.getElementById("titulo_item")
const disponible_item = document.getElementById("disponible_item")
const precio_item = document.getElementById("precio_item")
const descripcion_item = document.getElementById("descripcion_item")


// output:
const contenedor_resultados = document.getElementById("contenedor_resultados")



// ================================================================================================================================================
// GET DATABASE COMPLETA:
// ================================================================================================================================================
function get_database(){
    boton_database_completa.addEventListener("click", async () => {
        try {
            const respuesta = await fetch("http://127.0.0.1:8000/", {
                method: "GET" // medio redundante, pero no esta de mas ser especifico
            });

            const datos = await respuesta.json();


            contenedor_resultados.innerHTML = ""

            for (let item of datos){
                contenedor_resultados.innerHTML +=
                `- id: ${item.id}<br>
                - titulo: ${item.titulo}<br>
                - disponible: ${item.disponible}<br>
                - precio: ${item.precio}<br>
                - descripcion: ${item.descripcion}<br><br>`;
            }


        } catch (error) {
            contenedor_resultados.innerHTML = "Error obteniendo items de database";
        }
    });
}

get_database();
// ================================================================================================================================================



// ================================================================================================================================================
// GET ITEM DE DATABASE:
// ================================================================================================================================================
function get_item(){
    boton_buscar_item.addEventListener("click", async () => {
        try {
            if (!buscador.value.trim()) {
                contenedor_resultados.innerHTML =
                    "no ingresaste ningun id (-_-)";
                return;
            }

            const respuesta = await fetch(`http://127.0.0.1:8000/base_de_datos/${buscador.value}`, {
                method: "GET"
            });


            if (!respuesta.ok) {
                contenedor_resultados.innerHTML =
                    `"${buscador.value}" no coincide con el id de ningun producto`;
                return;
            }

            const datos = await respuesta.json();


            contenedor_resultados.innerHTML =
                `id: ${datos.id}<br>
                titulo: ${datos.titulo}<br>
                disponible: ${datos.disponible}<br>
                precio: ${datos.precio}<br>
                descripcion: ${datos.descripcion}`;


        } catch (error) {
            contenedor_resultados.innerHTML = "Error obteniendo items de database";
        }
    });
}

get_item();
// ================================================================================================================================================



// ================================================================================================================================================
// POST ITEM:
// ================================================================================================================================================
function post_item(){
    boton_post.addEventListener("click", async () => {
        try {
            const salida = {
                id: id_item.value,
                titulo: titulo_item.value,
                descripcion: descripcion_item.value,
                precio: Number(precio_item.value),
                disponible: disponible_item.value,
            };

            const respuesta = await fetch(`http://127.0.0.1:8000/base_de_datos/${id_item.value}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(salida)
            });

            // condicion precio > 0 (olvide hacerlo en python asi que va aca)
            if (Number(precio_item.value) === 0) {
                contenedor_resultados.innerHTML = "no puede ser gratis, ponele precio"
                return
            }

            if (respuesta.status === 409) {
                contenedor_resultados.innerHTML = "Conflicto: el ID o el título ya existen";
                return;
            }

            if (!respuesta.ok) {
                contenedor_resultados.innerHTML = "faltan datos";
                return;
            }


            contenedor_resultados.innerHTML =
                `Item agregado:<br>
                - Id: ${salida.id}<br>
                - Titulo: ${salida.titulo}<br>
                - Disponible: ${salida.disponible}<br>
                - Precio: ${salida.precio}<br>
                - Descripcion: ${salida.descripcion}`;


        } catch (error) {
            contenedor_resultados.innerHTML = "Error obteniendo datos de database";
        }
    });
}

post_item();
// ================================================================================================================================================



// ================================================================================================================================================
// PUT ITEM:
// ================================================================================================================================================
boton_put.addEventListener("click", async () => {
    try {
        const datos = {
            id: id_item.value,
            titulo: titulo_item.value,
            disponible: disponible_item.value,
            precio: Number(precio_item.value),
            descripcion: descripcion_item.value
        };

        const respuesta = await fetch(`http://127.0.0.1:8000/base_de_datos/${id_item.value}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(datos)
        });

        // condicion precio > 0 (olvide hacerlo en python asi que va aca)
        if (Number(precio_item.value) === 0) {
            contenedor_resultados.innerHTML = "no puede ser gratis, ponele precio"
            return
        }

        // condicion nombre > 2 digitos (olvide hacerlo en python asi que va aca)
                if (titulo_item.value === "") {
            contenedor_resultados.innerHTML = "tiene que tener nombre"
            return
        }

        // condicion item debe existir
        if (!respuesta.ok) {
            contenedor_resultados.innerHTML = `el id ${id_item.value} no coincide con ningun item`;
            return;
        }


        contenedor_resultados.innerHTML =
            `id: ${id_item.value},<br>
            titulo: ${titulo_item.value},<br>
            disponible: ${disponible_item.value},<br>
            precio: ${precio_item.value},<br>
            descripcion: ${descripcion_item.value}`


    } catch (error) {
        contenedor_resultados.innerHTML = "Error obteniendo items de database";
    }
});
// ================================================================================================================================================



// ================================================================================================================================================
// DELETE ITEM:
// ================================================================================================================================================
boton_delete.addEventListener("click", async () => {
    try {
        if (!buscador.value.trim()) {
                contenedor_resultados.innerHTML =
                "no ingresaste ningun id (-_-)";
            return;
        }

        const respuesta = await fetch(`http://127.0.0.1:8000/base_de_datos/${buscador.value}`, {
            method: "DELETE"
        });
        
        if (!respuesta.ok) {
            contenedor_resultados.innerHTML = `"${buscador.value}" no coincide con ningun item`;
            return;
        }

        const datos = await respuesta.json();


        contenedor_resultados.innerHTML = "se borro el item"
        delete datos

    } catch (error) {
        contenedor_resultados.innerHTML = "Error obteniendo items de database"
    }
});
// ================================================================================================================================================



// ================================================================================================================================================
// CAMBIAR TEMA CLARO/OSCURO:
// ================================================================================================================================================

// ================================================================================================================================================



// ================================================================================================================================================
// AGREGAR A CARRITO:
// ================================================================================================================================================
function agregarAlCarrito(id, titulo, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = {
        id: id,
        titulo: titulo,
        precio: precio,
        cantidad: 1
    };
    
    const existe = carrito.find(item => item.id === id);
    if (existe) {
        existe.cantidad  += 1;
    } else {
        carrito.push(producto);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`¡${titulo} agregado al carrito!`)
}
// ================================================================================================================================================
