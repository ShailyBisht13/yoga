import { cn } from '@/utils';

export default function Logo({ className, showText = true, size = 'md' }) {
  const sizes = {
    sm: { icon: 'h-8 w-8', text: 'text-sm' },
    md: { icon: 'h-10 w-10', text: 'text-base' },
    lg: { icon: 'h-12 w-12', text: 'text-lg' },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <img
        src="/logo.png"
        alt="Kewalya Yogshala"
        className={cn(icon, 'shrink-0 object-contain')}
      />
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn('font-heading font-semibold tracking-wide text-primary', text)}>
            KEWALYA
          </span>
          <span className="text-[0.65em] font-medium uppercase tracking-[0.2em] text-dark/70">
            Yogshala
          </span>
        </div>
      )}
    </div>
  );
}
