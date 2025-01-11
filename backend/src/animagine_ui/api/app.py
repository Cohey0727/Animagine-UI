from fastapi import FastAPI
from fastapi.responses import FileResponse
from strawberry.fastapi import GraphQLRouter
from pathlib import Path
import strawberry
from .Query import Query
from .Subscription import Subscription


def create_app() -> FastAPI:
    schema = strawberry.Schema(
        query=Query, subscription=Subscription
    )

    # スキーマファイルを出力
    schema_path = Path(__file__).parent / "schema.graphql"
    with open(schema_path, "w") as f:
        f.write(str(schema))
    print(f"GraphQL schema exported to {schema_path}")

    app = FastAPI(title="Animagine UI")
    graphql_app = GraphQLRouter(schema)
    app.include_router(graphql_app, prefix="/graphql")

    @app.get("/schema.graphql")
    async def schema():
        return FileResponse(
            path=schema_path, filename="schema.graphql", media_type="text/plain"
        )

    return app


app = create_app()
