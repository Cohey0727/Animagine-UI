import torch
from diffusers import DiffusionPipeline
from typing import Optional
from pathlib import Path

class ImageGenerator:
    def __init__(self):
        print(f"MPS available: {torch.backends.mps.is_available()}")
        self.pipe = DiffusionPipeline.from_pretrained(
            "cagliostrolab/animagine-xl-3.1",
            torch_dtype=torch.float16,
            use_safetensors=True
        )
        self.pipe.to('mps')
    
    def generate(
        self,
        prompt: str,
        negative_prompt: Optional[str] = None,
        width: int = 768,
        height: int = 768,
        guidance_scale: float = 7.0,
        num_inference_steps: int = 28,
        output_path: Optional[str] = None
    ) -> None:
        """
        Generate an image based on the given prompt.
        
        Args:
            prompt: The input prompt describing the desired image
            negative_prompt: Things to avoid in the generated image
            width: Output image width
            height: Output image height
            guidance_scale: How strictly to follow the prompt (higher = more strict)
            num_inference_steps: Number of denoising steps (higher = better quality but slower)
            output_path: Where to save the generated image
        """
        if negative_prompt is None:
            negative_prompt = "nsfw, lowres, (bad), text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early"
        
        image = self.pipe(
            prompt=prompt,
            negative_prompt=negative_prompt,
            width=width,
            height=height,
            guidance_scale=guidance_scale,
            num_inference_steps=num_inference_steps
        ).images[0]
        
        # Save the image
        if output_path is None:
            output_path = "./output.png"
            
        # Create output directory if it doesn't exist
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        image.save(output_path)
        print(f"Image saved to {output_path}")


def main():
    generator = ImageGenerator()
    
    # Example usage
    generator.generate(
        prompt="1girl, white hair, blue eyes, smile, looking at viewer, outdoors, masterpiece, best quality, very aesthetic",
        output_path="./outputs/test_output.png"
    )

if __name__ == "__main__":
    main()