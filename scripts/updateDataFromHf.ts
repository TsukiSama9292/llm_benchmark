#!/usr/bin/env tsx

import { parseHfResultsFile, generateUpdatedDataTs } from '../src/lib/parseHfResults';
import { modelData } from '../src/lib/data';
import * as fs from 'fs';
import * as path from 'path';

/**
 * 使用指定的 HuggingFace 結果文件更新 data.ts
 */
function main() {
  const hfFilePaths = [
    '/home/user/workspace/llm_benchmark/eval_data/hf/google__gemma-3n-E4B-it/results_2025-08-16T13-19-48.023288.json',
    '/home/user/workspace/llm_benchmark/eval_data/hf/yentinglin__Llama-3-Taiwan-8B-Instruct/results_2025-08-16T15-50-14.619924.json'
  ];
  
  const dataFilePath = '/home/user/workspace/llm_benchmark/src/lib/data.ts';
  
  console.log('解析 HuggingFace 結果文件...');
  
  const newResults = [];
  
  for (const filePath of hfFilePaths) {
    console.log(`正在解析: ${filePath}`);
    const result = parseHfResultsFile(filePath);
    if (result) {
      newResults.push(result);
      console.log(`  ✓ 成功解析模型: ${result.name}`);
      console.log(`    - 類別: ${result.category}`);
      console.log(`    - 評分數量: ${result.scores.length}`);
    } else {
      console.log(`  ✗ 解析失敗`);
    }
  }
  
  if (newResults.length === 0) {
    console.log('沒有找到有效的結果文件。');
    return;
  }
  
  console.log('\n生成更新後的 data.ts 內容...');
  
  // 生成更新後的文件內容
  const updatedContent = generateUpdatedDataTs(modelData, newResults);
  
  // 創建備份
  const backupPath = dataFilePath + '.backup';
  fs.copyFileSync(dataFilePath, backupPath);
  console.log(`已創建備份: ${backupPath}`);
  
  // 寫入更新後的文件
  fs.writeFileSync(dataFilePath, updatedContent, 'utf-8');
  
  console.log(`\n✓ 成功更新 ${dataFilePath}`);
  console.log(`添加了 ${newResults.length} 個新模型：`);
  newResults.forEach(result => {
    console.log(`  - ${result.name}`);
  });
  
  console.log('\n你可以查看更新後的文件內容來確認結果。');
}

if (require.main === module) {
  main();
}
