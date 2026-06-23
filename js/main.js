API_URL = "http://127.0.0.1:8000/docs"


async function ObtenerArticulos() {
    try {
        const respuesta = await fetch(API_URL);
        const datos = await respuesta.json();
    } catch (error) {
        console.error("Error al obtener articulos:", error);
    }
}