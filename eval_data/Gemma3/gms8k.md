## Gemma3-1B-IT-FP16 (Ollama 官方)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.2980|±  |0.0126|
|     |       |strict-match    |     5|exact_match|↑  |0.2024|±  |0.0111|

## Gemma3-4B-IT-FP16 (Ollama 官方)

|Tasks|Version|     Filter     |n-shot|  Metric   |   |Value |   |Stderr|
|-----|------:|----------------|-----:|-----------|---|-----:|---|-----:|
|gsm8k|      3|flexible-extract|     5|exact_match|↑  |0.6126|±  |0.0134|
|     |       |strict-match    |     5|exact_match|↑  |0.4602|±  |0.0137|

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

## 官方 Modelfile

```
FROM ... # 模型路徑忽略
TEMPLATE """{{- range $i, $_ := .Messages }}
{{- $last := eq (len (slice $.Messages $i)) 1 }}
{{- if or (eq .Role "user") (eq .Role "system") }}<start_of_turn>user
{{ .Content }}<end_of_turn>
{{ if $last }}<start_of_turn>model
{{ end }}
{{- else if eq .Role "assistant" }}<start_of_turn>model
{{ .Content }}{{ if not $last }}<end_of_turn>
{{ end }}
{{- end }}
{{- end }}
"""
PARAMETER stop <end_of_turn>
PARAMETER temperature 1
PARAMETER top_k 64
PARAMETER top_p 0.95
```