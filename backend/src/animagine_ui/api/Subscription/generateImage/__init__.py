import strawberry
from typing import AsyncGenerator
from .type import GenerateImageInput, GenerateImagePayload
from .controller import generate_image


@strawberry.subscription
async def generate_image_subscription(input: GenerateImageInput) -> AsyncGenerator[GenerateImagePayload, None]:
    async for payload in generate_image(input):
        yield payload
