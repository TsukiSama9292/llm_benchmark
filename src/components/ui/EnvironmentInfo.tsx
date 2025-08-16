import { InfoCard } from './InfoCard';

interface EnvironmentSpec {
  os: string;
  framework: string;
  primaryGpu: string;
  secondaryGpu: string;
}

interface EnvironmentInfoProps {
  environment: EnvironmentSpec;
}

export function EnvironmentInfo({ environment }: EnvironmentInfoProps) {
  const specs = [
    { label: 'Operating System', value: environment.os, icon: 'OS' },
    { label: 'Framework', value: environment.framework, icon: 'FW' },
    { label: 'Primary GPU', value: environment.primaryGpu, icon: 'GPU1' },
    { label: 'Secondary GPU', value: environment.secondaryGpu, icon: 'GPU2' },
  ];

  return (
    <InfoCard
      icon=""
      title=""
      description=""
      gradient="from-blue-500 to-indigo-600"
    >
      <div>
        <h2 className="text-base font-bold text-slate-100">Test Environment</h2>
        <div className="text-slate-400 text-xs">Hardware and software specifications</div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-blue-300">OS</h3>
            <div className="text-slate-100 font-mono text-xs">{environment.os}</div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-blue-300">FW</h3>
            <div className="text-slate-100 font-mono text-xs">{environment.framework}</div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-blue-300">GPU1</h3>
            <div className="text-slate-100 font-mono text-xs">{environment.primaryGpu}</div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-blue-300">GPU2</h3>
            <div className="text-slate-100 font-mono text-xs">{environment.secondaryGpu}</div>
          </div>
        </div>
      </div>
    </InfoCard>
  );
}
