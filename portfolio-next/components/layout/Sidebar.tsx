'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Globe, MapPin, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import { HugeiconsMailIcon } from '@/components/ui/hugeicons-mail';
import { HugeiconsChevronDownIcon } from '@/components/ui/hugeicons-chevron-down';
import { cn } from '@/lib/utils';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  iconHover,
} from '@/lib/animations';

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

const expandVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    marginTop: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    marginTop: 24,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.aside
      className={cn(
        'bg-background-card border border-background-border rounded-lg p-6',
        'lg:sticky lg:top-6 lg:h-fit lg:w-80 lg:shrink-0',
        'max-lg:mb-6'
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Basic Info */}
      <motion.div
        className="flex items-center gap-4 lg:flex-col lg:text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.figure className="shrink-0" variants={staggerItem}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/images/my-avatar.png"
              alt="Faiz Intifada Julian Romli"
              width={80}
              height={80}
              className="rounded-lg bg-surface-1"
              priority
            />
          </motion.div>
        </motion.figure>

        <motion.div className="flex-1" variants={staggerItem}>
          <h1 className="text-lg font-semibold text-foreground">
            Faiz Intifada Julian Romli
          </h1>
          <p className="mt-1 rounded bg-surface-1 px-3 py-1 text-sm text-foreground-muted inline-block">
            Digital Specialist
          </p>
        </motion.div>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            'flex items-center gap-2 rounded-lg bg-surface-1 px-4 py-2 text-sm text-foreground-muted',
            'transition-colors hover:bg-surface-2 hover:text-accent',
            'lg:hidden'
          )}
          variants={staggerItem}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Show Contacts</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <HugeiconsChevronDownIcon size={16} />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Expandable Content - Mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="overflow-hidden lg:hidden"
            variants={expandVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
          >
            <div className="mb-4 h-px bg-background-border" />
            <ContactsList />
            <div className="my-4 h-px bg-background-border" />
            <SocialsList />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Always visible on desktop */}
      <motion.div
        className="hidden lg:block mt-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.2 }}
      >
        <div className="mb-4 h-px bg-background-border" />
        <ContactsList />
        <div className="my-4 h-px bg-background-border" />
        <SocialsList />
      </motion.div>
    </motion.aside>
  );
}

function ContactsList() {
  return (
    <motion.ul
      className="space-y-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {contacts.map((contact) => (
        <motion.li
          key={contact.title}
          className="flex items-center gap-4"
          variants={staggerItem}
        >
          <motion.div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-1 text-accent"
            whileHover={iconHover}
          >
            {contact.animated ? (
              <contact.AnimatedIcon size={20} />
            ) : (
              <contact.icon className="h-5 w-5" />
            )}
          </motion.div>
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
        </motion.li>
      ))}
    </motion.ul>
  );
}

function SocialsList() {
  return (
    <motion.ul
      className="flex justify-center gap-4"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {socials.map((social) => (
        <motion.li key={social.label} variants={staggerItem}>
          <motion.a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-1 text-foreground-subtle transition-colors hover:bg-surface-2 hover:text-accent"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <social.icon className="h-5 w-5" />
          </motion.a>
        </motion.li>
      ))}
    </motion.ul>
  );
}
