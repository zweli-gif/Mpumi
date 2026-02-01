import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, onClick }: CardProps) {
  return (
    <div
      className={`bg-white rounded-[10px] p-3.5 shadow-[0_1px_4px_rgba(74,52,37,0.06)] ${
        hover ? 'card-hover cursor-pointer' : ''
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  badge?: ReactNode;
}

export function CardTitle({ children, badge }: CardTitleProps) {
  return (
    <div className="font-heading text-[15px] font-semibold text-soil mb-2.5 flex items-center justify-between">
      <span>{children}</span>
      {badge}
    </div>
  );
}

interface CardBadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export function CardBadge({ children, variant = 'default' }: CardBadgeProps) {
  const variantClasses = {
    default: 'bg-soil text-canvas',
    success: 'bg-success/15 text-success',
    warning: 'bg-warning/15 text-warning',
    error: 'bg-error/15 text-error',
    info: 'bg-info/15 text-info',
  };

  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-[10px] ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}
