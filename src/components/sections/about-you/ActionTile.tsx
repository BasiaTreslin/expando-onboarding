import { Check, type LucideIcon } from 'lucide-react';

interface ActionTileProps {
  icon: LucideIcon;
  label: string;
  description: string;
  ctaText: string;
  completed?: boolean;
  completedBadge?: string;
  onClick: () => void;
}

export function ActionTile({
  icon: Icon,
  label,
  description,
  ctaText,
  completed = false,
  completedBadge,
  onClick,
}: ActionTileProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full text-left p-3.5 rounded-lg
                 bg-expando-warm-tint
                 border border-transparent
                 transition-all duration-150 ease-out
                 hover:-translate-y-px hover:border-expando-orange/30
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-expando-orange
                 focus-visible:ring-offset-2"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-lg bg-expando-orange-soft-strong flex items-center
                     justify-center flex-shrink-0"
        >
          <Icon size={18} className="text-expando-orange" strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p
              className="text-[11px] uppercase font-medium text-expando-orange
                         tracking-[0.05em]"
            >
              {label}
            </p>
            {completed && completedBadge && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                           text-[10px] font-semibold
                           bg-expando-green-soft text-expando-green-deep"
              >
                <Check size={10} strokeWidth={2.5} />
                {completedBadge}
              </span>
            )}
          </div>
          <p
            className="text-[15px] font-medium text-expando-gray-900 mt-0.5
                       leading-snug"
          >
            {description}
          </p>
          <p className="text-[13px] font-medium text-expando-orange mt-1.5">
            {ctaText}
          </p>
        </div>
      </div>
    </button>
  );
}
