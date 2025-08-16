import { useState, useMemo, useCallback } from 'react';
import { modelData } from '@/lib/data';

export type BenchmarkType = 'gsm8k-flex' | 'gsm8k-strict' | 'tmmluplus' | 'tmmluplus_STEM' | 'tmmluplus_humanities' | 'tmmluplus_other' | 'tmmluplus_social_sciences';
export type CategoryType = 'all' | 'gemma3' | 'gemma3n' | 'gpt-oss' | 'llama3' | 'llama3.1';
export type FrameworkType = 'all' | 'huggingface' | 'ollama' | 'llama.cpp';

export interface LeaderboardEntry {
  rank: number;
  name: string;
  description: string;
  category: string;
  score: number | null;
  allScores: {
    gsm8kFlex: number | null;
    gsm8kStrict: number | null;
    tmmluplus: number | null;
    tmmluplusSTEM: number | null;
    tmmluplusHumanities: number | null;
    tmmluplusOther: number | null;
    tmmluplus_social_sciences: number | null;
  };
  hardware?: string;
  framework?: string;
}

export const useLeaderboard = () => {
  const [benchmark, setBenchmark] = useState<BenchmarkType>('gsm8k-flex');
  const [category, setCategory] = useState<CategoryType>('all');
  const [framework, setFramework] = useState<FrameworkType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // 處理和排序數據
  const leaderboardData = useMemo(() => {
    const entries: LeaderboardEntry[] = modelData.map(model => {
      const gsm8kFlexScore = model.scores.find(s => s.task === 'gsm8k' && s.filter === 'flexible-extract');
      const gsm8kStrictScore = model.scores.find(s => s.task === 'gsm8k' && s.filter === 'strict-match');
      const tmmluplusScore = model.scores.find(s => s.task === 'tmmluplus');
      const tmmluplusSTEMScore = model.scores.find(s => s.task === 'tmmluplus_STEM');
      const tmmluplusHumanitiesScore = model.scores.find(s => s.task === 'tmmluplus_humanities');
      const tmmluplusOtherScore = model.scores.find(s => s.task === 'tmmluplus_other');
      const tmmluplus_social_sciencesScore = model.scores.find(s => s.task === 'tmmluplus_social_sciences');
      
      const gsm8kFlex = gsm8kFlexScore?.value ?? null;
      const gsm8kStrict = gsm8kStrictScore?.value ?? null;
      const tmmluplus = tmmluplusScore?.value ?? null;
      const tmmluplusSTEM = tmmluplusSTEMScore?.value ?? null;
      const tmmluplusHumanities = tmmluplusHumanitiesScore?.value ?? null;
      const tmmluplusOther = tmmluplusOtherScore?.value ?? null;
      const tmmluplus_social_sciences = tmmluplus_social_sciencesScore?.value ?? null;

      // 判斷測試框架
      let modelFramework: string = 'unknown';
      if (model.description.toLowerCase().includes('huggingface') || model.description.toLowerCase().includes('hf')) {
        modelFramework = 'huggingface';
      } else if (model.description.toLowerCase().includes('ollama')) {
        modelFramework = 'ollama';
      } else if (model.description.toLowerCase().includes('llama.cpp')) {
        modelFramework = 'llama.cpp';
      }

      let currentScore: number | null = null;
      switch (benchmark) {
        case 'gsm8k-flex':
          currentScore = gsm8kFlex;
          break;
        case 'gsm8k-strict':
          currentScore = gsm8kStrict;
          break;
        case 'tmmluplus':
          currentScore = tmmluplus;
          break;
        case 'tmmluplus_STEM':
          currentScore = tmmluplusSTEM;
          break;
        case 'tmmluplus_humanities':
          currentScore = tmmluplusHumanities;
          break;
        case 'tmmluplus_other':
          currentScore = tmmluplusOther;
          break;
        case 'tmmluplus_social_sciences':
          currentScore = tmmluplus_social_sciences;
          break;
      }

      return {
        rank: 0,
        name: model.name,
        description: model.description,
        category: model.category,
        score: currentScore,
        allScores: {
          gsm8kFlex,
          gsm8kStrict,
          tmmluplus,
          tmmluplusSTEM,
          tmmluplusHumanities,
          tmmluplusOther,
          tmmluplus_social_sciences,
        },
        hardware: model.hardware,
        framework: modelFramework,
      };
    });

    // 排序並分配排名
    const sorted = entries
      .sort((a, b) => {
        // 有分數的模型排在沒有分數的模型前面
        if (a.score === null && b.score !== null) return 1;
        if (a.score !== null && b.score === null) return -1;
        
        // 都沒有分數時，保持原順序
        if (a.score === null && b.score === null) return 0;
        
        // 都有分數時，按分數從高到低排序（包括 0 分）
        return (b.score as number) - (a.score as number);
      })
      .map((entry, index) => ({ ...entry, rank: index + 1 }));

    return sorted;
  }, [benchmark]);

  // 篩選數據
  const filteredData = useMemo(() => {
    return leaderboardData.filter(entry => {
      const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || entry.category === category;
      const matchesFramework = framework === 'all' || entry.framework === framework;
      return matchesSearch && matchesCategory && matchesFramework;
    });
  }, [leaderboardData, searchTerm, category, framework]);

  // 統計數據
  const stats = useMemo(() => {
    const totalModels = modelData.length;
    const modelsWithCurrentScore = leaderboardData.filter(entry => entry.score !== null).length;
    const avgScore = leaderboardData
      .filter(entry => entry.score !== null)
      .reduce((sum, entry) => sum + (entry.score || 0), 0) / modelsWithCurrentScore;

    const topScore = Math.max(...leaderboardData.map(entry => entry.score || 0));

    return {
      totalModels,
      modelsWithCurrentScore,
      avgScore: isNaN(avgScore) ? 0 : avgScore,
      topScore: isFinite(topScore) ? topScore : 0,
    };
  }, [leaderboardData]);

  // 回調函數
  const handleBenchmarkChange = useCallback((newBenchmark: BenchmarkType) => {
    setBenchmark(newBenchmark);
  }, []);

  const handleCategoryChange = useCallback((newCategory: CategoryType) => {
    setCategory(newCategory);
  }, []);

  const handleSearchChange = useCallback((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  }, []);

  const resetFilters = useCallback(() => {
    setCategory('all');
    setFramework('all');
    setSearchTerm('');
  }, []);

  const handleFrameworkChange = useCallback((newFramework: FrameworkType) => {
    setFramework(newFramework);
  }, []);

  return {
    // 數據
    data: filteredData,
    stats,
    
    // 當前狀態
    benchmark,
    category,
    framework,
    searchTerm,
    
    // 操作函數
    setBenchmark: handleBenchmarkChange,
    setCategory: handleCategoryChange,
    setFramework: handleFrameworkChange,
    setSearchTerm: handleSearchChange,
    resetFilters,
    
    // 工具函數
    isEmpty: filteredData.length === 0,
    hasFilters: category !== 'all' || framework !== 'all' || searchTerm !== '',
  };
};
