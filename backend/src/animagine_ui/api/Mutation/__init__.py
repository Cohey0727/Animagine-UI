import strawberry
from .generateImage import generate_image_field


@strawberry.type
class Mutation:
    generate_image = generate_image_field
