from typing import Optional
import strawberry


@strawberry.input
class GenerateImageInput:
    prompt: str
    negative_prompt: Optional[str] = None
    width: int = 768
    height: int = 768
    guidance_scale: float = 7.0
    num_inference_steps: int = 28


@strawberry.type
class GenerateImagePayload:
    """画像生成処理の結果を表すペイロード"""

    id: str
    status: str
    file_path: Optional[str] = None
    error_message: Optional[str] = None
