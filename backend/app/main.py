from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from app.api.routes import login, register, reset_password, change_password, user
from app.database.database import engine, Base
from app.utils.migrations import run_alembic_upgrade

logging.basicConfig(level=logging.INFO)
logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)
logging.getLogger("alembic.runtime.migration").setLevel(logging.INFO)

app = FastAPI(docs_url="/docs", redoc_url="/redoc")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def configure_all(app: FastAPI):
    configure_routes(app)
    configure_db()


def configure_routes(app: FastAPI):
    app.include_router(login.login_router, tags=["Login"])
    app.include_router(register.register_router, tags=["Register"])
    app.include_router(change_password.change_password_router, tags=["Change Password"])
    app.include_router(reset_password.reset_password_router, tags=["Forgot Password"])
    app.include_router(user.user_router, tags=["User"])


def configure_db():
    Base.metadata.create_all(bind=engine)


@app.exception_handler(Exception)
def global_exception_handler(request: Request, exc: Exception):
    logging.error(f"Unexpected error: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "message": "Internal server error",
            "details": str(exc),
            "request": request.url,
        },
    )


configure_all(app)


@app.on_event("startup")
def startup_event():
    run_alembic_upgrade()


@app.get("/")
def root():
    return {"message": "Go to /docs!"}
