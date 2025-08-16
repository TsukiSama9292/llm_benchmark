import { memo } from 'react';

interface ModelInfoProps {
  name: string;
  description: string;
  category: string;
  hardware?: string;
}

export const ModelInfo = memo<ModelInfoProps>(({ name, description, category, hardware }) => {
  const getModelIcon = (category: string) => {
    const iconMap: Record<string, string> = {
      'gemma3': '#3b82f6',
      'gemma3n': '#8b5cf6',
      'gpt-oss': '#10b981',
      'llama3': '#f59e0b',
      'llama3.1': '#ef4444',
    };
    return iconMap[category] || '#6b7280';
  };

  return (
    <div className="model-info">
      <div 
        className="model-icon"
        style={{ backgroundColor: getModelIcon(category) }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
      <div>
        <div className="model-name">{name}</div>
        <div className="model-description">
          {description}
          {hardware && `, ${hardware}`}
        </div>
      </div>
    </div>
  );
});

ModelInfo.displayName = 'ModelInfo';
