import { NavLink as RouterNavLink } from 'react-router-dom';
import { cn } from '@/utils';

export default function NavLink({ to, children, className, onClick }) {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'relative py-1 text-sm font-medium text-dark/80 transition-colors duration-300 hover:text-primary',
          isActive && 'text-primary',
          className,
        )
      }
    >
      {({ isActive }) => (
        <>
          {children}
          <span
            className={cn(
              'absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-secondary transition-transform duration-300',
              isActive && 'scale-x-100',
            )}
          />
        </>
      )}
    </RouterNavLink>
  );
}
