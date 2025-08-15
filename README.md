# 本儲存庫用於紀錄 LLM 的跑分紀錄

> 使用 [EleutherAI/lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness/tree/3bc7cc8a72c66bac8d5b830cb3ccec9a5f691b12) 進行模型評估

## GPT-OSS-20B (Base on Ollama API, RTX4090，RTX5090也有嘗試過，分數接近，但忘了紀錄)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.3510|±  |0.0131|
|     |       |strict-match    |     5|exact_match|↑  |0.1274|±  |0.0092|

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