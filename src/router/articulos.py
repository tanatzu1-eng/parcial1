from typing import Annotated, List
from fastapi import APIRouter, HTTPException, Path, Query
from src.schemas.articulos import ArticuloUpdateSchema, ArticuloSchema, ID, TITULO, DESCRIPCION, PRECIO, DISPONIBLE, NOT_FOUND_RESPONSE

router = APIRouter()


base_de_datos = [
    {"id": 1, "titulo": "Teclado Mecánico RGB", "descripcion": "Switches red", "precio": 45.50, "disponible": True},
    {"id": 2, "titulo": "Mouse Inalámbrico", "descripcion": "Ergonómico", "precio": 25.00, "disponible": False},
    {"id": 3, "titulo": "Auriculares Gamer 7.1", "descripcion": "Con micrófono", "precio": 59.90, "disponible": True},
    {"id": 4, "titulo": "Gabinete", "descripcion": "Mid tower", "precio": 10000, "disponible": True},
    {"id": 5, "titulo": "producto 5", "descripcion": "hola", "precio": 59.90, "disponible": True},
    {"id": 6, "titulo": "producto 6", "descripcion": "hola", "precio": 59.90, "disponible": True},
    {"id": 7, "titulo": "producto 7", "descripcion": "", "precio": 59.90, "disponible": True},
    {"id": 8, "titulo": "producto 8", "descripcion": "", "precio": 59.90, "disponible": False},
    {"id": 9, "titulo": "producto 9", "descripcion": "", "precio": 59.90, "disponible": True},
    {"id": 10, "titulo": "producto 10", "descripcion": "", "precio": 59.90, "disponible": True},
    {"id": 11, "titulo": "producto 11", "descripcion": "sin descripcion", "precio": 10000000000, "disponible": False},
]



@router.get("/", response_model=List[ArticuloSchema])
def obtener_articulos():
    return base_de_datos



@router.get("/base_de_datos/{id}", response_model=ArticuloSchema, responses=NOT_FOUND_RESPONSE)
def obtener_articulo(id: ID):

    for articulo in base_de_datos:
        if id == articulo["id"]:
            return articulo

    raise HTTPException(status_code=404)



@router.post("/base_de_datos/{id}", response_model=ArticuloSchema, responses=NOT_FOUND_RESPONSE)
def crear_articulo(articulo_nuevo: ArticuloSchema):

    for articulo in base_de_datos:
        if articulo["id"] == articulo_nuevo.id:
            raise HTTPException(status_code=409)

        if articulo["titulo"] == articulo_nuevo.titulo:
            raise HTTPException(status_code=409)

    base_de_datos.append(articulo_nuevo.model_dump())
    return articulo_nuevo



@router.put("/base_de_datos/{id}", response_model=ArticuloSchema, responses=NOT_FOUND_RESPONSE)
def actualizar_articulo(id: ID, articulo_nuevo: ArticuloSchema):

    for articulo in base_de_datos:
        if id == articulo["id"]:
            articulo = articulo_nuevo.model_dump()
            return articulo
    
    raise HTTPException(status_code=404)



@router.delete("/base_de_datos/{id}", response_model=ArticuloSchema, responses=NOT_FOUND_RESPONSE)
def eliminar_articulo(id: ID):
    '''
# logico: Annotated[bool, Query(description="NO borrar permanentemente?")]
    for articulo in base_de_datos:
        if id == articulo["id"]:
            if logico:
                articulo["disponible"] = False
            else:
                base_de_datos.remove(articulo)
            return articulo
    '''

    for articulo in base_de_datos:
        if id == articulo["id"]:
            base_de_datos.remove(articulo)
            return articulo

    raise HTTPException(status_code=404)
