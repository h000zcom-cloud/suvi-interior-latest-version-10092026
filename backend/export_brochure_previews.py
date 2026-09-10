"""Create website preview images from the actual published brochure.

Authoring utility only; visitors download/view prebuilt static assets.
"""
from pathlib import Path
import pymupdf

DIRECTORY = Path(__file__).resolve().parent.parent / "frontend/public/brochures"

if __name__ == "__main__":
    with pymupdf.open(DIRECTORY / "Suvi-Interior-Brochure.pdf") as document:
        target = DIRECTORY / "previews"
        target.mkdir(parents=True, exist_ok=True)
        for number, page in enumerate(document, 1):
            page.get_pixmap(matrix=pymupdf.Matrix(1.6, 1.6)).pil_save(
                target / f"page-{number}.jpg", quality=85, optimize=True
            )
        print(f"Published {len(document)} real brochure page previews")