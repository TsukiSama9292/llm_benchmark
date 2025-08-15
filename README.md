# 本儲存庫用於紀錄 LLM 的跑分紀錄

> 使用 [EleutherAI/lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness/tree/3bc7cc8a72c66bac8d5b830cb3ccec9a5f691b12) 進行模型評估

- 模型運行環境都在 Linux 上 ( Ubuntu 22.04 LTS )
- 系統版本有些許差異，但影響並不大
- 對此測試與環境有疑慮可以在 [DC 社群 - Twinkile AI](https://discord.gg/dXEn965KZy) @TsukiSama9292 我本人詢問

---

## Gemma3-1B-IT-BF16 (RTX5090)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.2980|±  |0.0126|
|     |       |strict-match    |     5|exact_match|↑  |0.2024|±  |0.0111|

## Gemma3-4B-IT-BF16 (RTX4090)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.6126|±  |0.0134|
|     |       |strict-match    |     5|exact_match|↑  |0.4602|±  |0.0137|

## Gemma3-12B-IT-BF16 (RTX5090)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.8271|±  |0.0104|
|     |       |strict-match    |     5|exact_match|↑  |0.7968|±  |0.0111|

## Gemma3-27B-IT-QAT (RTX4090)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.8590|±  |0.0096|
|     |       |strict-match    |     5|exact_match|↑  |0.8514|±  |0.0098|

## Gemma3n:E2B-IT-FP16 (RTX5090)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.6907|±  |0.0127|
|     |       |strict-match    |     5|exact_match|↑  |0.6020|±  |0.0135|

## Gemma3n:E4B-IT-FP16 (RTX4090)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.7726|±  |0.0115|
|     |       |strict-match    |     5|exact_match|↑  |0.6763|±  |0.0129|

## [yentinglin/Llama-3-Taiwan-8B-Instruct (BF16)](https://huggingface.co/yentinglin/Llama-3-Taiwan-8B-Instruct) (RTX4090)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.7195|±  |0.0124|
|     |       |strict-match    |     5|exact_match|↑  |0.7187|±  |0.0124|