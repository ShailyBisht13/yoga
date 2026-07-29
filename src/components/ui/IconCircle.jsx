import { cn } from '@/utils';

export default function IconCircle({ children, className, size = 'md' }) {
  const sizes = {
    sm: 'h-10 w-10',
    md: 'h-14 w-14',
    lg: 'h-16 w-16',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full bg-accent/30 text-secondary',
        sizes[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
