'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, Globe, MapPin, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { HugeiconsMailIcon } from '@/components/ui/hugeicons-mail';
import { HugeiconsChevronDownIcon } from '@/components/ui/hugeicons-chevron-down';
import { cn } from '@/lib/utils';

type ContactItem =
  | { animated: true; AnimatedIcon: typeof HugeiconsMailIcon; title: string; value: string; href?: string; external?: boolean }
  | { animated: false; icon: typeof Phone; title: string; value: string; href?: string; external?: boolean };

const contacts: ContactItem[] = [
  {
    animated: true,
    AnimatedIcon: HugeiconsMailIcon,
    title: 'Email',
    value: 'faizintifada@gmail.com',
    href: 'mailto:faizintifada@gmail.com',
  },
  {
    animated: false,
    icon: Phone,
    title: 'Phone',
    value: '+62 898 900 4363',
    href: 'tel:+628989004363',
  },
  {
    animated: false,
    icon: Globe,
    title: 'Website',
    value: 'faizintifada.my.id',
    href: 'https://faizintifada.my.id',
    external: true,
  },
  {
    animated: false,
    icon: MapPin,
    title: 'Location',
    value: 'Bandung, Indonesia',
  },
];

const socials = [
  {
    icon: Linkedin,
    href: 'https://linkedin.com/in/faizintifada',
    label: 'LinkedIn',
  },
  {
    icon: MessageCircle,
    href: 'https://threads.net/@faizintifada',
    label: 'Threads',
  },
  {
    icon: Youtube,
    href: 'https://youtube.com/@faizintifada',
    label: 'YouTube',
  },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={cn(
        'bg-background-card border border-background-border rounded-lg p-6 transition-all duration-300',
        'lg:sticky lg:top-6 lg:h-fit lg:w-80 lg:shrink-0',
        'max-lg:mb-6'
      )}
    >
      {/* Basic Info */}
      <div className="flex items-center gap-4 lg:flex-col lg:text-center">
        <figure className="shrink-0">
          <Image
            src="/images/my-avatar.png"
            alt="Faiz Intifada Julian Romli"
            width={80}
            height={80}
            className="rounded-lg bg-surface-1"
            priority
          />
        </figure>

        <div className="flex-1">
          <h1 className="text-lg font-semibold text-foreground">
            Faiz Intifada Julian Romli
          </h1>
          <p className="mt-1 rounded bg-surface-1 px-3 py-1 text-sm text-foreground-muted inline-block">
            Digital Specialist
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'flex items-center gap-2 rounded-lg bg-surface-1 px-4 py-2 text-sm text-foreground-muted',
            'transition-colors hover:bg-surface-2 hover:text-accent',
            'lg:hidden'
          )}
        >
          <span>Show Contacts</span>
          <HugeiconsChevronDownIcon
            size={16}
            className={cn(
              'transition-transform',
              isExpanded && 'rotate-180'
            )}
          />
        </button>
      </div>

      {/* Expandable Content */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 lg:mt-6 lg:max-h-none lg:opacity-100',
          isExpanded ? 'mt-6 max-h-[500px] opacity-100' : 'max-h-0 opacity-0 max-lg:mt-0'
        )}
      >
        {/* Separator */}
        <div className="mb-4 h-px bg-background-border" />

        {/* Contacts */}
        <ul className="space-y-4">
          {contacts.map((contact) => (
            <li key={contact.title} className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-1 text-accent">
                {contact.animated ? (
                  <contact.AnimatedIcon size={20} />
                ) : (
                  <contact.icon className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-xs text-foreground-subtle uppercase">
                  {contact.title}
                </p>
                {contact.href ? (
                  <a
                    href={contact.href}
                    target={contact.external ? '_blank' : undefined}
                    rel={contact.external ? 'noopener noreferrer' : undefined}
                    className="block truncate text-sm text-foreground-muted hover:text-accent transition-colors"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <address className="text-sm text-foreground-muted not-italic">
                    {contact.value}
                  </address>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Separator */}
        <div className="my-4 h-px bg-background-border" />

        {/* Socials */}
        <ul className="flex justify-center gap-4">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-1 text-foreground-subtle transition-colors hover:bg-surface-2 hover:text-accent"
              >
                <social.icon className="h-5 w-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
