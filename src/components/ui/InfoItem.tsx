interface InfoItemProps {
  icon?: string;
  label: string;
  value?: string;
  description?: string;
  layout?: 'horizontal' | 'vertical';
}

export function InfoItem({ icon, label, value, description, layout = 'horizontal' }: InfoItemProps) {
  if (layout === 'vertical') {
    return (
      <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
        <div className="flex items-center gap-2 mb-3">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="text-slate-200 font-semibold">{label}</span>
        </div>
        {description && (
          <p className="text-slate-300 text-sm leading-relaxed">
            {description}
          </p>
        )}
        {value && (
          <p className="text-slate-200 font-mono text-sm mt-2">
            {value}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600">
      <div className="flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <span className="text-slate-300 font-medium">{label}</span>
      </div>
      {value && (
        <span className="text-slate-200 font-mono text-sm text-right">{value}</span>
      )}
    </div>
  );
}
