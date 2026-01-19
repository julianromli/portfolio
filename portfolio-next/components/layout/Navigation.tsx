'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

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
    <motion.nav
      className="mb-6"
      aria-label="Main navigation"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.ul
        className="flex flex-wrap items-center gap-2 rounded-lg bg-background-card border border-background-border p-2"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {links.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <motion.li key={href} variants={staggerItem}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative block rounded-lg px-5 py-3 lg:py-2.5 text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'text-accent'
                    : 'text-foreground-muted hover:text-accent'
                )}
              >
                {isActive && (
                  <motion.span
                    className="absolute inset-0 rounded-lg bg-surface-1"
                    layoutId="nav-active"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </motion.nav>
  );
}
