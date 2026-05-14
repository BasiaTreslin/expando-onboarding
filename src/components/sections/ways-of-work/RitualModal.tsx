'use client';

import { useLanguage } from '@/i18n/LanguageContext';
import { Modal } from '@/components/ui/Modal';
import type { RitualColor } from './RitualCard';

export type RitualKey = 'okrs' | 'allhands' | 'reviews';

interface RitualModalProps {
  isOpen: boolean;
  onClose: () => void;
  ritualKey: RitualKey;
  color: RitualColor;
}

interface WaysOfWorkOkrsModal {
  whatItIsTitle: string;
  whatItIs: string;
  howItWorksTitle: string;
  howItWorks: string[];
  structureTitle: string;
  structure: string[];
  exampleTitle: string;
  exampleObjective: string;
  exampleKR: string;
  exampleMilestone: string;
  ruleTitle: string;
  rule: string;
}

interface WaysOfWorkAllHandsModal {
  whatItIsTitle: string;
  whatItIs: string;
  whenWhereTitle: string;
  whenWhere: string[];
  whatYouHearTitle: string;
  whatYouHear: string[];
  afterTheSyncTitle: string;
  afterTheSync: string;
}

interface WaysOfWorkReviewsModal {
  whatItIsTitle: string;
  whatItIs: string;
  cadenceTitle: string;
  cadence: string[];
  whatWeTalkAboutTitle: string;
  whatWeTalkAbout: string[];
  ourPromiseTitle: string;
  ourPromise: string;
}

interface WaysOfWorkMessages {
  waysOfWork: {
    okrs: { title: string; teaser: string; modal: WaysOfWorkOkrsModal };
    allhands: { title: string; teaser: string; modal: WaysOfWorkAllHandsModal };
    reviews: { title: string; teaser: string; modal: WaysOfWorkReviewsModal };
  };
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-sm uppercase font-semibold text-expando-orange
                 tracking-wide mb-3"
    >
      {children}
    </h3>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="text-base text-gray-700 leading-relaxed">{children}</p>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-2 text-base text-gray-700 leading-relaxed">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function Section({
  children,
  isFirst = false,
}: {
  children: React.ReactNode;
  isFirst?: boolean;
}) {
  return (
    <section
      className={`${isFirst ? 'pt-0' : 'pt-5'} pb-5 ${
        isFirst ? '' : 'border-t border-expando-gray-200'
      }`}
    >
      {children}
    </section>
  );
}

export function RitualModal({
  isOpen,
  onClose,
  ritualKey,
  color: _color,
}: RitualModalProps) {
  const { t, messages } = useLanguage();
  const ww = (messages as unknown as WaysOfWorkMessages).waysOfWork;

  const title = t(`waysOfWork.${ritualKey}.title`);
  const subtitle = t(`waysOfWork.${ritualKey}.teaser`);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={title}
      description={subtitle}
      size="lg"
    >
      {ritualKey === 'okrs' && (
        <>
          <Section isFirst>
            <Heading>{ww.okrs.modal.whatItIsTitle}</Heading>
            <Body>{ww.okrs.modal.whatItIs}</Body>
          </Section>

          <Section>
            <Heading>{ww.okrs.modal.howItWorksTitle}</Heading>
            <Bullets items={ww.okrs.modal.howItWorks} />
          </Section>

          <Section>
            <Heading>{ww.okrs.modal.structureTitle}</Heading>
            <Bullets items={ww.okrs.modal.structure} />
          </Section>

          <Section>
            <Heading>{ww.okrs.modal.exampleTitle}</Heading>
            <div className="space-y-2 text-base text-gray-700 leading-relaxed">
              <p>{ww.okrs.modal.exampleObjective}</p>
              <p>{ww.okrs.modal.exampleKR}</p>
              <p>{ww.okrs.modal.exampleMilestone}</p>
            </div>
          </Section>

          <Section>
            <Heading>{ww.okrs.modal.ruleTitle}</Heading>
            <p className="text-base text-gray-700 leading-relaxed italic">
              {ww.okrs.modal.rule}
            </p>
          </Section>
        </>
      )}

      {ritualKey === 'allhands' && (
        <>
          <Section isFirst>
            <Heading>{ww.allhands.modal.whatItIsTitle}</Heading>
            <Body>{ww.allhands.modal.whatItIs}</Body>
          </Section>

          <Section>
            <Heading>{ww.allhands.modal.whenWhereTitle}</Heading>
            <Bullets items={ww.allhands.modal.whenWhere} />
          </Section>

          <Section>
            <Heading>{ww.allhands.modal.whatYouHearTitle}</Heading>
            <Bullets items={ww.allhands.modal.whatYouHear} />
          </Section>

          <Section>
            <Heading>{ww.allhands.modal.afterTheSyncTitle}</Heading>
            <Body>{ww.allhands.modal.afterTheSync}</Body>
          </Section>
        </>
      )}

      {ritualKey === 'reviews' && (
        <>
          <Section isFirst>
            <Heading>{ww.reviews.modal.whatItIsTitle}</Heading>
            <Body>{ww.reviews.modal.whatItIs}</Body>
          </Section>

          <Section>
            <Heading>{ww.reviews.modal.cadenceTitle}</Heading>
            <Bullets items={ww.reviews.modal.cadence} />
          </Section>

          <Section>
            <Heading>{ww.reviews.modal.whatWeTalkAboutTitle}</Heading>
            <Bullets items={ww.reviews.modal.whatWeTalkAbout} />
          </Section>

          <Section>
            <Heading>{ww.reviews.modal.ourPromiseTitle}</Heading>
            <Body>{ww.reviews.modal.ourPromise}</Body>
          </Section>
        </>
      )}
    </Modal>
  );
}
