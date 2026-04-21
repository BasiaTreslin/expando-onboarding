'use client';

import {
  MessageSquare, CheckSquare, FileText, Shield,
  ShoppingCart, Database, BarChart2, Users, Inbox,
} from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const TOOL_ICONS: Record<string, React.ElementType> = {
  Slack: MessageSquare,
  ClickUp: CheckSquare,
  Notion: FileText,
  'Zoho Vault': Shield,
  'Seller Central': ShoppingCart,
  'EXPANDO APP': Database,
  'Looker Studio': BarChart2,
  Pipedrive: Users,
  Missive: Inbox,
};

const TOOL_COLORS = [
  'bg-pink-50 text-pink-600',
  'bg-violet-50 text-violet-600',
  'bg-gray-50 text-gray-700',
  'bg-red-50 text-red-600',
  'bg-amber-50 text-amber-600',
  'bg-expando-orange-soft text-expando-orange',
  'bg-blue-50 text-blue-600',
  'bg-emerald-50 text-emerald-600',
  'bg-indigo-50 text-indigo-600',
];

interface ToolItem {
  name: string;
  desc: string;
}

export function ToolsSection() {
  const { t, messages } = useLanguage();
  const tools = messages.tools.items as ToolItem[];

  return (
    <SectionWrapper id="tools" className="py-20 sm:py-28 bg-white" stagger>
      <div className="section-container">
        {/* Heading */}
        <div className="mb-12">
          <div className="orange-line mb-4" />
          <h2 className="section-heading">{t('tools.title')}</h2>
          <p className="section-subheading max-w-2xl">{t('tools.subtitle')}</p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {tools.map((tool, i) => {
            const Icon = TOOL_ICONS[tool.name] ?? Database;
            const color = TOOL_COLORS[i % TOOL_COLORS.length];

            return (
              <div
                key={tool.name}
                className="group bg-expando-gray-50 hover:bg-white border border-expando-gray-200 hover:border-expando-orange/30
                           rounded-2xl p-4 flex flex-col items-center text-center gap-3 transition-all duration-200 hover:shadow-md cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center`}>
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-semibold text-expando-gray-900 text-sm">{tool.name}</p>
                  <p className="text-expando-gray-600 text-xs mt-1 leading-relaxed">{tool.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA note */}
        <div className="mt-10 flex items-start gap-3 bg-expando-orange-soft border border-orange-200 rounded-2xl p-5 max-w-2xl">
          <div className="w-8 h-8 rounded-lg bg-expando-orange flex items-center justify-center flex-shrink-0">
            <MessageSquare size={14} className="text-white" />
          </div>
          <p className="text-expando-gray-700 text-sm leading-relaxed">{t('tools.ctaNote')}</p>
        </div>
      </div>
    </SectionWrapper>
  );
}
