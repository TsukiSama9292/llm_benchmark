import { ModelResult, BenchmarkScore } from './data';
import * as fs from 'fs';
import * as path from 'path';

interface HfResultsFile {
  results: Record<string, {
    alias?: string;
    [key: string]: any;
  }>;
  configs: Record<string, {
    metadata: {
      pretrained: string;
      [key: string]: any;
    };
    [key: string]: any;
  }>;
  groups?: Record<string, any>;
  group_subtasks?: Record<string, any>;
}

/**
 * 從 HuggingFace 結果文件中解析模型名稱
 */
function extractModelNameFromConfig(configs: Record<string, any>): string {
  const firstConfig = Object.values(configs)[0] as any;
  if (firstConfig?.metadata?.pretrained) {
    return firstConfig.metadata.pretrained;
  }
  return 'Unknown Model';
}

/**
 * 將 HuggingFace 結果轉換為 BenchmarkScore 格式
 */
function convertToBenchmarkScores(results: Record<string, any>, configs: Record<string, any>): BenchmarkScore[] {
  const scores: BenchmarkScore[] = [];
  
  Object.entries(results).forEach(([taskName, taskResults]) => {
    const config = configs[taskName];
    if (!config) return;
    
    const version = config.metadata?.version || 2;
    const nShot = config.num_fewshot || 0;
    
    Object.entries(taskResults).forEach(([metricKey, value]) => {
      if (typeof value !== 'number' || metricKey === 'alias') return;
      
      // 解析 metric 格式：例如 "acc,none" 或 "exact_match,flexible-extract"
      const [baseMetric, filter = 'none'] = metricKey.split(',');
      
      // 跳過 stderr 指標，我們會單獨處理
      if (baseMetric.endsWith('_stderr')) return;
      
      // 尋找對應的 stderr 值
      const stderrKey = `${baseMetric}_stderr${filter !== 'none' ? `,${filter}` : ''}`;
      const stderr = taskResults[stderrKey] || 0;
      
      scores.push({
        task: taskName,
        version,
        filter,
        nShot,
        metric: baseMetric,
        value: value as number,
        stderr: stderr as number
      });
    });
  });
  
  return scores;
}

/**
 * 確定模型類別
 */
function determineModelCategory(modelName: string): ModelResult['category'] {
  const name = modelName.toLowerCase();
  
  if (name.includes('gemma-3n') || name.includes('gemma3n')) {
    return 'gemma3n';
  } else if (name.includes('gemma') && (name.includes('3') || name.includes('-3-'))) {
    return 'gemma3';
  } else if (name.includes('llama') && name.includes('3.1')) {
    return 'llama3.1';
  } else if (name.includes('llama') && name.includes('3')) {
    return 'llama3';
  } else if (name.includes('gpt')) {
    return 'gpt-oss';
  }
  
  // 默認分類邏輯
  return 'llama3.1';
}

/**
 * 解析單個 HuggingFace 結果文件
 */
export function parseHfResultsFile(filePath: string): ModelResult | null {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data: HfResultsFile = JSON.parse(fileContent);
    
    const modelName = extractModelNameFromConfig(data.configs);
    const scores = convertToBenchmarkScores(data.results, data.configs);
    const category = determineModelCategory(modelName);
    
    // 創建模型描述
    const description = `HuggingFace 模型官方儲存庫`;
    
    const modelResult: ModelResult = {
      name: `${modelName} (huggingface)`,
      description,
      category,
      hardware: "RTX4090", // 可以根據需要調整
      framework: "huggingface",
      scores
    };
    
    return modelResult;
    
  } catch (error) {
    console.error(`Error parsing file ${filePath}:`, error);
    return null;
  }
}

/**
 * 批量解析 HuggingFace 結果目錄
 */
export function parseHfResultsDirectory(dirPath: string): ModelResult[] {
  const results: ModelResult[] = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        // 遞歸處理子目錄
        const subResults = parseHfResultsDirectory(itemPath);
        results.push(...subResults);
      } else if (item.endsWith('.json') && item.startsWith('results_')) {
        // 解析結果文件
        const modelResult = parseHfResultsFile(itemPath);
        if (modelResult) {
          results.push(modelResult);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
  }
  
  return results;
}

/**
 * 生成更新後的 data.ts 內容
 */
export function generateUpdatedDataTs(existingData: ModelResult[], newResults: ModelResult[]): string {
  const allModels = [...existingData, ...newResults];
  
  // 按類別和名稱排序
  allModels.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });
  
  const modelsString = allModels.map(model => {
    const scoresString = model.scores.map(score => 
      `      { task: "${score.task}", version: ${score.version}, filter: "${score.filter}", nShot: ${score.nShot}, metric: "${score.metric}", value: ${score.value}, stderr: ${score.stderr} }`
    ).join(',\n');
    
    return `  {
    name: "${model.name}",
    description: "${model.description}",
    category: "${model.category}",
    hardware: "${model.hardware || 'RTX4090'}",
    framework: "${model.framework || 'huggingface'}",
    scores: [
${scoresString}
    ]
  }`;
  }).join(',\n');
  
  return `// 模型評分數據類型定義
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
${modelsString}
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
`;
}

/**
 * 主要的解析和更新函數
 */
export function updateDataTsWithHfResults(hfResultsPath: string, dataFilePath: string): void {
  try {
    // 讀取現有的 data.ts（需要手動解析或使用現有數據）
    const { modelData: existingData } = require(dataFilePath);
    
    // 解析 HF 結果
    const newResults = parseHfResultsDirectory(hfResultsPath);
    
    if (newResults.length === 0) {
      console.log('No new results found in the specified directory.');
      return;
    }
    
    console.log(`Found ${newResults.length} new model results:`);
    newResults.forEach(result => {
      console.log(`  - ${result.name}`);
    });
    
    // 生成更新後的文件內容
    const updatedContent = generateUpdatedDataTs(existingData, newResults);
    
    // 寫入文件
    fs.writeFileSync(dataFilePath, updatedContent, 'utf-8');
    
    console.log(`Successfully updated ${dataFilePath} with new results.`);
    
  } catch (error) {
    console.error('Error updating data.ts:', error);
  }
}
