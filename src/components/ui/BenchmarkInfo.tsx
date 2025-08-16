import { InfoCard } from './InfoCard';

interface BenchmarkDetails {
  gsm8k: string;
  tmmluplus: string;
}

interface BenchmarkInfoProps {
  benchmarks: BenchmarkDetails;
}

export function BenchmarkInfo({ benchmarks }: BenchmarkInfoProps) {
  const benchmarkItems = [
    { 
      name: 'GSM8K', 
      description: benchmarks.gsm8k,
      color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30',
      icon: 'MATH'
    },
    { 
      name: 'TMML+', 
      description: benchmarks.tmmluplus,
      color: 'bg-purple-500/20 border-purple-500/40 text-purple-300 hover:bg-purple-500/30',
      icon: 'LANG'
    }
  ];

  return (
    <InfoCard
      icon=""
      title=""
      description=""
      gradient="from-purple-500 to-pink-600"
    >
      <div>
        <h2 className="text-base font-bold text-slate-100">Evaluation Benchmarks</h2>
        <div className="text-slate-400 text-xs">Comprehensive assessment methodology</div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-emerald-300">MATH</h3>
            <div className="font-bold text-slate-200 text-xs">GSM8K: {benchmarks.gsm8k}</div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-purple-300">LANG</h3>
            <div className="font-bold text-slate-200 text-xs">TMML+: {benchmarks.tmmluplus}</div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-300">METHOD</h3>
            <div className="font-bold text-slate-200 text-xs">Flexible: Lenient answer extraction from output</div>
            <div className="font-bold text-slate-200 text-xs">Strict: Requires output to match specified format</div>
          </div>
        </div>
      </div>
    </InfoCard>
  );
}