import torch
from diffusers import DiffusionPipeline, StableDiffusionXLImg2ImgPipeline
from PIL import Image
from typing import Optional
from pathlib import Path

class ImageGenerator:
    MODEL_ID = "cagliostrolab/animagine-xl-3.1"
    def __init__(self, use_img2img: bool = False):
        """
        Initialize the image generator.
        
        Args:
            use_img2img: If True, initializes for image-to-image generation
        """
        print(f"MPS available: {torch.backends.mps.is_available()}")
        pipeline_class = StableDiffusionXLImg2ImgPipeline if use_img2img else DiffusionPipeline
        self.pipe = pipeline_class.from_pretrained(
            "cagliostrolab/animagine-xl-3.1",
            torch_dtype=torch.float16,
            use_safetensors=True
        )
        self.pipe.to('mps')
    
    def generate_from_image(
        self,
        prompt: str,
        init_image_path: str,
        strength: float = 0.75,
        negative_prompt: Optional[str] = None,
        guidance_scale: float = 7.0,
        num_inference_steps: int = 28,
        output_path: Optional[str] = None
    ) -> None:
        """
        Generate an image based on a prompt and an initial image.
        
        Args:
            prompt: The input prompt describing the desired image
            init_image_path: Path to the initial image
            strength: How much to transform the initial image (0-1)
            negative_prompt: Things to avoid in the generated image
            guidance_scale: How strictly to follow the prompt
            num_inference_steps: Number of denoising steps
            output_path: Where to save the generated image
        """
        # Load and prepare the initial image
        init_image = Image.open(init_image_path).convert("RGB")
        
        if negative_prompt is None:
            negative_prompt = "nsfw, lowres, (bad), text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, jpeg artifacts, low quality, watermark, unfinished, displeasing, oldest, early"
        
        # Generate the image
        image = self.pipe(
            prompt=prompt,
            image=init_image,
            strength=strength,
            negative_prompt=negative_prompt,
            guidance_scale=guidance_scale,
            num_inference_steps=num_inference_steps
        ).images[0]
        
        # Save the image
        if output_path is None:
            output_path = "./output_img2img.png"
            
        # Create output directory if it doesn't exist
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        image.save(output_path)
        print(f"Image saved to {output_path}")

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
    # Step 1: Generate initial image
    text2img_generator = ImageGenerator(use_img2img=False)
    text2img_generator.generate(
        prompt="1girl, white hair, blue eyes, smile, looking at viewer, outdoors, masterpiece, best quality, very aesthetic",
        output_path="./outputs/output_00.png"
    )
    
    # Step 2: Modify the initial image
    img2img_generator = ImageGenerator(use_img2img=True)
    img2img_generator.generate_from_image(
        prompt="1girl, red hair, green eyes, smile, looking at viewer, outdoors, masterpiece, best quality, very aesthetic",
        init_image_path="./outputs/output_00.png",
        strength=0.75,  # 75%の強さで変更を適用
        output_path="./outputs/output_01.png"
    )

if __name__ == "__main__":
    main()
