from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.router import articulos

# Instanciar FastAPI y personalizar título
app = FastAPI(
    title="API de Artículos",
    description="Trabajo Práctico Integrador - PP1 y FastAPI."
)

# Configurar CORS (Para conectar con Javascript)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers existentes a la instancia
app.include_router(articulos.router)