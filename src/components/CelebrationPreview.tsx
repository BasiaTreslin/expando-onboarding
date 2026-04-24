'use client';

import { useEffect, useState } from 'react';
import { CelebrationModal } from '@/components/CelebrationModal';
import type { NewHireConfig, ProfileTask } from '@/types';

interface CelebrationPreviewProps {
  config: NewHireConfig;
}

function isPreviewAllowed(): boolean {
  return (
    process.env.NODE_ENV !== 'production' ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
  );
}

export function CelebrationPreview({ config }: CelebrationPreviewProps) {
  const [task, setTask] = useState<ProfileTask | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isPreviewAllowed()) return;

    const raw = new URLSearchParams(window.location.search).get(
      'previewCelebration'
    );
    if (!raw) return;

    const tasks = config.profileTasks ?? [];
    if (tasks.length === 0) return;

    const candidate =
      raw === '1' || raw === 'true'
        ? tasks[0]
        : tasks.find((t) => t.id === raw);
    if (!candidate) return;

    setTask(candidate);
    setOpen(true);
  }, [config.profileTasks]);

  if (!task) return null;

  return (
    <CelebrationModal
      open={open}
      onClose={() => setOpen(false)}
      firstName={config.name}
      celebrationMediaUrl={task.celebrationMediaUrl}
      celebrationPoster={task.celebrationPoster}
      celebrationMessageKey={task.celebrationMessageKey}
    />
  );
}
