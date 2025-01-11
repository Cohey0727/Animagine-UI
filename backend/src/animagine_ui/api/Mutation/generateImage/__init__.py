import strawberry
from .type import GenerateImageInput, GenerateImagePayload
from .controller import generate_image


@strawberry.field
def generate_image_field(input: GenerateImageInput) -> GenerateImagePayload:
    return generate_image(input)
