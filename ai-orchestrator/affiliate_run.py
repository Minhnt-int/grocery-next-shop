import argparse
import json
import os
from datetime import datetime
from pathlib import Path

import requests

ANALYST_SYSTEM = """You are an affiliate marketing strategist and SEO writer.
Return STRICT JSON with keys:
- market_scan: { similar_products: [{name, key_features, price_range, positioning}], inferred_features: string[], target_persona: string[], usp_hypothesis: string[] }
- seo_article_markdown: string
- video_script_markdown: string
- video_prompt: string
Rules:
1) Write in Vietnamese if input language=vi.
2) SEO article must have: title, meta description, H2/H3, CTA, natural keyword usage.
3) Script should be engaging, concise, avoid repetitive phrasing.
No markdown wrapper around JSON.
"""


def call_chat(base_url, api_key, model, system, user, temperature=0.4, max_tokens=2600):
    url = base_url.rstrip("/") + "/chat/completions"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": temperature,
        "max_tokens": max_tokens,
        "response_format": {"type": "json_object"},
    }
    r = requests.post(url, headers=headers, json=payload, timeout=180)
    r.raise_for_status()
    return json.loads(r.json()["choices"][0]["message"]["content"])


def create_video(base_url, api_key, model, prompt, seconds="8"):
    # Per OpenAI Videos API create endpoint
    url = base_url.rstrip("/") + "/videos"
    headers = {"Authorization": f"Bearer {api_key}"}
    data = {
        "model": model,
        "prompt": prompt,
        "seconds": str(seconds),
        "size": "720x1280",
    }
    r = requests.post(url, headers=headers, data=data, timeout=180)
    r.raise_for_status()
    return r.json()


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--input", required=True, help="product input json")
    p.add_argument("--chat-base-url", default="https://api.openai.com/v1")
    p.add_argument("--video-base-url", default="https://api.openai.com/v1")
    p.add_argument("--chat-model", default="gpt-4.1")
    p.add_argument("--video-model", default="sora-2")
    p.add_argument("--video-seconds", default="8", choices=["8", "12"])
    p.add_argument("--chat-key-env", default="OPENAI_KEY_ANALYST")
    p.add_argument("--video-key-env", default="OPENAI_KEY_VIDEO")
    args = p.parse_args()

    input_path = Path(args.input)
    product = json.loads(input_path.read_text(encoding="utf-8"))

    chat_key = os.getenv(args.chat_key_env)
    video_key = os.getenv(args.video_key_env)
    if not chat_key:
        raise RuntimeError(f"Missing env: {args.chat_key_env}")
    if not video_key:
        raise RuntimeError(f"Missing env: {args.video_key_env}")

    ts = datetime.now().strftime("%Y%m%d-%H%M%S")
    out = Path.cwd() / "runs" / f"affiliate-{ts}"
    out.mkdir(parents=True, exist_ok=True)

    (out / "affiliate_input.json").write_text(
        json.dumps(product, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    user_prompt = (
        "Input product:\n" + json.dumps(product, ensure_ascii=False, indent=2) +
        "\n\nTasks:\n"
        "1) Analyze similar products and infer likely features.\n"
        "2) Write SEO article for affiliate conversion.\n"
        "3) Write short-form video script.\n"
        "4) Generate one high-quality video prompt for text-to-video."
    )

    analyzed = call_chat(
        args.chat_base_url,
        chat_key,
        args.chat_model,
        ANALYST_SYSTEM,
        user_prompt,
    )

    (out / "affiliate_analysis.json").write_text(
        json.dumps(analyzed.get("market_scan", {}), ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    (out / "seo_article.md").write_text(
        analyzed.get("seo_article_markdown", ""), encoding="utf-8"
    )
    (out / "video_script.md").write_text(
        analyzed.get("video_script_markdown", ""), encoding="utf-8"
    )

    video_prompt = analyzed.get("video_prompt", "")
    req = {
        "model": args.video_model,
        "prompt": video_prompt,
        "seconds": str(args.video_seconds),
        "size": "720x1280",
    }
    (out / "video_request.json").write_text(
        json.dumps(req, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    video_resp = create_video(
        args.video_base_url,
        video_key,
        args.video_model,
        video_prompt,
        seconds=args.video_seconds,
    )
    (out / "video_create_response.json").write_text(
        json.dumps(video_resp, ensure_ascii=False, indent=2), encoding="utf-8"
    )

    print(f"Done: {out}")


if __name__ == "__main__":
    main()
