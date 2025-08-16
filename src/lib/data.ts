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

// 框架類型定義
export type FrameworkType = 'all' | 'huggingface' | 'ollama' | 'llama.cpp' | 'unknown';

export interface ModelResult {
  name: string;
  description: string;
  hardware?: string;
  scores: BenchmarkScore[];
  category: 'gemma3' | 'gemma3n' | 'gpt-oss' | 'llama3' | 'llama3.1';
  framework?: FrameworkType; // 添加框架字段
}

// 解析 README.md 中的模型數據
export const modelData: ModelResult[] = [
  {
    name: "Gemma3-1B-IT-FP16 (ollama)",
    description: "ollama 官方儲存庫",
    category: "gemma3",
    hardware: "RTX4090",
    framework: "ollama",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.2980, stderr: 0.0126 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.2024, stderr: 0.0111 },
    ]
  },
  {
    name: "Gemma3-1B-IT-BF16 (huggingface)",
    description: "HuggingFace 模型官方儲存庫",
    category: "gemma3",
    hardware: "RTX4090",
    framework: "huggingface",
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
    name: "Gemma3-4B-IT-FP16 (ollama)",
    description: "ollama 官方儲存庫",
    category: "gemma3",
    hardware: "RTX4090",
    framework: "ollama",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.6126, stderr: 0.0134 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.4602, stderr: 0.0137 },
    ]
  },
  {
    name: "Gemma3-4B-IT-BF16 (huggingface)",
    description: "HuggingFace 模型官方儲存庫",
    category: "gemma3",
    hardware: "RTX4090",
    framework: "huggingface",
    scores: [
      { task: "tmmluplus", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.3911, stderr: 0.0034 },
      { task: "tmmluplus_STEM", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.3863, stderr: 0.0081 },
      { task: "tmmluplus_humanities", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.3205, stderr: 0.0110 },
      { task: "tmmluplus_other", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.3767, stderr: 0.0051 },
      { task: "tmmluplus_social_sciences", version: 2, filter: "none", nShot: 0, metric: "acc", value: 0.4366, stderr: 0.0063 },
    ]
  },
  {
    name: "Gemma3-12B-IT-FP16 (ollama)",
    description: "ollama 官方儲存庫",
    category: "gemma3",
    hardware: "RTX4090",
    framework: "ollama",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.8271, stderr: 0.0104 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.7968, stderr: 0.0111 },
    ]
  },
  {
    name: "Gemma3-27B-IT-QAT-Q4_0 (ollama)",
    description: "ollama 官方儲存庫",
    category: "gemma3",
    hardware: "RTX4090",
    framework: "ollama",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.8590, stderr: 0.0096 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.8514, stderr: 0.0098 },
    ]
  },
  {
    name: "Gemma3n:E2B-IT-FP16 (ollama)",
    description: "ollama 官方儲存庫",
    category: "gemma3n",
    hardware: "RTX4090",
    framework: "ollama",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.6907, stderr: 0.0127 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.6020, stderr: 0.0135 },
    ]
  },
  {
    name: "Gemma3n:E4B-IT-FP16 (ollama)",
    description: "ollama 官方儲存庫",
    category: "gemma3n",
    hardware: "RTX4090",
    framework: "ollama",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.7726, stderr: 0.0115 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.6763, stderr: 0.0129 },
    ]
  },
  {
    name: "GPT-OSS-20B-MXFP4 (llama.cpp)",
    description: "HF: bartowski/openai_gpt-oss-20b-GGUF-MXFP4-Experimental, ThinkLevel: medium - 運行約 1 小時半",
    category: "gpt-oss",
    hardware: "RTX4090",
    framework: "llama.cpp",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.4344, stderr: 0.0137 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.3397, stderr: 0.0130 },
    ]
  },
  {
    name: "GPT-OSS-20B-MXFP4 (ollama)",
    description: "ollama 官方儲存庫, MXFP4, ThinkLevel: medium - 運行約 1 小時",
    category: "gpt-oss",
    hardware: "RTX4090",
    framework: "ollama",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.3950, stderr: 0.0135 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.1759, stderr: 0.0105 },
    ]
  },
  {
    name: "Llama-3-Taiwan-8B-Instruct-BF16 (huggingface)",
    description: "HuggingFace 模型官方儲存庫",
    category: "llama3",
    hardware: "RTX4090",
    framework: "huggingface",
    scores: [
      { task: "gsm8k", version: 3, filter: "flexible-extract", nShot: 5, metric: "exact_match", value: 0.7195, stderr: 0.0124 },
      { task: "gsm8k", version: 3, filter: "strict-match", nShot: 5, metric: "exact_match", value: 0.7187, stderr: 0.0124 },
    ]
  },
  {
    name: "Llama-3.1-TAIDE-LX-8B-Chat-BF16 (huggingface)",
    description: "HuggingFace 模型官方儲存庫",
    category: "llama3.1",
    hardware: "RTX4090",
    framework: "huggingface",
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

// 框架識別函數
export const getFrameworkFromDescription = (description: string): FrameworkType => {
  const desc = description.toLowerCase();
  if (desc.includes('huggingface') || desc.includes('hf')) {
    return 'huggingface';
  } else if (desc.includes('ollama')) {
    return 'ollama';
  } else if (desc.includes('llama.cpp')) {
    return 'llama.cpp';
  }
  return 'unknown';
};

// 框架顏色配置
export const getFrameworkColor = (framework: FrameworkType) => {
  const colors = {
    'huggingface': 'bg-orange-100 text-orange-800',
    'ollama': 'bg-green-100 text-green-800',
    'llama.cpp': 'bg-blue-100 text-blue-800',
    'unknown': 'bg-gray-100 text-gray-800',
    'all': 'bg-gray-100 text-gray-800',
  };
  return colors[framework] || 'bg-gray-100 text-gray-800';
};

// 框架圖標配置
export const getFrameworkEmoji = (framework: FrameworkType) => {
  const emojis = {
    'huggingface': '🤗',
    'ollama': '🦙',
    'llama.cpp': '⚡',
    'unknown': '❓',
    'all': '🔧',
  };
  return emojis[framework] || '❓';
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
      framework: model.framework,
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
      framework: model.framework,
      overall: overallScore.value,
      stem: stemScore?.value || 0,
      humanities: humanitiesScore?.value || 0,
      other: otherScore?.value || 0,
      social: socialScore?.value || 0,
    };
  }).filter(Boolean);
};

// 根據框架過濾模型數據
export const getModelsByFramework = (framework: FrameworkType) => {
  if (framework === 'all') return modelData;
  return modelData.filter(model => model.framework === framework);
};

// 獲取所有可用的框架類型
export const getAvailableFrameworks = (): FrameworkType[] => {
  const frameworks = new Set<FrameworkType>();
  modelData.forEach(model => {
    if (model.framework) {
      frameworks.add(model.framework);
    }
  });
  return Array.from(frameworks).sort();
};
