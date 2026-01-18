'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'About' },
  { href: '/resume', label: 'Resume' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="mb-6" aria-label="Main navigation">
      <ul className="flex flex-wrap items-center gap-2 rounded-lg bg-background-card border border-background-border p-2">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'block rounded-lg px-5 py-3 lg:py-2.5 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-surface-1 text-accent'
                    : 'text-foreground-muted hover:text-accent'
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
