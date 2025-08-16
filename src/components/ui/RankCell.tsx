import { memo } from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

interface RankCellProps {
  rank: number;
}

export const RankCell = memo<RankCellProps>(({ rank }) => {
  const getRankIcon = () => {
    if (rank === 1) return <Trophy className="w-4 h-4 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-gray-400" />;
    if (rank === 3) return <Award className="w-4 h-4 text-amber-600" />;
    return null;
  };

  return (
    <div className={`rank-cell ${rank <= 3 ? 'top-rank' : ''}`}>
      <div className="flex items-center justify-center gap-1">
        {getRankIcon()}
        <span>{rank}</span>
      </div>
    </div>
  );
});

RankCell.displayName = 'RankCell';
