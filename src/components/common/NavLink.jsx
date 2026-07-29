import { NavLink as RouterNavLink } from 'react-router-dom';
import { cn } from '@/utils';

export default function NavLink({ to, children, className, onClick, light = false }) {
  return (
    <RouterNavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'relative py-1 text-sm font-medium tracking-wide transition-colors duration-300',
          light
            ? 'text-white/85 hover:text-white'
            : 'text-dark/80 hover:text-primary',
          isActive && (light ? 'text-white' : 'text-primary'),
          className,
        )
      }
    >
      {({ isActive }) => (
        <>
          {children}
          <span
            className={cn(
              'absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300',
              light ? 'bg-white' : 'bg-secondary',
              isActive && 'scale-x-100',
            )}
          />
        </>
      )}
    </RouterNavLink>
  );
}