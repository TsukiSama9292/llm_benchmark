'use client';

import { Search, RotateCcw } from 'lucide-react';
import { useLeaderboard, BenchmarkType, CategoryType, FrameworkType } from '@/hooks/useLeaderboard';
import { RankCell } from '@/components/ui/RankCell';
import { ModelInfo } from '@/components/ui/ModelInfo';
import { ScoreCell } from '@/components/ui/ScoreCell';
import { CategoryBadge } from '@/components/ui/CategoryBadge';
import { EnvironmentInfo } from '@/components/ui/EnvironmentInfo';
import { BenchmarkInfo } from '@/components/ui/BenchmarkInfo';
import { LicenseCard } from '@/components/ui/LicenseCard';
import { formatScore, systemInfo } from '@/lib/data';

export default function ArenaLeaderboard() {
  const {
    data,
    stats,
    benchmark,
    category,
    framework,
    searchTerm,
    setBenchmark,
    setCategory,
    setFramework,
    setSearchTerm,
    resetFilters,
    isEmpty,
    hasFilters,
  } = useLeaderboard();

  const benchmarkOptions: { value: BenchmarkType; label: string; emoji: string }[] = [
    { value: 'gsm8k-flex', label: 'GSM8K (Flexible)', emoji: '📊' },
    { value: 'gsm8k-strict', label: 'GSM8K (Strict)', emoji: '📊' },
    { value: 'tmmluplus', label: 'TMMLU+', emoji: '🇹🇼' },
    { value: 'tmmluplus_STEM', label: 'TMMLU+ STEM', emoji: '🔬' },
    { value: 'tmmluplus_humanities', label: 'TMMLU+ Humanities', emoji: '📚' },
    { value: 'tmmluplus_other', label: 'TMMLU+ Other', emoji: '📝' },
    { value: 'tmmluplus_social_sciences', label: 'TMMLU+ Social Sciences', emoji: '🏛️' },
  ];

  const categoryOptions: { value: CategoryType; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'gemma3', label: 'Gemma3' },
    { value: 'gemma3n', label: 'Gemma3n' },
    { value: 'gpt-oss', label: 'GPT-OSS' },
    { value: 'llama3', label: 'Llama3' },
    { value: 'llama3.1', label: 'Llama3.1' },
  ];

  const frameworkOptions: { value: FrameworkType; label: string; emoji: string }[] = [
    { value: 'all', label: 'All Frameworks', emoji: '🔧' },
    { value: 'huggingface', label: 'Hugging Face', emoji: '🤗' },
    { value: 'ollama', label: 'Ollama', emoji: '🦙' },
    { value: 'llama.cpp', label: 'llama.cpp', emoji: '⚡' },
  ];

  return (
    <div className="arena-container">
      {/* Header */}
      <header className="arena-header">
        <h1 className="arena-title">LLM Benchmark Arena</h1>
        <p className="arena-subtitle">
          View rankings across various LLMs on their mathematical reasoning and Traditional Chinese understanding capabilities.
        </p>
        <div className="arena-stats">
          <span>Last Updated: Aug 16, 2025</span>
          <span>Total Models: {stats.totalModels}</span>
          <span>Active Models: {stats.modelsWithCurrentScore}</span>
          <span>Top Score: {formatScore(stats.topScore)}</span>
          <span>Average: {formatScore(stats.avgScore)}</span>
        </div>
      </header>

      {/* Controls */}
      <div className="arena-controls">
        <div className="control-group">
          <div className="select-wrapper">
            <select
              value={benchmark}
              onChange={(e) => setBenchmark(e.target.value as BenchmarkType)}
              className="arena-select"
            >
              {benchmarkOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as CategoryType)}
              className="arena-select"
            >
              {categoryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="select-wrapper">
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value as FrameworkType)}
              className="arena-select"
            >
              {frameworkOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.emoji} {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search by model name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {hasFilters && (
            <button
              onClick={resetFilters}
              className="reset-button"
              title="Reset filters"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results Info */}
      {hasFilters && (
        <div className="px-4 py-2 text-sm text-slate-400">
          Showing {data.length} of {stats.totalModels} models
          {searchTerm && ` matching "${searchTerm}"`}
          {category !== 'all' && ` in ${category}`}
        </div>
      )}

      {/* Table */}
      <div className="arena-table-container">
        {isEmpty ? (
          <div className="p-8 text-center">
            <div className="text-slate-500 mb-2">No models found</div>
            <div className="text-sm text-slate-400">
              Try adjusting your search criteria or filters
            </div>
          </div>
        ) : (
          <table className="arena-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Model</th>
                <th>Score</th>
                <th>Category</th>
                <th>Hardware</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry) => (
                <tr key={entry.name}>
                  <td>
                    <RankCell rank={entry.rank} />
                  </td>
                  
                  <td>
                    <ModelInfo
                      name={entry.name}
                      description={entry.description}
                      category={entry.category}
                      hardware={entry.hardware}
                    />
                  </td>
                  
                  <td>
                    <ScoreCell score={entry.score} />
                  </td>
                  
                  <td>
                    <CategoryBadge category={entry.category} />
                  </td>
                  
                  <td className="text-center">
                    {entry.hardware ? (
                      <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                        {entry.hardware}
                      </span>
                    ) : (
                      <span className="text-gray-500">RTX4090</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <EnvironmentInfo environment={systemInfo.environment} />
        <BenchmarkInfo benchmarks={systemInfo.benchmarks} />
        <LicenseCard license={systemInfo.license} />
      </div>
    </div>
  );
}
