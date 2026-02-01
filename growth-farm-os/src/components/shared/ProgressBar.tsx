interface ProgressBarProps {
  value: number;
  max: number;
  target?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({
  value,
  max,
  target,
  showValue = false,
  size = 'md',
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const targetPercentage = target ? Math.min((target / max) * 100, 100) : null;

  // Determine color based on percentage
  const getColor = () => {
    if (percentage >= 100) return 'bg-success';
    if (percentage >= 75) return 'bg-success';
    if (percentage >= 50) return 'bg-warning';
    return 'bg-error';
  };

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-6',
    lg: 'h-8',
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`bg-soil/10 rounded-md overflow-hidden ${sizeClasses[size]}`}>
        <div
          className={`h-full ${getColor()} rounded-md flex items-center ${showValue ? 'px-2' : ''} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        >
          {showValue && size !== 'sm' && (
            <span className="text-[10px] font-semibold text-white whitespace-nowrap">
              {formatValue(value)}
            </span>
          )}
        </div>
      </div>

      {targetPercentage !== null && (
        <div
          className="absolute top-[-4px] bottom-[-4px] w-[3px] bg-soil rounded-sm"
          style={{ left: `${targetPercentage}%` }}
        >
          <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] text-soil whitespace-nowrap">
            Target
          </span>
        </div>
      )}
    </div>
  );
}

function formatValue(value: number): string {
  if (value >= 1000000) return `R${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `R${Math.round(value / 1000)}K`;
  return `R${value}`;
}

interface HealthRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function HealthRing({
  percentage,
  size = 140,
  strokeWidth = 12,
  label = 'Company Health',
}: HealthRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Determine color based on percentage
  const getStrokeColor = () => {
    if (percentage >= 75) return 'stroke-success';
    if (percentage >= 50) return 'stroke-warning';
    return 'stroke-error';
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="health-ring"
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-soil/15"
        />
        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${getStrokeColor()} transition-all duration-500`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-heading text-3xl font-bold text-soil">{percentage}%</span>
        <span className="text-[11px] text-soil-muted">{label}</span>
      </div>
    </div>
  );
}

interface StatusDotProps {
  status: 'success' | 'warning' | 'error' | 'info' | 'muted';
  size?: 'sm' | 'md';
}

export function StatusDot({ status, size = 'md' }: StatusDotProps) {
  const colorClasses = {
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-error',
    info: 'bg-info',
    muted: 'bg-soil-muted',
  };

  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
  };

  return <div className={`rounded-full ${colorClasses[status]} ${sizeClasses[size]}`} />;
}
