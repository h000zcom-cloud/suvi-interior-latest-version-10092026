"""Publish the brochure alongside the website, independent of API availability.

Run `python backend/export_brochure.py` after updating brochure content or images.
The generated PDF is a website asset and must be retained in frontend/public.
"""

from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent
load_dotenv(ROOT / ".env")

from brochure import build_pdf


def export_brochure():
    pdf = build_pdf()
    if not pdf.startswith(b"%PDF-"):
        raise ValueError("Brochure generation did not produce a PDF")
    destination = ROOT.parent / "frontend/public/brochures/Suvi-Interior-Brochure.pdf"
    destination.parent.mkdir(parents=True, exist_ok=True)
    temporary = destination.with_suffix(".tmp")
    temporary.write_bytes(pdf)
    temporary.replace(destination)
    print(f"Published {destination.name}: {len(pdf):,} bytes")


if __name__ == "__main__":
    export_brochure()