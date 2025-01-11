import strawberry
from .generateImage import generate_image_subscription


@strawberry.type
class Subscription:
    generate_image = generate_image_subscription
