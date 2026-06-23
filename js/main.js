url_api = "http://127.0.0.1:8000/"


const obtener_database = document.getElementById("boton_database_completa")
const output_gets = document.getElementById("contenedor_gets")


// DATABASE COMPLETA:
boton_database_completa.addEventListener("click", async() => { // async es necesario porque este bloque contiene awaits, los awaits solo funcionan dentro de funciones que tengan async
    try {
        const respuesta = await fetch(url_api); // fetch() es para ir a una ruta y traer todo lo que esta en la ruta, en este caso en python
        const datos = await respuesta.json(); // sin .json() el "respuesta solo devuelve un response, es parecido pero no es el mismo formato que un json"

        contenedor_gets.innerHTML = ""; // innerHTML significa "dentro del html", pero es para modificar el html en el DOM, le damos el valor "" para vaciarlo, sino se escribe una y otra vez al tocar el boton

        datos.forEach(item => {
            const parrafo = document.createElement("p");
            parrafo.innerHTML = `- nombre: ${item.titulo}, precio: $${item.precio}, disponible: ${item.disponible}`;
            contenedor_gets.append(parrafo);
        });
    } catch (error) {
    console.log("error:", error);
    contenedor_gets.innerHTML = "Error cargando datos";
    }
});


// ITEM DE DATABASE:
