import fs from 'node:fs/promises';
import path from 'node:path';

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(name);
  if (idx === -1) return fallback;
  return process.argv[idx + 1] ?? fallback;
}

function nowStamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`;
}

function safeJsonParse(s) {
  try { return JSON.parse(s); } catch { return null; }
}

const inputPath = arg('--input');
const outRoot = arg('--out-root', path.resolve('ai-orchestrator', 'runs'));
const chatModel = arg('--chat-model', 'gpt-4.1-mini');
const videoModel = arg('--video-model', 'sora-2');
const videoSeconds = arg('--video-seconds', '12');

if (!inputPath) throw new Error('Missing --input <product.json>');

const key = process.env.OPENAI_API_KEY || process.env.OPENAI_KEY_ANALYST || process.env.OPENAI_KEY_VIDEO;
if (!key) throw new Error('Missing OPENAI_API_KEY (or OPENAI_KEY_ANALYST/OPENAI_KEY_VIDEO)');

const product = JSON.parse(await fs.readFile(inputPath, 'utf8'));
const ts = nowStamp();
const outDir = path.join(outRoot, `affiliate-${ts}`);
await fs.mkdir(outDir, { recursive: true });

await fs.writeFile(path.join(outDir, 'affiliate_input.json'), JSON.stringify(product, null, 2), 'utf8');

const system = `You are an affiliate marketing strategist and SEO writer. Return STRICT JSON with keys:\n- market_scan: { similar_products: [{name, key_features, price_range, positioning}], inferred_features: string[], target_persona: string[], usp_hypothesis: string[] }\n- seo_article_markdown: string\n- video_script_markdown: string\n- video_prompt: string\nRules:\n1) Write in Vietnamese.\n2) SEO article must have: title, meta description, H2/H3, CTA, natural keyword usage.\n3) Script should be engaging, concise, avoid repetitive phrasing.`;

const user = `Input product:\n${JSON.stringify(product, null, 2)}\n\nTasks:\n1) Analyze similar products and infer likely features.\n2) Write SEO article for affiliate conversion.\n3) Write short-form video script.\n4) Generate one high-quality video prompt for text-to-video.`;

const chatResp = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: chatModel,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    temperature: 0.4,
    max_tokens: 2600,
    response_format: { type: 'json_object' },
  }),
});

if (!chatResp.ok) {
  const t = await chatResp.text();
  throw new Error(`Chat API failed ${chatResp.status}: ${t}`);
}

const chatJson = await chatResp.json();
const content = chatJson?.choices?.[0]?.message?.content ?? '{}';
const analyzed = safeJsonParse(content) || {};

await fs.writeFile(path.join(outDir, 'affiliate_analysis.json'), JSON.stringify(analyzed.market_scan ?? {}, null, 2), 'utf8');
await fs.writeFile(path.join(outDir, 'seo_article.md'), analyzed.seo_article_markdown ?? '', 'utf8');
await fs.writeFile(path.join(outDir, 'video_script.md'), analyzed.video_script_markdown ?? '', 'utf8');

const videoPrompt = analyzed.video_prompt || `Create a 12-second vertical 9:16 promotional video in Vietnamese for: ${product.product_name}`;
const videoReq = {
  model: videoModel,
  prompt: videoPrompt,
  seconds: String(videoSeconds),
  size: '720x1280',
};
await fs.writeFile(path.join(outDir, 'video_request.json'), JSON.stringify(videoReq, null, 2), 'utf8');

const fd = new FormData();
fd.append('model', videoModel);
fd.append('prompt', videoPrompt);
fd.append('seconds', String(videoSeconds));
fd.append('size', '720x1280');

const videoResp = await fetch('https://api.openai.com/v1/videos', {
  method: 'POST',
  headers: { Authorization: `Bearer ${key}` },
  body: fd,
});

const videoText = await videoResp.text();
let videoJson = safeJsonParse(videoText);
if (!videoJson) videoJson = { raw: videoText };

if (!videoResp.ok) {
  videoJson = {
    status: 'failed',
    error: videoJson,
  };
}

await fs.writeFile(path.join(outDir, 'video_create_response.json'), JSON.stringify(videoJson, null, 2), 'utf8');

console.log(outDir);
console.log(JSON.stringify({
  chatModel,
  videoModel,
  videoStatus: videoJson.status || videoJson?.data?.status || 'unknown',
  videoId: videoJson.id || videoJson?.data?.id || null,
}, null, 2));
