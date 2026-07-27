#!/usr/bin/env python3
"""
IndexNow Bulk URL Submission for AI Premium Shop
Submits all 49 URLs to Bing/Yandex/Seznam/Naver instantly.

Usage:
    python scripts/indexnow-submit.py

Requires: site to be live at https://aipremiumshop.com
"""

import json
import urllib.request
import urllib.error

KEY = "f26143587cab1e00690c20c09e9542c8"
HOST = "aipremiumshop.com"
KEY_URL = f"https://{HOST}/{KEY}.txt"

URLS = [
    "https://aipremiumshop.com/",
    "https://aipremiumshop.com/products",
    "https://aipremiumshop.com/blog",
    "https://aipremiumshop.com/about",
    "https://aipremiumshop.com/contact",
    "https://aipremiumshop.com/faq",
    "https://aipremiumshop.com/privacy",
    "https://aipremiumshop.com/terms",
    "https://aipremiumshop.com/chatgpt-vs-claude",
    "https://aipremiumshop.com/chatgpt-vs-gemini",
    "https://aipremiumshop.com/copilot-vs-cursor",
    "https://aipremiumshop.com/midjourney-vs-ideogram",
    "https://aipremiumshop.com/blog/best-ai-tools-bangladesh-2026",
    "https://aipremiumshop.com/blog/how-to-get-chatgpt-plus-bangladesh",
    "https://aipremiumshop.com/blog/pay-ai-tools-bkash-bangladesh",
    # Products
    "https://aipremiumshop.com/products/chatgpt-plus-bangladesh",
    "https://aipremiumshop.com/products/chatgpt-pro-bangladesh",
    "https://aipremiumshop.com/products/chatgpt-business-bangladesh",
    "https://aipremiumshop.com/products/chatgpt-go-bangladesh",
    "https://aipremiumshop.com/products/claude-pro-bangladesh",
    "https://aipremiumshop.com/products/gemini-advanced-bangladesh",
    "https://aipremiumshop.com/products/supergrok-bangladesh",
    "https://aipremiumshop.com/products/perplexity-pro-bangladesh",
    "https://aipremiumshop.com/products/midjourney-bangladesh",
    "https://aipremiumshop.com/products/ideogram-bangladesh",
    "https://aipremiumshop.com/products/leonardo-ai-bangladesh",
    "https://aipremiumshop.com/products/runway-bangladesh",
    "https://aipremiumshop.com/products/heygen-bangladesh",
    "https://aipremiumshop.com/products/elevenlabs-bangladesh",
    "https://aipremiumshop.com/products/suno-ai-bangladesh",
    "https://aipremiumshop.com/products/udio-bangladesh",
    "https://aipremiumshop.com/products/github-copilot-bangladesh",
    "https://aipremiumshop.com/products/cursor-bangladesh",
    "https://aipremiumshop.com/products/v0-dev-bangladesh",
    "https://aipremiumshop.com/products/replit-bangladesh",
    "https://aipremiumshop.com/products/notion-business-bangladesh",
    "https://aipremiumshop.com/products/manus-ai-bangladesh",
    "https://aipremiumshop.com/products/otter-ai-bangladesh",
    "https://aipremiumshop.com/products/gamma-bangladesh",
    "https://aipremiumshop.com/products/writesonic-bangladesh",
    "https://aipremiumshop.com/products/student-package-bangladesh",
    "https://aipremiumshop.com/products/freelancer-bundle-bangladesh",
    "https://aipremiumshop.com/products/business-package-bangladesh",
    "https://aipremiumshop.com/products/b2b-implementation-bangladesh",
]


def submit_indexnow():
    payload = {
        "host": HOST,
        "key": KEY,
        "keyLocation": KEY_URL,
        "urlList": URLS,
    }

    data = json.dumps(payload).encode("utf-8")
    headers = {"Content-Type": "application/json; charset=utf-8"}

    # Bing IndexNow endpoint
    req = urllib.request.Request(
        "https://bing.com/indexnow",
        data=data,
        headers=headers,
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            print(f"Bing IndexNow: HTTP {resp.status}")
            print(f"   Submitted {len(URLS)} URLs")
    except urllib.error.HTTPError as e:
        print(f"Bing IndexNow: HTTP {e.code} - {e.reason}")
        print(f"   Response: {e.read().decode('utf-8', errors='ignore')[:200]}")

    # Also submit to IndexNow.org (multi-engine)
    req2 = urllib.request.Request(
        "https://api.indexnow.org/indexnow",
        data=data,
        headers=headers,
        method="POST",
    )
    try:
        with urllib.request.urlopen(req2, timeout=30) as resp:
            print(f"IndexNow.org: HTTP {resp.status}")
    except urllib.error.HTTPError as e:
        print(f"IndexNow.org: HTTP {e.code} - {e.reason}")


if __name__ == "__main__":
    print(f"Submitting {len(URLS)} URLs to IndexNow...")
    print(f"Key location: {KEY_URL}")
    submit_indexnow()
