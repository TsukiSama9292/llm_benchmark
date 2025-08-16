import { InfoCard } from './InfoCard';

interface LicenseInfo {
  type: string;
  copyright: string;
  year: string;
  holder: string;
}

interface LicenseCardProps {
  license: LicenseInfo;
}

export function LicenseCard({ license }: LicenseCardProps) {
  return (
    <InfoCard
      icon=""
      title=""
      description=""
      gradient="from-green-500 to-emerald-600"
    >
      <div>
            <h2 className="text-base font-bold text-slate-100">License Information</h2>
            <div className="text-slate-400 text-xs">Open source licensing details</div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-green-300">LICENSE</h3>
                <div className="text-slate-100 font-mono text-xs">{license.type}</div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-green-300">COPYRIGHT</h3>
                <div className="text-slate-300 text-xs">{license.copyright} {license.year} {license.holder}</div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-green-300">TERMS</h3>
                <div className="text-slate-400 text-xs leading-relaxed">
                  Permission is hereby granted, free of charge, to any person obtaining a copy
                  of this software and associated documentation files.
                </div>
              </div>
        </div>
      </div>
    </InfoCard>
  );
}
