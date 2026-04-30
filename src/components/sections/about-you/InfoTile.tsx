import type { LucideIcon } from 'lucide-react';

interface InfoTileProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export function InfoTile({ icon: Icon, label, value }: InfoTileProps) {
  return (
    <div className="flex items-start gap-3 py-3.5">
      <div
        className="w-9 h-9 rounded-lg bg-expando-orange-soft flex items-center
                   justify-center flex-shrink-0"
      >
        <Icon size={18} className="text-expando-orange" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p
          className="text-[11px] uppercase font-medium text-expando-gray-600
                     tracking-[0.05em]"
        >
          {label}
        </p>
        <p
          className="text-[15px] font-medium text-expando-gray-900 mt-0.5
                     leading-snug"
        >
          {value}
        </p>
      </div>
    </div>
  );
}
