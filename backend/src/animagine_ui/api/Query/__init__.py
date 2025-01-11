import strawberry
from .hello import hello

@strawberry.type
class Query:
    hello = hello