import uuid
from pathlib import Path
from ....main import ImageGenerator
from .type import GenerateImageInput, GenerateImagePayload


def generate_image(input: GenerateImageInput) -> GenerateImagePayload:
    try:
        # ユニークなIDを生成
        generation_id = str(uuid.uuid4())

        # 画像の保存パスを設定
        output_path = Path("outputs") / f"{generation_id}.png"

        # 画像生成
        generator = ImageGenerator()
        generator.generate(
            prompt=input.prompt,
            negative_prompt=input.negative_prompt,
            width=input.width,
            height=input.height,
            guidance_scale=input.guidance_scale,
            num_inference_steps=input.num_inference_steps,
            output_path=str(output_path),
        )

        return GenerateImagePayload(
            id=generation_id, status="completed", file_path=str(output_path)
        )

    except Exception as e:
        return GenerateImagePayload(
            id=str(uuid.uuid4()), status="failed", error_message=str(e)
        )
