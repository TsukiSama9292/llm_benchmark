const fs = require('fs');
const path = require('path');

/**
 * 從 HuggingFace 結果文件中解析模型名稱
 */
function extractModelNameFromConfig(configs) {
  const firstConfig = Object.values(configs)[0];
  if (firstConfig?.metadata?.pretrained) {
    return firstConfig.metadata.pretrained;
  }
  return 'Unknown Model';
}

/**
 * 將 HuggingFace 結果轉換為 BenchmarkScore 格式
 */
function convertToBenchmarkScores(results) {
  const scores = [];
  
  // 處理 GSM8K
  if (results.gsm8k) {
    const gsm8k = results.gsm8k;
    
    // flexible-extract
    if (gsm8k['exact_match,flexible-extract'] !== undefined) {
      scores.push({
        task: 'gsm8k',
        version: 3,
        filter: 'flexible-extract',
        nShot: 5,
        metric: 'exact_match',
        value: gsm8k['exact_match,flexible-extract'],
        stderr: gsm8k['exact_match_stderr,flexible-extract'] || 0
      });
    }
    
    // strict-match
    if (gsm8k['exact_match,strict-match'] !== undefined) {
      scores.push({
        task: 'gsm8k',
        version: 3,
        filter: 'strict-match',
        nShot: 5,
        metric: 'exact_match',
        value: gsm8k['exact_match,strict-match'],
        stderr: gsm8k['exact_match_stderr,strict-match'] || 0
      });
    }
  }
  
  // 處理 TMMLU Plus 整體
  if (results.tmmluplus && results.tmmluplus['acc,none'] !== undefined) {
    scores.push({
      task: 'tmmluplus',
      version: 2,
      filter: 'none',
      nShot: 0,
      metric: 'acc',
      value: results.tmmluplus['acc,none'],
      stderr: results.tmmluplus['acc_stderr,none'] || 0
    });
  }
  
  // 處理 TMMLU Plus 各類別
  const categories = ['STEM', 'humanities', 'other', 'social_sciences'];
  categories.forEach(category => {
    const taskName = `tmmluplus_${category}`;
    if (results[taskName] && results[taskName]['acc,none'] !== undefined) {
      scores.push({
        task: taskName,
        version: 2,
        filter: 'none',
        nShot: 0,
        metric: 'acc',
        value: results[taskName]['acc,none'],
        stderr: results[taskName]['acc_stderr,none'] || 0
      });
    }
  });
  
  return scores;
}

/**
 * 確定模型類別
 */
function determineModelCategory(modelName) {
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
function parseHfResultsFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    const modelName = extractModelNameFromConfig(data.configs);
    const scores = convertToBenchmarkScores(data.results, data.configs);
    const category = determineModelCategory(modelName);
    
    // 創建模型描述
    const description = `HuggingFace 模型官方儲存庫`;
    
    const modelResult = {
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
 * 生成更新後的 data.ts 內容
 */
function generateModelDataString(allModels) {
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
  
  return modelsString;
}

/**
 * 主要的解析和更新函數
 */
function main() {
  const hfFilePaths = [
    '/home/user/workspace/llm_benchmark/eval_data/hf/google__gemma-3-4b-it/results_2025-08-17T04-37-05.013958.json',
  ];
  
  const dataFilePath = '/home/user/workspace/llm_benchmark/src/lib/data.ts';
  
  console.log('解析 HuggingFace 結果文件...');
  
  const newResults = [];
  
  for (const filePath of hfFilePaths) {
    console.log(`正在解析: ${path.basename(filePath)}`);
    const result = parseHfResultsFile(filePath);
    if (result) {
      newResults.push(result);
      console.log(`  ✓ 成功解析模型: ${result.name}`);
      console.log(`    - 類別: ${result.category}`);
      console.log(`    - 評分數量: ${result.scores.length}`);
      
      // 顯示主要分數
      const gsm8kFlexible = result.scores.find(s => s.task === 'gsm8k' && s.filter === 'flexible-extract');
      const gsm8kStrict = result.scores.find(s => s.task === 'gsm8k' && s.filter === 'strict-match');
      const tmmluplus = result.scores.find(s => s.task === 'tmmluplus' && s.metric === 'acc');
      
      if (gsm8kFlexible) {
        console.log(`    - GSM8K (flexible): ${(gsm8kFlexible.value * 100).toFixed(2)}%`);
      }
      if (gsm8kStrict) {
        console.log(`    - GSM8K (strict): ${(gsm8kStrict.value * 100).toFixed(2)}%`);
      }
      if (tmmluplus) {
        console.log(`    - TMMLU Plus: ${(tmmluplus.value * 100).toFixed(2)}%`);
      }
    } else {
      console.log(`  ✗ 解析失敗`);
    }
  }
  
  if (newResults.length === 0) {
    console.log('沒有找到有效的結果文件。');
    return;
  }
  
  console.log('\n要添加到 data.ts 的新模型數據：');
  console.log('=====================================');
  
  const newModelsString = generateModelDataString(newResults);
  console.log(newModelsString);
  
  console.log('\n=====================================');
  console.log('你可以將上述內容添加到 src/lib/data.ts 文件的 modelData 數組中。');
  console.log(`成功解析了 ${newResults.length} 個新模型。`);
}

if (require.main === module) {
  main();
}

module.exports = {
  parseHfResultsFile,
  determineModelCategory,
  convertToBenchmarkScores,
  extractModelNameFromConfig
};
