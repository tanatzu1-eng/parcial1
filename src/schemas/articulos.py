from pydantic import BaseModel, Field
from typing import Annotated

ID = Annotated[int, Field(ge=1, description="ID único del artículo")]
TITULO = Annotated[str, Field(min_length=3, description="Título del artículo")]
DESCRIPCION = Annotated[str, Field(max_length=1000, description="Descripción del artículo")]
PRECIO = Annotated[float, Field(gt=0, description="Precio del artículo")]
DISPONIBLE = Annotated[bool, Field(default = True)]


class ArticuloUpdateSchema(BaseModel):
    titulo: TITULO
    descripcion: DESCRIPCION
    precio: PRECIO
    disponible: DISPONIBLE

class ArticuloSchema(BaseModel):
    id: ID
    titulo: TITULO
    descripcion: DESCRIPCION
    precio: PRECIO
    disponible: DISPONIBLE



NOT_FOUND_RESPONSE = {
    404: {
        "description": "en caso de no encontrar el id",
        "content": {
            "application/json": {
                "example": {
                    "detail": "articulo no encontrado",
                }
            }
        },
    },
    409: {
        "description": "conflicto de datos",
        "content": {
            "application/json": {
                "example": {
                    "detail": "hay 2 datos identicos",
                }
            }
        },
    },
}