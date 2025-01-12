import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from strawberry.fastapi import GraphQLRouter
from pathlib import Path
from dotenv import load_dotenv
import strawberry
from .Query import Query
from .Subscription import Subscription

load_dotenv()


def get_allowed_origins() -> list[str]:
    origins_str = os.getenv("ALLOWED_ORIGINS", "")
    return [origin.strip() for origin in origins_str.split(",")]


def create_app() -> FastAPI:
    schema = strawberry.Schema(query=Query, subscription=Subscription)

    # スキーマファイルを出力
    schema_path = Path(__file__).parent / "schema.graphql"
    with open(schema_path, "w") as f:
        f.write(str(schema))
    print(f"GraphQL schema exported to {schema_path}")

    app = FastAPI(title="Animagine UI")
    
    # CORS設定
    app.add_middleware(
        CORSMiddleware,
        allow_origins=get_allowed_origins(),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"]
    )

    # 静的ファイルの配信設定
    outputs_dir = Path("outputs")
    outputs_dir.mkdir(exist_ok=True)
    app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

    # GraphQLの設定
    graphql_app = GraphQLRouter(schema)
    app.include_router(graphql_app, prefix="/graphql")
    @app.get("/schema.graphql")
    async def schema():
        return FileResponse(
            path=schema_path, filename="schema.graphql", media_type="text/plain"
        )
    return app


app = create_app()
