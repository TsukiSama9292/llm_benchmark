import { memo } from 'react';
import { formatScore } from '@/lib/data';

interface ScoreCellProps {
  score: number | null;
}

export const ScoreCell = memo<ScoreCellProps>(({ score }) => {
  const getScoreClass = (score: number | null) => {
    if (score === null || score === undefined) return 'score-na';
    if (score >= 0.7) return 'score-high';
    if (score >= 0.4) return 'score-medium';
    return 'score-low';
  };

  return (
    <div className={`score-cell ${getScoreClass(score)}`}>
      {score !== null && score !== undefined ? formatScore(score) : '—'}
    </div>
  );
});

ScoreCell.displayName = 'ScoreCell';
