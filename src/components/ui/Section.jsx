import { cn } from '@/utils';

export default function Section({
  children,
  className,
  id,
  as: Component = 'section',
  padding = true,
  ...props
}) {
  return (
    <Component
      id={id}
      className={cn(padding && 'section-padding', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
