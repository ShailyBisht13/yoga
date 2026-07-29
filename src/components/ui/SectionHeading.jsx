import { cn } from '@/utils';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  titleClassName,
}) {
  const alignments = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  return (
    <div className={cn('flex flex-col gap-3', alignments[align], className)}>
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
          {eyebrow}
        </span>
      )}
      {title && (
        <h2
          className={cn(
            'font-heading text-3xl leading-tight text-dark md:text-4xl lg:text-5xl',
            titleClassName,
          )}
        >
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {subtitle}
        </p>
      )}
      <LotusDivider className={align === 'center' ? 'mx-auto' : ''} />
    </div>
  );
}

function LotusDivider({ className }) {
  return (
    <svg
      className={cn('mt-2 h-5 w-5 text-secondary', className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 3c-1.5 3-4 5-4 8 0 2.5 1.5 4 4 4s4-1.5 4-4c0-3-2.5-5-4-8z" />
    </svg>
  );
}
