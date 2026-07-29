import { cn } from '@/utils';

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-soft hover:shadow-card',
  secondary:
    'bg-secondary text-white hover:bg-secondary/90 shadow-soft hover:shadow-card',
  outline:
    'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
  ghost:
    'border border-border text-dark bg-surface hover:border-primary hover:text-primary',
  link: 'text-primary underline-offset-4 hover:underline p-0 bg-transparent',
};

const sizes = {
  sm: 'px-5 py-2 text-sm',
  md: 'px-7 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  iconPosition = 'right',
  as: Component = 'button',
  ...props
}) {
  const isLink = variant === 'link';

  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        !isLink && variants[variant],
        !isLink && sizes[size],
        className,
      )}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      {children}
      {icon && iconPosition === 'right' && icon}
    </Component>
  );
}
