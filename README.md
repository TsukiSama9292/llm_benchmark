# 本儲存庫用於紀錄 LLM 的跑分紀錄

> 使用 [EleutherAI/lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness/tree/3bc7cc8a72c66bac8d5b830cb3ccec9a5f691b12) 進行模型評估

- 模型運行環境都在 Linux( Ubuntu 22.04 ), 多數為 RTX4090 24GB 測試, 有幾個是 RTX5090 測試（特別標注）
- Linux 系統套件版本有些許差異，但其實對於實驗影響並不大
- 對此測試與環境有疑慮可以在 [DC 社群 - Twinkile AI](https://discord.gg/dXEn965KZy) @tsukisama9292 我本人詢問情況

---

# GPT-OSS

> 測驗時，我把 token 上限調整到 85000，避免過早截斷，導致還沒有輸出答案的情況

## 系統提示詞
這是 Ollama 基於 ChatGPT 提示詞的設定，因為沒有工具，所以我就把 GO 語言全部過濾掉。
```
"You are ChatGPT, a large language model trained by OpenAI.\nKnowledge cutoff: 2024-06\nCurrent date: {{ currentDate }}\n\nReasoning: medium\n\n# Valid channels: analysis, commentary, final. Channel must be included for every message."
```

## GPT-OSS-20B (llama.cpp, MXFP4, ThinkLevel: medium) - 運行約 1 小時半

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.4344|±  |0.0137|
|     |       |strict-match    |     5|exact_match|↑  |0.3397|±  |0.0130|

## GPT-OSS-20B (Ollama, MXFP4, ThinkLevel: medium) - 運行約 1 小時

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.3950|±  |0.0135|
|     |       |strict-match    |     5|exact_match|↑  |0.1759|±  |0.0105|

---

# Gemma3

## Gemma3-1B-IT-FP16 (Ollama 官方)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.2980|±  |0.0126|
|     |       |strict-match    |     5|exact_match|↑  |0.2024|±  |0.0111|

## Gemma3-1B-IT-BF16 (Huggice Face 自動)

|           Groups           |Version|Filter|n-shot| Metric |   |Value |   |Stderr|
|----------------------------|------:|------|------|--------|---|-----:|---|-----:|
|tmmluplus                   |      2|none  |      |acc     |↑  |0.2768|±  |0.0031|
|                            |       |none  |      |acc_norm|↑  |0.2768|±  |0.0031|
| - tmmluplus_STEM           |      2|none  |      |acc     |↑  |0.2617|±  |0.0074|
|                            |       |none  |      |acc_norm|↑  |0.2617|±  |0.0074|
| - tmmluplus_humanities     |      2|none  |      |acc     |↑  |0.2621|±  |0.0105|
|                            |       |none  |      |acc_norm|↑  |0.2621|±  |0.0105|
| - tmmluplus_other          |      2|none  |      |acc     |↑  |0.2792|±  |0.0047|
|                            |       |none  |      |acc_norm|↑  |0.2792|±  |0.0047|
| - tmmluplus_social_sciences|      2|none  |      |acc     |↑  |0.2865|±  |0.0058|
|                            |       |none  |      |acc_norm|↑  |0.2865|±  |0.0058|

## Gemma3-4B-IT-FP16 (Ollama 官方)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.6126|±  |0.0134|
|     |       |strict-match    |     5|exact_match|↑  |0.4602|±  |0.0137|

## Gemma3-4B-IT-BF16 (Huggice Face 自動)

|           Groups           |Version|Filter|n-shot| Metric |   |Value |   |Stderr|
|----------------------------|------:|------|------|--------|---|-----:|---|-----:|
|tmmluplus                   |      2|none  |      |acc     |↑  |0.3911|±  |0.0034|
|                            |       |none  |      |acc_norm|↑  |0.3911|±  |0.0034|
| - tmmluplus_STEM           |      2|none  |      |acc     |↑  |0.3863|±  |0.0081|
|                            |       |none  |      |acc_norm|↑  |0.3863|±  |0.0081|
| - tmmluplus_humanities     |      2|none  |      |acc     |↑  |0.3205|±  |0.0110|
|                            |       |none  |      |acc_norm|↑  |0.3205|±  |0.0110|
| - tmmluplus_other          |      2|none  |      |acc     |↑  |0.3767|±  |0.0051|
|                            |       |none  |      |acc_norm|↑  |0.3767|±  |0.0051|
| - tmmluplus_social_sciences|      2|none  |      |acc     |↑  |0.4366|±  |0.0063|
|                            |       |none  |      |acc_norm|↑  |0.4366|±  |0.0063|

## Gemma3-12B-IT-FP16 (Ollama 官方, RTX5090)
|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.8271|±  |0.0104|
|     |       |strict-match    |     5|exact_match|↑  |0.7968|±  |0.0111|

## Gemma3-27B-IT-QAT-Q4_0 (Ollama 官方)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.8590|±  |0.0096|
|     |       |strict-match    |     5|exact_match|↑  |0.8514|±  |0.0098|

---

# Gemma3n

## Gemma3n:E2B-IT-FP16 (Ollama 官方, RTX5090)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.6907|±  |0.0127|
|     |       |strict-match    |     5|exact_match|↑  |0.6020|±  |0.0135|

## Gemma3n:E4B-IT-FP16 (Ollama 官方)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.7726|±  |0.0115|
|     |       |strict-match    |     5|exact_match|↑  |0.6763|±  |0.0129|