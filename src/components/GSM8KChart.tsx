'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getGSM8KScores, formatScore, getCategoryColor } from '@/lib/data';
import { TrendingUp } from 'lucide-react';

export default function GSM8KChart() {
  const data = getGSM8KScores();

  return (
    <div className="model-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
            <TrendingUp className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">GSM8K 數學推理評分</h3>
            <p className="text-gray-600 text-sm">Grade School Math 8K 基準測試</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{data.length}</div>
          <div className="text-sm text-gray-500">測試模型</div>
        </div>
      </div>
      
      <div className="chart-container p-4">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={90}
                fontSize={11}
                tick={{ fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                domain={[0, 1]}
                tickFormatter={(value) => formatScore(value)}
                tick={{ fill: '#64748b' }}
                axisLine={{ stroke: '#e2e8f0' }}
              />
              <Tooltip 
                formatter={(value: number) => [formatScore(value), '']}
                labelFormatter={(label) => `模型: ${label}`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
              />
              <Bar 
                dataKey="flexible" 
                fill="url(#flexibleGradient)" 
                name="Flexible Extract"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="strict" 
                fill="url(#strictGradient)" 
                name="Strict Match"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="flexibleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="strictGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="font-semibold text-gray-800">Flexible Extract</span>
          </div>
          <p className="text-sm text-gray-600">較寬鬆的答案提取方式，允許多種格式的正確答案</p>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
            <span className="font-semibold text-gray-800">Strict Match</span>
          </div>
          <p className="text-sm text-gray-600">嚴格的答案匹配方式，要求精確的格式符合</p>
        </div>
      </div>
    </div>
  );
}
