// 模型評分數據類型定義
export interface BenchmarkScore {
  task: string;
  version: number;
  filter: string;
  nShot: number;
  metric: string;
  value: number;
  stderr: number;
}

export interface ModelResult {
  name: string;
  description: string;
  hardware?: string;
  scores: BenchmarkScore[];
  category: 'gemma3' | 'gemma3n' | 'gpt-oss' | 'llama3' | 'llama3.1';
}

// 解析 README.md 中的模型數據
export const modelData: ModelResult[] = [
  {
    name: "Gemma3-1B-IT-FP16",
    description: "Ollama 官方",
    category: "gemma3",
    hardware: "RTX4090",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.2980, stderr: 0.0126 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.2024, stderr: 0.0111 },
    ]
  },
  {
    name: "Gemma3-1B-IT-BF16",
    description: "HuggingFace",
    category: "gemma3",
    hardware: "RTX4090",
    scores: [
      { task: "tmmluplus", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.2768, stderr: 0.0031 },
      { task: "tmmluplus", version: 2, filter: "none", nShot: 0, metric: "acc_norm", value: 0.2768, stderr: 0.0031 },
      { task: "tmmluplus_STEM", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.2617, stderr: 0.0074 },
      { task: "tmmluplus_humanities", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.2621, stderr: 0.0105 },
      { task: "tmmluplus_other", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.2792, stderr: 0.0047 },
      { task: "tmmluplus_social_sciences", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.2865, stderr: 0.0058 },
    ]
  },
  {
    name: "Gemma3-4B-IT-FP16",
    description: "Ollama 官方",
    category: "gemma3",
    hardware: "RTX4090",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.6126, stderr: 0.0134 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.4602, stderr: 0.0137 },
    ]
  },
  {
    name: "Gemma3-4B-IT-BF16",
    description: "HuggingFace",
    category: "gemma3",
    hardware: "RTX4090",
    scores: [
      { task: "tmmluplus", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.3911, stderr: 0.0034 },
      { task: "tmmluplus_STEM", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.3863, stderr: 0.0081 },
      { task: "tmmluplus_humanities", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.3205, stderr: 0.0110 },
      { task: "tmmluplus_other", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.3767, stderr: 0.0051 },
      { task: "tmmluplus_social_sciences", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.4366, stderr: 0.0063 },
    ]
  },
  {
    name: "Gemma3-12B-IT-FP16",
    description: "Ollama 官方",
    category: "gemma3",
    hardware: "RTX4090",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.8271, stderr: 0.0104 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.7968, stderr: 0.0111 },
    ]
  },
  {
    name: "Gemma3-27B-IT-QAT-Q4_0",
    description: "Ollama 官方",
    category: "gemma3",
    hardware: "RTX4090",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.8590, stderr: 0.0096 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.8514, stderr: 0.0098 },
    ]
  },
  {
    name: "Gemma3n:E2B-IT-FP16",
    description: "Ollama 官方",
    category: "gemma3n",
    hardware: "RTX4090",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.6907, stderr: 0.0127 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.6020, stderr: 0.0135 },
    ]
  },
  {
    name: "Gemma3n:E4B-IT-FP16",
    description: "Ollama 官方",
    category: "gemma3n",
    hardware: "RTX4090",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.7726, stderr: 0.0115 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.6763, stderr: 0.0129 },
    ]
  },
  {
    name: "GPT-OSS-20B (llama.cpp)",
    description: "llama.cpp, MXFP4, ThinkLevel: medium - 運行約 1 小時半",
    category: "gpt-oss",
    hardware: "RTX4090",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.4344, stderr: 0.0137 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.3397, stderr: 0.0130 },
    ]
  },
  {
    name: "GPT-OSS-20B (ollama)",
    description: "Ollama 官方, MXFP4, ThinkLevel: medium - 運行約 1 小時",
    category: "gpt-oss",
    hardware: "RTX4090",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.3950, stderr: 0.0135 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.1759, stderr: 0.0105 },
    ]
  },
  {
    name: "Llama-3-Taiwan-8B-Instruct-BF16",
    description: "HuggingFace",
    category: "llama3",
    hardware: "RTX4090",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.7195, stderr: 0.0124 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.7187, stderr: 0.0124 },
    ]
  },
  {
    name: "Llama-3.1-TAIDE-LX-8B-Chat-BF16",
    description: "HuggingFace",
    category: "llama3.1",
    hardware: "RTX4090",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.1941, stderr: 0.0109 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.0000, stderr: 0.0000 },
      { task: "tmmluplus", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.3866, stderr: 0.0034 },
      { task: "tmmluplus_STEM", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.3540, stderr: 0.0080 },
      { task: "tmmluplus_humanities", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.3540, stderr: 0.0114 },
      { task: "tmmluplus_other", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.3978, stderr: 0.0051 },
      { task: "tmmluplus_social_sciences", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.4047, stderr: 0.0063 },
    ]
  },
];

// 工具函數
export const getCategoryColor = (category: string) => {
  const colors = {
    'gemma3': 'bg-blue-100 text-blue-800',
    'gemma3n': 'bg-indigo-100 text-indigo-800',
    'gpt-oss': 'bg-green-100 text-green-800',
    'llama3': 'bg-yellow-100 text-yellow-800',
    'llama3.1': 'bg-purple-100 text-purple-800',
  };
  return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
};

export const formatScore = (value: number) => {
  return (value * 100).toFixed(2) + '%';
};

export const getGSM8KScores = () => {
  return modelData.map(model => {
    const flexibleScore = model.scores.find(s => s.task === 'gsm8k' && s.filter === 'flexible-extract');
    const strictScore = model.scores.find(s => s.task === 'gsm8k' && s.filter === 'strict-match');
    
    return {
      name: model.name,
      category: model.category,
      flexible: flexibleScore?.value || 0,
      strict: strictScore?.value || 0,
      hardware: model.hardware,
    };
  }).filter(item => item.flexible > 0 || item.strict > 0);
};

export const getTMMLUPlusScores = () => {
  return modelData.map(model => {
    const overallScore = model.scores.find(s => s.task === 'tmmluplus' && s.metric === 'acc');
    const stemScore = model.scores.find(s => s.task === 'tmmluplus_STEM');
    const humanitiesScore = model.scores.find(s => s.task === 'tmmluplus_humanities');
    const otherScore = model.scores.find(s => s.task === 'tmmluplus_other');
    const socialScore = model.scores.find(s => s.task === 'tmmluplus_social_sciences');
    
    if (!overallScore) return null;
    
    return {
      name: model.name,
      category: model.category,
      overall: overallScore.value,
      stem: stemScore?.value || 0,
      humanities: humanitiesScore?.value || 0,
      other: otherScore?.value || 0,
      social: socialScore?.value || 0,
    };
  }).filter(Boolean);
};
