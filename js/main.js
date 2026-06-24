url_api = "http://127.0.0.1:8000/"



const obtener_database = document.getElementById("boton_database_completa")
const output_gets = document.getElementById("contenedor_gets")

const buscador = document.getElementById("buscador")
const obtener_articulo = document.getElementById("boton_buscar")



// ================================================================================================================================================
// GET DATABASE COMPLETA:
// ================================================================================================================================================
function get_database_completa(){
    boton_database_completa.addEventListener("click", async() => { // async es necesario porque este bloque contiene awaits, los awaits solo funcionan dentro de funciones que tengan async
        try {
            const respuesta = await fetch(url_api); // fetch() es para ir a una ruta y traer todo lo que esta en la ruta, en este caso en python
            const datos = await respuesta.json(); // sin .json() el "respuesta solo devuelve un response, es parecido pero no es el mismo formato que un json"

            contenedor_resultado.innerHTML = ""; // innerHTML significa "dentro del html", pero es para modificar el html en el DOM, le damos el valor "" para vaciarlo, sino se escribe una y otra vez al tocar el boton

            datos.forEach(item => {
                const parrafo = document.createElement("p");
                parrafo.innerHTML = `- nombre: ${item.titulo}, precio: $${item.precio}, disponible: ${item.disponible}`;
                contenedor_resultado.append(parrafo);
            });
        } catch (error) {
            console.log("error:", error);
            contenedor_resultado.innerHTML = "Error cargando datos";
        }
    });
}

get_database_completa()
// ================================================================================================================================================



// ================================================================================================================================================
// GET ITEM DE DATABASE:
// ================================================================================================================================================
function get_database_articulo(){
    obtener_articulo.addEventListener("click", async() => {
        try {
            const respuesta = await fetch(url_api);
            const datos = await respuesta.json();
            let encontrado = false

            contenedor_resultado.innerHTML = "";

            datos.forEach(item => {
                if (item.id === Number(buscador.value)) {
                    const parrafo = document.createElement("p");
                    parrafo.innerHTML = `nombre: ${item.titulo}, precio: $${item.precio}, disponible: ${item.disponible}`;
                    contenedor_resultado.append(parrafo);
                    encontrado = true;
                }
            });
            if (encontrado === false) {
                const parrafo = document.createElement("p");
                parrafo.innerHTML = `el id "${buscador.value}" no coincide con el de ningun producto`
                contenedor_resultado.append(parrafo);
            }
        } catch (error) {
            console.log("error:", error);
            contenedor_resultado.innerHTML = "Error cargando datos";
        }
    });
}

get_database_articulo()
// ================================================================================================================================================



// ================================================================================================================================================
// POST ITEM:
// ================================================================================================================================================
function post_item(){
    pass
}

post_item()
// ================================================================================================================================================



// ================================================================================================================================================
// PUT ITEM:
// ================================================================================================================================================

// ================================================================================================================================================



// ================================================================================================================================================
// DELETE ITEM:
// ================================================================================================================================================

// ================================================================================================================================================



// ================================================================================================================================================
// CAMBIAR TEMA CLARO/OSCURO:
// ================================================================================================================================================
function cambiar_tema(){
    pass
}
// ================================================================================================================================================
