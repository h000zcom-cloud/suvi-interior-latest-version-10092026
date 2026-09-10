import os

import pytest
import requests
from dotenv import dotenv_values


frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL missing")
BASE_URL = base_url.rstrip("/")


@pytest.fixture(scope="module")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Brochure delivery endpoints ---
class TestBrochureDelivery:
    def test_bundled_pdf_public_asset(self, api):
        r = api.get(f"{BASE_URL}/brochures/Suvi-Interior-Brochure.pdf", timeout=60)
        assert r.status_code == 200
        assert r.content.startswith(b"%PDF-")
        assert "application/pdf" in r.headers.get("content-type", "")
        assert 2_000_000 <= len(r.content) <= 6_000_000, f"size={len(r.content)}"

    def test_bundled_pdf_has_7_pages_and_content(self, api):
        r = api.get(f"{BASE_URL}/brochures/Suvi-Interior-Brochure.pdf", timeout=60)
        assert r.status_code == 200
        try:
            import pymupdf
        except ImportError:
            pytest.skip("pymupdf not installed")

        doc = pymupdf.open(stream=r.content, filetype="pdf")
        assert doc.page_count == 7

        # Each page should have readable text and/or images; catches blank/broken image pages.
        for i in range(doc.page_count):
            page = doc[i]
            text_len = len((page.get_text("text") or "").strip())
            image_count = len(page.get_images(full=True))
            assert (text_len > 20) or (image_count > 0), f"page {i + 1} appears empty"

    def test_api_brochure_attachment_compat(self, api):
        r = api.get(f"{BASE_URL}/api/brochure.pdf", timeout=60)
        assert r.status_code == 200
        assert r.content.startswith(b"%PDF-")
        disp = r.headers.get("content-disposition", "")
        assert "attachment" in disp.lower()
        assert "Suvi-Interior-Brochure.pdf" in disp