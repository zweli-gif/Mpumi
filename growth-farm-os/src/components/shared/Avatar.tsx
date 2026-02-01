interface AvatarProps {
  initials: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
  mood?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'w-5 h-5 text-[8px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
};

export function Avatar({ initials, color, size = 'md', mood, className = '' }: AvatarProps) {
  return (
    <div className="relative inline-block">
      <div
        className={`rounded-full flex items-center justify-center font-heading font-semibold text-white ${sizeClasses[size]} ${className}`}
        style={{ backgroundColor: color }}
      >
        {initials}
      </div>
      {mood && (
        <span className="absolute -bottom-0.5 -right-0.5 text-xs">
          {mood}
        </span>
      )}
    </div>
  );
}

interface AvatarGroupProps {
  avatars: Array<{ initials: string; color: string }>;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function AvatarGroup({ avatars, max = 4, size = 'sm' }: AvatarGroupProps) {
  const displayed = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <div className="flex -space-x-1.5">
      {displayed.map((avatar, index) => (
        <Avatar
          key={index}
          initials={avatar.initials}
          color={avatar.color}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {overflow > 0 && (
        <div className={`rounded-full flex items-center justify-center bg-canvas-dark text-soil-muted font-semibold ring-2 ring-white ${sizeClasses[size]}`}>
          +{overflow}
        </div>
      )}
    </div>
  );
}
