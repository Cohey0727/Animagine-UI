import strawberry

@strawberry.field
def hello() -> str:
    return "Hello, Animagine UI!"