import { cn } from '@/utils';

export default function Card({
  children,
  className,
  hover = false,
  padding = 'default',
  ...props
}) {
  const paddings = {
    none: '',
    sm: 'p-5',
    default: 'p-6 md:p-8',
    lg: 'p-8 md:p-10',
  };

  return (
    <div
      className={cn(
        'rounded-2xl bg-surface shadow-soft',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-card',
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
