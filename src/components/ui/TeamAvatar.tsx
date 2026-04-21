'use client';

import {
  Dog, Waves, Blocks, Coffee, Guitar, BookOpen, Bike, Camera, Sprout, Gamepad2,
} from 'lucide-react';
import type { TeamMember, HobbyIcon } from '@/types';

const HOBBY_ICONS: Record<HobbyIcon, React.ElementType> = {
  dog: Dog,
  surf: Waves,
  lego: Blocks,
  coffee: Coffee,
  guitar: Guitar,
  book: BookOpen,
  bike: Bike,
  camera: Camera,
  plant: Sprout,
  gamepad: Gamepad2,
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

interface TeamAvatarProps {
  member: TeamMember;
}

export function TeamAvatar({ member }: TeamAvatarProps) {
  const HobbyIconCmp = member.hobby ? HOBBY_ICONS[member.hobby] : null;

  return (
    <div
      className="group flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-expando-orange-soft
                 transition-all duration-300 ease-out cursor-default"
      style={{ transformOrigin: 'center' }}
    >
      <div className="relative transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-expando-orange text-white
                        flex items-center justify-center text-lg font-bold overflow-hidden
                        ring-2 ring-transparent group-hover:ring-expando-orange transition-shadow">
          {member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={member.photo} alt={member.fullName} className="w-full h-full object-cover" />
          ) : (
            getInitials(member.fullName)
          )}
        </div>

        {/* Hobby icon bubble */}
        {HobbyIconCmp && (
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md
                          flex items-center justify-center border border-expando-gray-200
                          group-hover:scale-110 transition-transform duration-300">
            <HobbyIconCmp size={13} className="text-expando-orange" strokeWidth={1.8} />
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-xs sm:text-sm font-semibold text-expando-gray-900">{member.firstName}</p>
        {member.role && <p className="text-[11px] text-expando-gray-600 hidden sm:block">{member.role}</p>}
      </div>
    </div>
  );
}
