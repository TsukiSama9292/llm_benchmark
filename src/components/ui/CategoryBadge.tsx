import { memo } from 'react';

interface CategoryBadgeProps {
  category: string;
}

export const CategoryBadge = memo<CategoryBadgeProps>(({ category }) => {
  const getCategoryBadgeClass = (category: string) => {
    const classMap: Record<string, string> = {
      'gemma3': 'badge-gemma3',
      'gemma3n': 'badge-gemma3n',
      'gpt-oss': 'badge-gpt-oss',
      'llama3': 'badge-llama3',
      'llama3.1': 'badge-llama31',
    };
    return `category-badge ${classMap[category] || 'badge-gemma3'}`;
  };

  return (
    <span className={getCategoryBadgeClass(category)}>
      {category}
    </span>
  );
});

CategoryBadge.displayName = 'CategoryBadge';
