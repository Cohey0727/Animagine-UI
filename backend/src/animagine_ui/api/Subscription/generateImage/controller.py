import uuid
import asyncio
from pathlib import Path
from typing import AsyncGenerator
from ....main import ImageGenerator
from .type import GenerateImageInput, GenerateImagePayload, GenerationStatus


async def generate_image(input: GenerateImageInput) -> AsyncGenerator[GenerateImagePayload, None]:
    generation_id = str(uuid.uuid4())
    output_path = Path("outputs") / f"{generation_id}.png"

    # 初期状態を返す
    yield GenerateImagePayload(id=generation_id, status=GenerationStatus.WAITING)

    try:
        # 処理中状態に更新
        yield GenerateImagePayload(id=generation_id, status=GenerationStatus.PROCESSING)

        # 画像生成（非同期で実行）
        generator = ImageGenerator()
        await asyncio.to_thread(
            generator.generate,
            prompt=input.prompt,
            negative_prompt=input.negative_prompt,
            width=input.width,
            height=input.height,
            guidance_scale=input.guidance_scale,
            num_inference_steps=input.num_inference_steps,
            output_path=str(output_path),
        )

        # 完了状態を返して終了
        yield GenerateImagePayload(
            id=generation_id,
            status=GenerationStatus.COMPLETED,
            file_path=str(output_path),
        )
        # ここでジェネレータは自然に終了
        return

    except Exception as e:
        # エラー状態を返して終了
        yield GenerateImagePayload(
            id=generation_id, status=GenerationStatus.FAILED, error_message=str(e)
        )
        # エラー時も明示的に終了
        return
