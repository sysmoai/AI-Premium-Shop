#!/usr/bin/env python3
"""Regenerate sitemap.xml from products.json with current dates"""
import json, os, sys
from datetime import date

today = date.today().isoformat()
base = "https://aipremiumshop.com"
prod_path = os.path.join(os.path.dirname(__file__), "..", "artifacts", "aips-landing", "data", "products.json")

with open(prod_path) as f:
    data = json.load(f)
products = data["products"]

urls = set()

# Core pages
core = [
    ("/", "1.0", "weekly"), ("/products", "0.9", "weekly"), ("/pricing", "0.8", "weekly"),
    ("/about", "0.6", "monthly"), ("/contact", "0.6", "monthly"), ("/faq", "0.6", "monthly"),
    ("/support", "0.6", "monthly"), ("/how-to-order", "0.7", "monthly"),
    ("/refund-policy", "0.4", "yearly"), ("/terms", "0.4", "yearly"), ("/privacy-policy", "0.4", "yearly"),
]
for url, pri, freq in core:
    urls.add((url, today, freq, pri))

# Categories
cats = [
    ("ai-assistant", "0.8"), ("ai-image", "0.8"), ("ai-video", "0.8"),
    ("ai-voice-music", "0.8"), ("ai-code", "0.8"), ("ai-workspace", "0.8"),
    ("ai-writing", "0.8"), ("ai-design", "0.85"), ("bundles", "0.7"),
]
for slug, pri in cats:
    urls.add((f"/{slug}", today, "weekly", pri))

# Unique product slugs
product_slugs = sorted(set(p["slug"] for p in products))
for slug in product_slugs:
    urls.add((f"/{slug}", today, "weekly", "0.85"))
    urls.add((f"/product/{slug}", today, "weekly", "0.9"))

# Guide pages
for guide in ["students","freelancers","creators","business","developers",
              "job-seekers","designers","marketers","ecommerce"]:
    urls.add((f"/best-ai-for-{guide}", today, "monthly", "0.7"))
urls.add(("/best-ai-subscription-2026", today, "monthly", "0.8"))

# Comparison pages
for comp in ["chatgpt-vs-claude","chatgpt-vs-gemini","copilot-vs-cursor","midjourney-vs-ideogram"]:
    urls.add((f"/{comp}", today, "monthly", "0.7"))

# Budget
for budget in ["best-ai-budget-bangladesh","ai-under-500","ai-under-1000","ai-under-3000"]:
    urls.add((f"/{budget}", today, "monthly", "0.7"))

# Blog
urls.add(("/blog", today, "weekly", "0.8"))
blog_posts = [
    "best-ai-tools-bangladesh-2026","chatgpt-vs-claude-bangladesh",
    "how-to-get-chatgpt-plus-bangladesh","midjourney-bangladesh-guide",
    "ai-tools-for-freelancers-bangladesh","earn-money-with-ai-bangladesh",
    "ai-tools-university-students-bangladesh","pay-ai-tools-bkash-bangladesh",
    "chatgpt-plus-vs-free-bangladesh","ai-freelancing-guide-bangladesh",
]
for post in blog_posts:
    pri = "0.8" if any(k in post for k in ["best","earn","students","freelancing"]) else "0.7"
    urls.add((f"/blog/{post}", today, "monthly", pri))

# Extra routes
extra = [
    ("/chatgpt-vs-claude-bangladesh","0.7"), ("/chatgpt-plans-comparison-bangladesh","0.7"),
    ("/google-ai-pro-bangladesh","0.8"),
]
for url, pri in extra:
    urls.add((url, today, "monthly", pri))

# Generate XML
xml = ['<?xml version="1.0" encoding="UTF-8"?>',
       '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']

for loc, lastmod, freq, pri in sorted(urls):
    xml.append(f'  <url>')
    xml.append(f'    <loc>{base}{loc}</loc>')
    xml.append(f'    <lastmod>{lastmod}</lastmod>')
    xml.append(f'    <changefreq>{freq}</changefreq>')
    xml.append(f'    <priority>{pri}</priority>')
    xml.append(f'  </url>')

xml.append('</urlset>')

out_path = os.path.join(os.path.dirname(__file__), "..", "artifacts", "aips-landing", "public", "sitemap.xml")
with open(out_path, 'w') as f:
    f.write('\n'.join(xml))

print(f"Generated sitemap: {len(urls)} URLs across {len(product_slugs)} products")
