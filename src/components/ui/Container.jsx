import { cn } from '@/utils';

export default function Container({ children, className, as: Component = 'div', ...props }) {
  return (
    <Component className={cn('container-custom', className)} {...props}>
      {children}
    </Component>
  );
}
