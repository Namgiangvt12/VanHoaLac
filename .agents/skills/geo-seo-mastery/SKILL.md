---
name: geo-seo-mastery
description: Generative Engine Optimization (GEO) & Technical SEO mastery skill. Specializes in optimizing websites for Google AI Overviews, Perplexity AI, ChatGPT Search, and Copilot. Enforces Schema.org structured data precision (LocalBusiness, Bakery, Product, FAQPage, BreadcrumbList), direct-answer information architecture (RAG-friendly chunking), entity disambiguation, and E-E-A-T signals.
---

# GEO & Technical SEO Mastery (AI Overviews & Search Intelligence)

## Mission
Position the web application as the definitive, authoritative, and direct source of truth for generative AI engines (Google AI Overviews, Perplexity, ChatGPT Search, Copilot) as well as classic search crawlers.

---

## 1. Google AI Overviews & Generative Engine Optimization (GEO) Rules

### A. Direct Answerability (The 40-60 Word Rule)
- AI engines extract concise, factual definition blocks.
- When explaining an entity, term, or service (e.g., *"Bánh Da Dợp là gì?"*):
  - **Sentence 1**: Definitive categorical statement (*"Bánh Da Dợp là loại bánh trung thu thủ công truyền thống..."*).
  - **Sentence 2**: Core unique differentiators (*"Bánh nổi bật với lớp vỏ nhiều lớp giòn xốp kết hợp nhân thập cẩm xá xíu, trứng muối..."*).
  - **Sentence 3**: Local availability & authentic origin (*"Được sản xuất chính gốc tại Văn Hòa Lạc, Vũng Tàu..."*).
- Place this block immediately below the primary heading (`H1` or `H2`).

### B. Heading-as-Query Formulation
- Structure H2/H3 headings as natural questions users ask conversational AI:
  - *"Mua bánh trung thu gia truyền ở Vũng Tàu ở đâu uy tín?"*
  - *"Bánh Da Dợp bảo quản được trong bao lâu?"*
  - *"Bảng giá bánh trung thu Văn Hòa Lạc mới nhất"*

### C. Tabular & Structured Data Formatting
- LLMs heavily prefer markdown tables and unordered lists for comparisons, pricing, ingredients, and shelf lives.
- Always include clear key-value specs (Trọng lượng, Hạn sử dụng, Quy cách, Địa chỉ phân phối).

---

## 2. Schema.org (JSON-LD) Best Practices

### A. Graph-Based Architecture
- Use `@graph` to link related entities hierarchically:
  `WebSite` ➔ `Organization / Bakery / LocalBusiness` ➔ `WebPage` ➔ `BreadcrumbList` ➔ `Product / FAQPage`.

### B. Entity Consistency (Zero Geographical Contradiction)
- Never mix geographical regions (e.g., writing "Phường Vũng Tàu, TP. Hồ Chí Minh").
- Exact address format:
  ```json
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "174 Nguyễn Văn Trỗi",
    "addressLocality": "Phường 4, Thành phố Vũng Tàu",
    "addressRegion": "Tỉnh Bà Rịa - Vũng Tàu",
    "postalCode": "790000",
    "addressCountry": "VN"
  }
  ```
- Geo Coordinates: Include verified latitude and longitude.
- `sameAs`: Point to verified Google Maps CID, Facebook Fanpage, and local directory listings.

### C. Mandatory FAQPage Schema
- For every informational or product landing page, provide an `@type: "FAQPage"` node containing top 3-5 real customer questions and authoritative answers.

---

## 3. E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)
- Eliminate exaggerated, unproven claims (*"hàng trăm năm"*, *"100% 5 sao"*).
- Ground claims in verifiable historical facts (*"Gia truyền từ năm 1970 - hơn 50 năm phát triển"*).
- Provide real baker credentials, transparent ingredients, physical store photos, and authentic contact channels.
