import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: ReactNode;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-1.5 font-semibold rounded-lg btn-press transition-all focus:outline-none focus:ring-2 focus:ring-balloon focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-soil text-canvas hover:bg-soil-light',
    secondary: 'bg-canvas text-soil border border-soil/20 hover:bg-canvas-dark',
    ghost: 'text-soil hover:bg-canvas-dark',
  };

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2.5',
    lg: 'text-base px-5 py-3',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}

interface AddButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
}

export function AddButton({ onClick, label = 'Add', className = '' }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-1.5 w-full py-2.5 border border-dashed border-soil/20 rounded-lg text-xs text-soil-muted hover:bg-canvas-dark btn-press transition-colors ${className}`}
    >
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      {label}
    </button>
  );
}
