'use client';

import { modelData, getCategoryColor, formatScore } from '@/lib/data';
import { ChevronDown, ChevronUp, Filter, Table } from 'lucide-react';
import { useState } from 'react';

export default function ModelTable() {
  const [expandedModel, setExpandedModel] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'gemma3', 'gemma3n', 'gpt-oss', 'llama3', 'llama3.1'];
  const filteredData = filterCategory === 'all' 
    ? modelData 
    : modelData.filter(model => model.category === filterCategory);

  const getScoreClass = (value: number) => {
    if (value >= 0.7) return 'score-high';
    if (value >= 0.4) return 'score-medium';
    return 'score-low';
  };

  return (
    <div className="model-card">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div className="flex items-center mb-4 lg:mb-0">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
            <Table className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">詳細模型評分表</h3>
            <p className="text-gray-600 text-sm">完整的基準測試結果與比較</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Filter size={16} className="text-gray-500" />
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="custom-select"
          >
            <option value="all">所有模型</option>
            <option value="gemma3">Gemma3</option>
            <option value="gemma3n">Gemma3n</option>
            <option value="gpt-oss">GPT-OSS</option>
            <option value="llama3">Llama3</option>
            <option value="llama3.1">Llama3.1</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="benchmark-table">
          <thead>
            <tr>
              <th className="text-left">模型名稱</th>
              <th className="text-left">類別</th>
              <th className="text-left">描述</th>
              <th className="text-center">GSM8K (Flexible)</th>
              <th className="text-center">GSM8K (Strict)</th>
              <th className="text-center">TMMLUPLUS</th>
              <th className="text-center">詳情</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((model, index) => {
              const gsm8kFlex = model.scores.find(s => s.task === 'gsm8k' && s.filter === 'flexible-extract');
              const gsm8kStrict = model.scores.find(s => s.task === 'gsm8k' && s.filter === 'strict-match');
              const tmmluplus = model.scores.find(s => s.task === 'tmmluplus');
              const isExpanded = expandedModel === model.name;

              return (
                <tr key={model.name} className="group">
                  <td className="font-medium text-gray-900">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{model.name}</div>
                        {model.hardware && (
                          <span className="inline-flex items-center px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full mt-1">
                            {model.hardware}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`category-badge ${getCategoryColor(model.category)}`}>
                      {model.category.toUpperCase()}
                    </span>
                  </td>
                  <td className="text-gray-600 max-w-xs">
                    <div className="truncate">{model.description}</div>
                  </td>
                  <td className="text-center">
                    {gsm8kFlex ? (
                      <span className={`score-highlight ${getScoreClass(gsm8kFlex.value)}`}>
                        {formatScore(gsm8kFlex.value)}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="text-center">
                    {gsm8kStrict ? (
                      <span className={`score-highlight ${getScoreClass(gsm8kStrict.value)}`}>
                        {formatScore(gsm8kStrict.value)}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="text-center">
                    {tmmluplus ? (
                      <span className={`score-highlight ${getScoreClass(tmmluplus.value)}`}>
                        {formatScore(tmmluplus.value)}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => setExpandedModel(isExpanded ? null : model.name)}
                      className="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {expandedModel && (
        <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
          {(() => {
            const model = modelData.find(m => m.name === expandedModel);
            if (!model) return null;
            
            return (
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <Table className="text-white" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{model.name}</h4>
                    <p className="text-gray-600">{model.description}</p>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm bg-white rounded-xl overflow-hidden shadow-sm">
                    <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">任務</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">過濾器</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">指標</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">分數</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">標準誤差</th>
                      </tr>
                    </thead>
                    <tbody>
                      {model.scores.map((score, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-blue-25 transition-colors">
                          <td className="py-3 px-4">
                            <span className="font-medium text-gray-900">{score.task}</span>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{score.filter}</td>
                          <td className="py-3 px-4 text-gray-600">{score.metric}</td>
                          <td className="py-3 px-4 text-right">
                            <span className={`font-mono font-bold ${getScoreClass(score.value)}`}>
                              {formatScore(score.value)}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-mono text-gray-500">
                            ±{formatScore(score.stderr)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}
        </div>
      )}
      
      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
        <p className="text-sm text-gray-600 flex items-center">
          <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
          <strong>提示：</strong> 點擊「詳情」按鈕可展開查看每個模型的完整評分數據
        </p>
      </div>
    </div>
  );
}
