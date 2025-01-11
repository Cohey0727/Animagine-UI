from typing import Optional
import strawberry
from enum import Enum

@strawberry.enum
class GenerationStatus(str, Enum):
    """画像生成の状態を表すenum"""
    WAITING = "waiting"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

@strawberry.input
class GenerateImageInput:
    """画像生成の入力パラメータ"""
    prompt: str
    negative_prompt: Optional[str] = None
    width: int = 768
    height: int = 768
    guidance_scale: float = 7.0
    num_inference_steps: int = 28

@strawberry.type
class GenerateImagePayload:
    """画像生成のレスポンス"""
    id: str
    status: GenerationStatus
    file_path: Optional[str] = None
    error_message: Optional[str] = None