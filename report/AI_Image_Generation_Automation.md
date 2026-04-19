# AI 圖片生成自動化指南

> 最後更新：2026-04-11  
> 目標：從提示詞批次生成圖片，自動送入 AI 繪圖服務完成輸出，並整合至 money_tutor 專案圖片系統

---

## 零、本指南適用範圍

本指南針對 **money_tutor 專案**的圖片補充需求，涵蓋：

| 用途 | 說明 | 相關報告 |
|------|------|---------|
| B 系列場景圖示 | `images/b1/` 等目錄的 `icon-bX-*.png` | `B1_Image_Audit_Report.md` |
| C 系列商品圖示 | `images/c5/`、`images/c6/` 的 `icon-cX-*.png` | — |
| 首頁縮圖 | `images/index/icon-index-*.png` | — |
| 作業單圖片 | WebP 格式，供 base64 嵌入 worksheet PDF | `Worksheet_Unit_Completion_Report.md` |

### 命名規則（money_tutor 專案）

```
images/{單元}/icon-{單元}-{難度}-{場景slug}.png

範例：
  icon-b1-easy-buy-snack.png        ← B1 簡單模式，吃點心
  icon-b1-normal-school-day.png     ← B1 普通模式，上學日
  icon-b1-hard-amusement-park.png   ← B1 困難模式，遊樂園
  icon-c5-toy-car.png               ← C5 玩具車（無難度前綴）
```

---

## 一、整體可行方案比較

| 方案 | 難度 | 是否需付費 | 速度 | 推薦度 |
|------|------|-----------|------|--------|
| **A. Gemini API（程式）** | 低 | 免費額度 / 付費 | 最快 | ⭐⭐⭐⭐⭐ |
| **B. Google AI Studio 手動** | 極低 | 免費 | 慢（手動） | ⭐⭐ |
| **C. Playwright 自動化瀏覽器** | 中 | 免費 | 快 | ⭐⭐⭐⭐ |
| **D. Canva API / Canva MCP** | 中-高 | 需 Canva Pro | 中 | ⭐⭐⭐ |
| **E. Imagen 3 API（Google Cloud）** | 中 | 付費（少量免費） | 最快 | ⭐⭐⭐⭐⭐ |

---

## 二、方案 A：使用 Gemini API（最推薦）

### 前置準備

1. 前往 [Google AI Studio](https://aistudio.google.com/apikey) 申請免費 API Key
2. 安裝 Python 套件：
   ```bash
   pip install google-generativeai pillow
   ```
3. 建立 `prompts.json`（見第五節）
4. 建立 `generate_images.py`（見下方腳本）

### 完整操作流程

```
步驟 1：申請 API Key
         → https://aistudio.google.com/apikey

步驟 2：安裝依賴
         pip install google-generativeai pillow

步驟 3：建立 prompts.json（填入所有提示詞）

步驟 4：修改腳本中的 API_KEY，執行
         python generate_images.py

步驟 5：確認 generated_images/ 資料夾內的圖片

步驟 6：將圖片移至 images/b1/（或對應資料夾）

步驟 7：在 JS 場景資料中補上 imageFile 欄位
```

### Python 完整腳本（generate_images.py）

```python
import google.generativeai as genai
import json, os, time, random
from PIL import Image
import io

# ── 設定 ──────────────────────────────────────────────────────
API_KEY      = "YOUR_GEMINI_API_KEY"   # ← 填入你的 API Key
PROMPTS_FILE = "prompts.json"          # 提示詞清單
OUTPUT_DIR   = "generated_images"      # 輸出資料夾
DELAY_SEC    = 4                       # 每張之間的間隔（秒）
MAX_RETRY    = 3                       # 失敗最多重試次數

# ── 初始化 ────────────────────────────────────────────────────
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash-exp-image-generation")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ── 讀取提示詞 ────────────────────────────────────────────────
with open(PROMPTS_FILE, "r", encoding="utf-8") as f:
    prompts = json.load(f)

print(f"共 {len(prompts)} 張圖片待生成\n")

success, failed = [], []

def generate_one(item):
    """生成單張圖片，含重試邏輯。回傳 True/False。"""
    out_path = os.path.join(OUTPUT_DIR, item["filename"])
    if os.path.exists(out_path):
        print(f"  ⏭  已存在，略過")
        return True

    for attempt in range(1, MAX_RETRY + 1):
        try:
            response = model.generate_content(
                item["prompt"],
                generation_config={"response_modalities": ["image", "text"]}
            )
            for part in response.candidates[0].content.parts:
                if hasattr(part, "inline_data") and part.inline_data:
                    img = Image.open(io.BytesIO(part.inline_data.data))
                    img.save(out_path, format="PNG")
                    print(f"  ✅ 已儲存：{item['filename']}  ({img.width}×{img.height})")
                    return True
            raise ValueError("回應中無圖片資料")

        except Exception as e:
            if attempt < MAX_RETRY:
                wait = DELAY_SEC * attempt + random.uniform(0, 2)
                print(f"  ⚠️  第 {attempt} 次失敗（{e}），{wait:.1f}s 後重試...")
                time.sleep(wait)
            else:
                print(f"  ❌ 失敗（已重試 {MAX_RETRY} 次）：{e}")
                return False

for i, item in enumerate(prompts, 1):
    print(f"[{i}/{len(prompts)}] 生成中：{item['filename']}")
    if generate_one(item):
        success.append(item["filename"])
    else:
        failed.append(item)
    time.sleep(DELAY_SEC)

# ── 結果摘要 ──────────────────────────────────────────────────
print(f"\n{'='*50}")
print(f"完成：{len(success)} 張成功 / {len(failed)} 張失敗")
if failed:
    print("\n失敗清單：")
    for f in failed:
        print(f"  - {f['filename']}")
    with open("failed_prompts.json", "w", encoding="utf-8") as fout:
        json.dump(failed, fout, ensure_ascii=False, indent=2)
    print("\n已將失敗項目存為 failed_prompts.json（可修改後重試）")
```

### 注意事項

| 項目 | 說明 |
|------|------|
| 速率限制 | 免費版每分鐘約 15 請求，`DELAY_SEC = 4` 可安全執行 |
| 圖片格式 | 腳本強制輸出 PNG；若原始為 JPEG 也會轉換 |
| 重試機制 | 失敗自動重試 3 次（指數退避），最終失敗存 `failed_prompts.json` |
| 背景透明 | 提示詞加 `"transparent background"` 或用 `rembg` 套件後處理 |
| 版權 | Gemini 生成圖片可用於個人 / 教育用途 |
| 已存在略過 | `os.path.exists()` 檢查，重跑不會覆蓋已有圖片 |

---

## 三、方案 C：Playwright 自動化瀏覽器

適用情境：不想申請 API，想直接操控 Gemini 網頁或 ImageFX。

### 前置準備

```bash
pip install playwright
playwright install chromium
```

### 完整操作流程

```
步驟 1：安裝 Playwright
         pip install playwright && playwright install chromium

步驟 2：執行腳本（首次會開啟瀏覽器，需手動登入 Google）
         python playwright_imagefx.py

步驟 3：登入後腳本自動逐一輸入提示詞並下載圖片

步驟 4：圖片存入 generated_images/ 資料夾
```

### Python 完整腳本（playwright_imagefx.py）

```python
import asyncio, json, os
from playwright.async_api import async_playwright

PROMPTS_FILE = "prompts.json"
OUTPUT_DIR   = "generated_images"
IMAGEFX_URL  = "https://aitestkitchen.withgoogle.com/tools/image-fx"
WAIT_MS      = 10000    # 等待圖片生成（毫秒）
HEADLESS     = False    # False = 顯示瀏覽器（便於手動登入）

os.makedirs(OUTPUT_DIR, exist_ok=True)

with open(PROMPTS_FILE, "r", encoding="utf-8") as f:
    prompts = json.load(f)

async def download_image(page, src, filename):
    response = await page.request.get(src)
    content  = await response.body()
    with open(os.path.join(OUTPUT_DIR, filename), "wb") as f:
        f.write(content)

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=HEADLESS)
        context = await browser.new_context()
        page    = await context.new_page()

        print("前往 ImageFX，請在瀏覽器中手動登入 Google...")
        await page.goto(IMAGEFX_URL)
        await page.wait_for_timeout(5000)

        print("請在瀏覽器中完成登入，登入後按 Enter 繼續...")
        input()

        for i, item in enumerate(prompts, 1):
            filename = item["filename"]
            out_path = os.path.join(OUTPUT_DIR, filename)

            if os.path.exists(out_path):
                print(f"[{i}] ⏭  已存在：{filename}")
                continue

            print(f"[{i}/{len(prompts)}] 生成中：{filename}")

            try:
                textarea = page.locator("textarea").first
                await textarea.fill("")
                await textarea.fill(item["prompt"])
                await page.keyboard.press("Enter")
                await page.wait_for_timeout(WAIT_MS)

                # 選擇器需依實際 DOM 調整（F12 確認）
                img_el = page.locator(".generated-image img, [data-testid='image-result'] img").first
                if await img_el.count() > 0:
                    src = await img_el.get_attribute("src")
                    if src and src.startswith("http"):
                        await download_image(page, src, filename)
                        print(f"  ✅ 已儲存：{filename}")
                    else:
                        await img_el.screenshot(path=out_path)
                        print(f"  ✅（截圖）已儲存：{filename}")
                else:
                    print(f"  ⚠️  找不到圖片元素，略過")

            except Exception as e:
                print(f"  ❌ 失敗：{e}")

            await page.wait_for_timeout(2000)

        await browser.close()
        print("\n完成！")

asyncio.run(main())
```

> **注意**：ImageFX 的 DOM 結構會因更新而改變，需依實際元素調整 `.generated-image img` 選擇器。  
> 可在瀏覽器開發者工具（F12）中確認正確的選擇器。

---

## 四、方案 E：Google Imagen 3 API（品質最佳）

Google Cloud Vertex AI 提供 Imagen 3，圖片品質高於 Gemini。

### 前置準備

1. 建立 Google Cloud 專案並啟用 Vertex AI API
2. 安裝 Google Cloud SDK 並登入：
   ```bash
   gcloud auth application-default login
   pip install google-cloud-aiplatform pillow
   ```

### 完整操作流程

```
步驟 1：建立 GCP 專案，啟用 Vertex AI API
         → https://console.cloud.google.com/

步驟 2：安裝 SDK 並登入
         gcloud auth application-default login

步驟 3：安裝 Python 套件
         pip install google-cloud-aiplatform pillow

步驟 4：設定 PROJECT_ID 後執行
         python imagen3_generate.py

步驟 5：圖片存入 generated_images/ 資料夾
```

### Python 完整腳本（imagen3_generate.py）

```python
import vertexai, json, os, time
from vertexai.preview.vision_models import ImageGenerationModel

PROJECT_ID   = "YOUR_GCP_PROJECT_ID"   # ← 填入 GCP 專案 ID
LOCATION     = "us-central1"
PROMPTS_FILE = "prompts.json"
OUTPUT_DIR   = "generated_images"
DELAY_SEC    = 3

vertexai.init(project=PROJECT_ID, location=LOCATION)
model = ImageGenerationModel.from_pretrained("imagen-3.0-generate-001")
os.makedirs(OUTPUT_DIR, exist_ok=True)

with open(PROMPTS_FILE, "r", encoding="utf-8") as f:
    prompts = json.load(f)

print(f"共 {len(prompts)} 張圖片待生成\n")
success, failed = [], []

for i, item in enumerate(prompts, 1):
    print(f"[{i}/{len(prompts)}] 生成中：{item['filename']}")
    out_path = os.path.join(OUTPUT_DIR, item["filename"])

    if os.path.exists(out_path):
        print(f"  ⏭  已存在，略過")
        success.append(item["filename"])
        continue

    try:
        images = model.generate_images(
            prompt=item["prompt"],
            number_of_images=1,
            aspect_ratio="1:1",
            safety_filter_level="block_some",
            person_generation="dont_allow",
        )
        images[0].save(location=out_path, include_generation_parameters=False)
        print(f"  ✅ 已儲存：{item['filename']}")
        success.append(item["filename"])
    except Exception as e:
        print(f"  ❌ 失敗：{e}")
        failed.append(item["filename"])

    time.sleep(DELAY_SEC)

print(f"\n完成：{len(success)} 成功 / {len(failed)} 失敗")
```

---

## 五、提示詞 JSON 範例與模板

### 5-1 通用提示詞結構

```json
[
  {
    "filename": "icon-b1-easy-buy-snack.png",
    "prompt": "Cute cartoon flat icon of a child happily eating a bowl of noodle snack, simple flat design, white background, no text, 256x256px style, vibrant colors, consistent icon style"
  }
]
```

### 5-2 提示詞撰寫要點

| 要素 | 建議寫法 | 說明 |
|------|---------|------|
| 風格 | `cute cartoon flat icon` / `flat design` | 統一視覺風格 |
| 背景 | `white background` | 與遊戲卡片背景融合 |
| 文字 | `no text` | 避免 AI 生成亂碼文字 |
| 尺寸 | `256x256px style` / `square format` | 圖示正方形 |
| 一致性 | `consistent icon style, vibrant colors` | 每個提示詞都加 |
| 主角 | 明確描述主體（人物、物品、場景） | — |
| 禁止 | 避免 `realistic` / `photographic` | 保持卡通風格 |

### 5-3 B1 場景完整提示詞（待生成清單）

依 `B1_Image_Audit_Report.md`，目前唯一缺圖的場景：

```json
[
  {
    "filename": "icon-b1-easy-buy-snack.png",
    "prompt": "Cute cartoon flat icon of a happy child eating a bowl of warm noodle snack at a small table, simple flat design, white background, no text, vibrant colors, consistent icon style"
  }
]
```

可選追加（有圖但無場景對應，可建立新場景）：

```json
[
  {
    "filename": "icon-b1-hard-claw-machine.png",
    "note": "夾娃娃機（已存在於資料夾，可新增 hard 場景使用）"
  },
  {
    "filename": "icon-b1-hard-see-doctor.png",
    "note": "看診困難版（已存在，可新增 hard 看診場景）"
  },
  {
    "filename": "icon-b1-hard-take-train.png",
    "note": "搭火車困難版（已存在，可新增 hard 搭火車旅行場景）"
  }
]
```

### 5-4 B 系列其他單元提示詞模板

```json
[
  {
    "filename": "icon-b2-theme-school.png",
    "prompt": "Cute cartoon flat icon representing school theme for a diary app, backpack and pencil, flat design, white background, no text, vibrant colors"
  },
  {
    "filename": "icon-b3-goal-toy.png",
    "prompt": "Cute cartoon flat icon of a child saving coins in a piggy bank to buy a toy, flat design, white background, no text"
  },
  {
    "filename": "icon-b4-sale-compare.png",
    "prompt": "Cute cartoon flat icon showing two price tags being compared, sale discount symbols, flat design, white background, no text"
  },
  {
    "filename": "icon-b5-party-cake.png",
    "prompt": "Cute cartoon flat icon of a birthday cake with candles and colorful decorations, flat design, white background, no text"
  },
  {
    "filename": "icon-b6-market-veggie.png",
    "prompt": "Cute cartoon flat icon of fresh vegetables at a market stall, flat design, white background, no text"
  }
]
```

### 5-5 C 系列商品補圖提示詞模板

C5 缺少 `icon-c5-toy-car.png`（玩具車）：

```json
[
  {
    "filename": "icon-c5-toy-car.png",
    "prompt": "Cute cartoon flat icon of a colorful toy car, simple flat design, white background, no text, vibrant colors, consistent icon style"
  }
]
```

---

## 六、使用 Claude Code 輔助（CoWork 模式）

在 Claude Code CLI 環境中，可讓 Claude 全程協助：

### 完整流程

```
1. 生成提示詞
   你：「幫我為以下場景清單生成英文圖片提示詞，輸出為 prompts.json」

2. 執行生成腳本（在 Claude Code 中用 ! 前綴執行）
   你：「! python generate_images.py」

3. 確認結果
   Claude 讀取 generated_images/ 清單，確認哪些成功 / 失敗

4. 移動圖片到正確位置
   你：「將 generated_images/ 的圖片複製到 images/b1/」
   Claude：用 Bash 工具執行 cp / xcopy

5. 更新 JS 場景資料
   你：「在 b1_daily_budget.js 的對應場景中補上 imageFile 欄位」
   Claude：用 Edit 工具更新 B1_SCENARIOS
```

### 在 Claude Code 中執行腳本

```bash
# 直接執行（在 Claude Code prompt 輸入）
! python generate_images.py

# 重試失敗的圖片
! python generate_images.py --input failed_prompts.json

# 移動圖片到 B1 資料夾（Windows）
! xcopy /Y generated_images\icon-b1-*.png ..\images\b1\

# 移動圖片到 B1 資料夾（Mac/Linux）
! cp generated_images/icon-b1-*.png ../images/b1/
```

---

## 七、圖片後處理

### 7-1 批次去背（透明背景）

```bash
pip install rembg pillow
```

```python
from rembg import remove
from PIL import Image
import os

INPUT_DIR  = "generated_images"
OUTPUT_DIR = "transparent_images"
os.makedirs(OUTPUT_DIR, exist_ok=True)

for fname in os.listdir(INPUT_DIR):
    if not fname.endswith(".png"):
        continue
    inp = Image.open(os.path.join(INPUT_DIR, fname))
    out = remove(inp)
    out.save(os.path.join(OUTPUT_DIR, fname))
    print(f"去背完成：{fname}")
```

### 7-2 批次調整尺寸

```python
from PIL import Image
import os

TARGET_SIZE = (256, 256)   # 遊戲場景圖示標準尺寸
INPUT_DIR   = "generated_images"

for fname in os.listdir(INPUT_DIR):
    if not fname.endswith(".png"):
        continue
    path = os.path.join(INPUT_DIR, fname)
    img  = Image.open(path).convert("RGBA")
    img  = img.resize(TARGET_SIZE, Image.LANCZOS)
    img.save(path)
    print(f"已調整：{fname} → {TARGET_SIZE[0]}×{TARGET_SIZE[1]}")
```

### 7-3 批次轉換 PNG → WebP（作業單 PDF 系統專用）

money_tutor 作業單 PDF 下載系統使用 **WebP 格式 + base64 嵌入**（詳見 `Worksheet_Unit_Completion_Report.md §十`）。若需新增圖片至作業單，須先轉為 WebP：

```python
from PIL import Image
import os

INPUT_DIR   = "generated_images"   # PNG 來源
OUTPUT_DIR  = "webp_output"        # WebP 輸出
RESIZE_PX   = 250                  # 作業單標準：250px（A 系列），220px（含商品）
QUALITY     = 82                   # 作業單標準：q82

os.makedirs(OUTPUT_DIR, exist_ok=True)

for fname in os.listdir(INPUT_DIR):
    if not fname.endswith(".png"):
        continue
    stem     = os.path.splitext(fname)[0]
    out_path = os.path.join(OUTPUT_DIR, stem + ".webp")

    img = Image.open(os.path.join(INPUT_DIR, fname)).convert("RGBA")
    # 等比縮放至長邊 RESIZE_PX
    img.thumbnail((RESIZE_PX, RESIZE_PX), Image.LANCZOS)
    img.save(out_path, format="WEBP", quality=QUALITY)
    print(f"已轉換：{fname} → {stem}.webp  ({img.width}×{img.height})")

print(f"\n完成！輸出至 {OUTPUT_DIR}/")
```

> **作業單 base64 規格對照**（各系列標準）：
>
> | 系列 | 尺寸 | 品質 | globalVar |
> |------|------|------|-----------|
> | 硬幣/紙鈔 | 300px | q85 | `CoinImagesBase64` |
> | A1/A2 | 250px | q82 | `A1ImagesBase64` |
> | A3/A4 | 220px | q80 | `A3ImagesBase64` |

### 7-4 批次生成 base64 JS 檔案

```python
import base64, json, os

WEBP_DIR    = "webp_output"
OUTPUT_FILE = "js/b1-images-base64.js"   # 輸出至 worksheet/js/
VAR_NAME    = "B1ImagesBase64"

data = {}
for fname in sorted(os.listdir(WEBP_DIR)):
    if not fname.endswith(".webp"):
        continue
    with open(os.path.join(WEBP_DIR, fname), "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
    key = os.path.splitext(fname)[0]   # 去掉 .webp 副檔名
    data[key] = f"data:image/webp;base64,{b64}"
    print(f"  加入：{fname}  ({len(b64)//1024} KB)")

# 注意：必須用 window.X = window.X || {...}（不可 const，const 不掛 window）
js_content = f"window.{VAR_NAME} = window.{VAR_NAME} || {json.dumps(data, ensure_ascii=False, indent=2)};\n"
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"\n已生成 {OUTPUT_FILE}（{len(data)} 張，{os.path.getsize(OUTPUT_FILE)//1024} KB）")
```

---

## 八、圖片驗證腳本

執行後可確認 JS 場景資料與圖片資料夾的對應是否完整：

```python
import os, re, json

# ── 設定 ──────────────────────────────────────────────────────
JS_FILE    = "../js/b1_daily_budget.js"    # 場景 JS
IMAGE_DIR  = "../images/b1"                # 圖片資料夾
UNIT       = "b1"

# ── 讀取 JS 中所有 imageFile 值 ───────────────────────────────
with open(JS_FILE, "r", encoding="utf-8") as f:
    content = f.read()

referenced = set(re.findall(r'imageFile\s*:\s*["\']([^"\']+)["\']', content))
print(f"JS 中引用的圖片：{len(referenced)} 個")

# ── 讀取資料夾中的圖片 ────────────────────────────────────────
if os.path.exists(IMAGE_DIR):
    existing = set(os.listdir(IMAGE_DIR))
else:
    existing = set()
print(f"資料夾中的圖片：{len(existing)} 個\n")

# ── 交叉比對 ──────────────────────────────────────────────────
missing  = referenced - existing    # JS 有引用但資料夾缺少
orphaned = existing - referenced    # 資料夾有但 JS 未引用

if missing:
    print(f"❌ 缺少圖片（{len(missing)} 個）：")
    for f in sorted(missing):
        print(f"   {f}")
else:
    print("✅ 所有引用的圖片均存在")

if orphaned:
    print(f"\n⚠️  未使用的圖片（{len(orphaned)} 個）：")
    for f in sorted(orphaned):
        print(f"   {f}")
```

### 執行方式

```bash
# 在 money_tutor/report/ 目錄執行
python verify_images.py

# 或在 Claude Code 中
! python verify_images.py
```

---

## 九、B 系列待補圖片彙整（截至 2026-04-11）

依各單元稽核結果彙整，優先順序由高到低：

### B1（詳見 `B1_Image_Audit_Report.md`）

| 優先度 | 檔案名稱 | 對應場景 | 狀態 |
|--------|---------|---------|------|
| 🔴 高 | `icon-b1-easy-buy-snack.png` | 吃點心 🍜（easy） | 資料夾缺少，需生成 |
| 🟡 低 | 可新增 hard「夾娃娃機」場景 | — | 圖已有（`icon-b1-hard-claw-machine.png`），JS 無場景 |
| 🟡 低 | 可新增 hard「看診」場景 | — | 圖已有（`icon-b1-hard-see-doctor.png`），JS 無場景 |
| 🟡 低 | 可新增 hard「搭火車旅行」場景 | — | 圖已有（`icon-b1-hard-take-train.png`），JS 無場景 |

### C5（依 CLAUDE.md 記載）

| 優先度 | 檔案名稱 | 對應場景 | 狀態 |
|--------|---------|---------|------|
| 🟡 低 | `icon-c5-toy-car.png` | 玩具車 | JS 有引用但資料夾缺少 |

---

## 十、注意事項彙整

| 項目 | 說明 |
|------|------|
| 圖片一致性 | 每次生成風格可能略有不同，建議在提示詞加 `flat design, consistent icon style` |
| 速率限制 | Gemini 免費版每分鐘約 15 請求，腳本加 `time.sleep(4)` |
| 重試邏輯 | 腳本已內建指數退避重試（最多 3 次），`failed_prompts.json` 可再次執行 |
| PNG 格式 | 腳本強制 `format='PNG'`，即使 API 回傳 JPEG 也會轉換 |
| WebP 轉換 | 作業單 PDF 系統需 WebP + base64（詳見第七節 §7-3） |
| base64 宣告 | 必須用 `window.X = window.X || {...}`，不可用 `const` |
| 版權 | Gemini / Imagen 生成圖片可用於個人 / 教育用途 |
| 背景去除 | 提示詞加 `white background`，或用 `rembg` 後處理 |
| 選擇器維護 | Playwright 方案的 DOM 選擇器需隨網頁更新而調整（F12 確認） |
| 驗證流程 | 新增圖片後執行 `verify_images.py` 確認 JS 與資料夾對應正確 |
