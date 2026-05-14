'use client';

import { Modal } from '@/components/ui/Modal';
import type { TeamMember } from '@/types';

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember;
}

export function TeamMemberModal({
  isOpen,
  onClose,
  member,
}: TeamMemberModalProps) {
  const subtitle = member.role ?? '';

  const paragraphs = (member.bio ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      title={member.name}
      description={subtitle || undefined}
      size="lg"
    >
      <div className="flex flex-col sm:flex-row gap-6 pt-1">
        {member.photo && (
          <div className="flex-shrink-0">
            <div
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden
                         bg-expando-gray-50 ring-1 ring-expando-gray-200 shadow-sm"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {paragraphs.length > 0 ? (
            <div className="space-y-4">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base text-expando-gray-700 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-base text-expando-gray-600 italic">
              No bio yet.
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
}
