from typing import Annotated, Dict, List
from fastapi import APIRouter, HTTPException, Path, Query, status
from src.schemas.articulos import ArticuloBase, ArticuloRespuesta

router = APIRouter(prefix="/articulos", tags=["Artículos"])


base_de_datos: Dict[int, dict] = {
    1: {"id": 1, "titulo": "Teclado Mecánico RGB", "descripcion": "Switches red", "precio": 45.50},
    2: {"id": 2, "titulo": "Mouse Inalámbrico", "descripcion": "Ergonómico", "precio": 25.00},
    3: {"id": 3, "titulo": "Auriculares Gamer 7.1", "descripcion": "Con micrófono", "precio": 59.90}
}


@router.get("/", response_model=List[ArticuloRespuesta])
def obtener_articulos(
    limite: Annotated[int, Query(ge=1, description="Límite de artículos a devolver")] = 10
):
    return list(base_de_datos.values())[:limite]


@router.get("/{id_articulo}", response_model=ArticuloRespuesta, responses={404: {"description": "Artículo no encontrado"}})
def obtener_articulo(
    id_articulo: Annotated[int, Path(ge=1, description="El ID del artículo")]
):
    if id_articulo not in base_de_datos:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    return base_de_datos[id_articulo]


@router.post("/", response_model=ArticuloRespuesta, status_code=status.HTTP_201_CREATED)
def crear_articulo(articulo: ArticuloBase):
    nuevo_id = max(base_de_datos.keys(), default=0) + 1
    nuevo_articulo = {"id": nuevo_id, **articulo.model_dump()}
    base_de_datos[nuevo_id] = nuevo_articulo
    return nuevo_articulo


@router.put("/{id_articulo}", response_model=ArticuloRespuesta, responses={404: {"description": "Artículo no encontrado"}})
def actualizar_articulo(
    id_articulo: Annotated[int, Path(ge=1, description="El ID del artículo a actualizar")],
    articulo: ArticuloBase
):
    if id_articulo not in base_de_datos:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    
    datos_actualizados = {"id": id_articulo, **articulo.model_dump()}
    base_de_datos[id_articulo] = datos_actualizados
    return datos_actualizados


@router.delete("/{id_articulo}", status_code=status.HTTP_204_NO_CONTENT, responses={404: {"description": "Artículo no encontrado"}})
def eliminar_articulo(
    id_articulo: Annotated[int, Path(ge=1, description="El ID del artículo a eliminar")]
):
    if id_articulo not in base_de_datos:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    
    del base_de_datos[id_articulo]
    return None