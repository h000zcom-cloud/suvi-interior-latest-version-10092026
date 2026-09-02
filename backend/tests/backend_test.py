import os
import re
from pathlib import Path

import pytest
import requests
from dotenv import dotenv_values

frontend_env = dotenv_values("/app/frontend/.env")
base_url = os.environ.get("REACT_APP_BACKEND_URL") or frontend_env.get("REACT_APP_BACKEND_URL")
if not base_url:
    raise RuntimeError("REACT_APP_BACKEND_URL missing")
BASE_URL = base_url.rstrip("/")


def _admin_key():
    p = Path("/app/memory/test_credentials.md")
    if p.exists():
        m = re.search(r"X-Admin-Key:\s*`?([A-Za-z0-9]+)", p.read_text())
        if m:
            return m.group(1)
    return None


@pytest.fixture(scope="session")
def admin_key():
    key = _admin_key()
    if not key:
        pytest.skip("admin key missing in /app/memory/test_credentials.md")
    return key


@pytest.fixture(scope="session")
def api():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health ---
class TestHealth:
    def test_health(self, api):
        r = api.get(f"{BASE_URL}/api/health", timeout=30)
        assert r.status_code == 200
        assert r.json()["status"] == "ok"

    def test_project_types(self, api):
        r = api.get(f"{BASE_URL}/api/enquiries/project-types", timeout=30)
        assert r.status_code == 200
        types = r.json()["project_types"]
        assert "Modular Kitchen" in types and len(types) == 7


# --- Enquiries ---
class TestEnquiries:
    created = []

    def test_create_valid(self, api):
        payload = {
            "name": "TEST_QA User",
            "phone": "+91 98765 43210",
            "email": "qa_test@example.com",
            "project_type": "Modular Kitchen",
            "requirement": "TEST_ 2BHK kitchen",
            "message": "TEST_ message body",
            "source_page": "/contact",
        }
        r = api.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=30)
        assert r.status_code == 201, r.text
        d = r.json()
        assert isinstance(d["id"], str) and len(d["id"]) > 0
        assert "_id" not in d
        assert d["status"] == "new"
        assert d["created_at"]
        assert d["name"] == payload["name"]
        assert d["project_type"] == "Modular Kitchen"
        TestEnquiries.created.append(d["id"])

    def test_create_email_optional_null(self, api):
        payload = {
            "name": "TEST_NoEmail",
            "phone": "9702039381",
            "email": None,
            "project_type": "Other",
        }
        r = api.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=30)
        assert r.status_code == 201, r.text
        assert r.json()["email"] is None
        TestEnquiries.created.append(r.json()["id"])

    def test_create_empty_email_string(self, api):
        r = api.post(f"{BASE_URL}/api/enquiries", json={
            "name": "TEST_EmptyEmail", "phone": "9702039381",
            "email": "", "project_type": "Bedroom"}, timeout=30)
        assert r.status_code == 201, r.text
        TestEnquiries.created.append(r.json()["id"])

    @pytest.mark.parametrize("payload", [
        {"name": "A", "phone": "9876543210", "project_type": "Bedroom"},
        {"name": "TEST_Bad", "phone": "123", "project_type": "Bedroom"},
        {"name": "TEST_Bad", "phone": "9876543210", "project_type": "Spaceship"},
        {"name": "TEST_Bad", "phone": "9876543210", "email": "not-an-email", "project_type": "Bedroom"},
        {"phone": "9876543210", "project_type": "Bedroom"},
    ])
    def test_create_invalid(self, api, payload):
        r = api.post(f"{BASE_URL}/api/enquiries", json=payload, timeout=30)
        assert r.status_code == 422, f"{payload} -> {r.status_code} {r.text}"

    def test_list_requires_key(self, api):
        r = api.get(f"{BASE_URL}/api/enquiries", timeout=30)
        assert r.status_code == 401

    def test_list_wrong_key(self, api):
        r = api.get(f"{BASE_URL}/api/enquiries", headers={"X-Admin-Key": "wrong"}, timeout=30)
        assert r.status_code == 401

    def test_list_with_key(self, api, admin_key):
        assert TestEnquiries.created, "no created enquiry to verify"
        r = api.get(f"{BASE_URL}/api/enquiries", headers={"X-Admin-Key": admin_key}, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert isinstance(data, list)
        ids = [x["id"] for x in data]
        assert TestEnquiries.created[0] in ids
        item = next(x for x in data if x["id"] == TestEnquiries.created[0])
        assert item["name"] == "TEST_QA User"
        assert item["status"] == "new"
        assert "_id" not in item
