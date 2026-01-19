'use client';

import { useActionState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Globe, MapPin, Send } from 'lucide-react';
import { HugeiconsMailIcon } from '@/components/ui/hugeicons-mail';
import { HugeiconsRefreshIcon } from '@/components/ui/hugeicons-refresh';
import { cn } from '@/lib/utils';
import { submitContact } from './actions';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  cardHover,
  buttonHover,
  buttonTap,
} from '@/lib/animations';

type ContactInfoItem =
  | { animated: true; AnimatedIcon: typeof HugeiconsMailIcon; title: string; value: string; href?: string }
  | { animated: false; icon: typeof Phone; title: string; value: string; href?: string };

const contactInfo: ContactInfoItem[] = [
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
  },
  {
    animated: false,
    icon: MapPin,
    title: 'Location',
    value: 'Bandung, Indonesia',
  },
];

export default function ContactPage() {
  const [state, formAction, isPending] = useActionState(submitContact, {});

  return (
    <article className="bg-background-card border border-background-border rounded-lg p-6 lg:p-8">
      <motion.header variants={fadeInUp} initial="initial" animate="animate">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Contact</h2>
      </motion.header>

      {/* Map */}
      <motion.section
        className="mb-8 rounded-lg overflow-hidden border border-background-border"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.1 }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253840.65295080092!2d107.41157449453124!3d-6.9034495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Bandung%20City%2C%20West%20Java%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1647608789441!5m2!1sen!2sus"
          width="100%"
          height="300"
          loading="lazy"
          className="grayscale opacity-80"
          title="Location Map"
        />
      </motion.section>

      {/* Contact Info Cards */}
      <motion.section className="mb-8">
        <motion.ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {contactInfo.map((info) => (
            <motion.li
              key={info.title}
              variants={staggerItem}
              whileHover={cardHover}
              className="flex items-center gap-4 rounded-lg bg-surface-1 border border-background-border p-4 cursor-default"
            >
              <motion.div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-surface-2 text-accent"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
              >
                {info.animated ? (
                  <info.AnimatedIcon size={20} />
                ) : (
                  <info.icon className="h-5 w-5" />
                )}
              </motion.div>
              <div className="min-w-0">
                <p className="text-xs text-foreground-subtle uppercase">
                  {info.title}
                </p>
                {info.href ? (
                  <a
                    href={info.href}
                    className="block truncate text-sm text-foreground-muted hover:text-accent transition-colors"
                  >
                    {info.value}
                  </a>
                ) : (
                  <p className="text-sm text-foreground-muted">{info.value}</p>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-xl font-medium text-foreground mb-6">Contact Form</h3>

        {state.success ? (
          <motion.div
            className="rounded-lg bg-success-light border border-success/30 p-6 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-success font-medium mb-2">Message sent successfully!</p>
            <p className="text-sm text-foreground-subtle">
              Thank you for reaching out. I&apos;ll get back to you soon.
            </p>
          </motion.div>
        ) : (
          <motion.form
            action={formAction}
            className="space-y-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div className="grid gap-4 sm:grid-cols-2" variants={staggerItem}>
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Full name"
                  required
                  minLength={2}
                  aria-describedby={state.fieldErrors?.name ? 'name-error' : undefined}
                  className={cn(
                    'w-full rounded-lg bg-surface-1 border px-4 py-3 text-foreground',
                    'placeholder:text-foreground-subtle focus:border-accent focus:outline-none transition-colors',
                    state.fieldErrors?.name
                      ? 'border-error'
                      : 'border-background-border'
                  )}
                />
                {state.fieldErrors?.name && (
                  <p id="name-error" className="mt-1 text-sm text-error">
                    {state.fieldErrors.name[0]}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email address"
                  required
                  aria-describedby={state.fieldErrors?.email ? 'email-error' : undefined}
                  className={cn(
                    'w-full rounded-lg bg-surface-1 border px-4 py-3 text-foreground',
                    'placeholder:text-foreground-subtle focus:border-accent focus:outline-none transition-colors',
                    state.fieldErrors?.email
                      ? 'border-error'
                      : 'border-background-border'
                  )}
                />
                {state.fieldErrors?.email && (
                  <p id="email-error" className="mt-1 text-sm text-error">
                    {state.fieldErrors.email[0]}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <label htmlFor="message" className="sr-only">
                Your message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Your message..."
                required
                minLength={10}
                rows={6}
                aria-describedby={state.fieldErrors?.message ? 'message-error' : undefined}
                className={cn(
                  'w-full rounded-lg bg-surface-1 border px-4 py-3 text-foreground resize-none',
                  'placeholder:text-foreground-subtle focus:border-accent focus:outline-none transition-colors',
                  state.fieldErrors?.message
                    ? 'border-error'
                    : 'border-background-border'
                )}
              />
              {state.fieldErrors?.message && (
                <p id="message-error" className="mt-1 text-sm text-error">
                  {state.fieldErrors.message[0]}
                </p>
              )}
            </motion.div>

            <motion.div variants={staggerItem}>
              <motion.button
                type="submit"
                disabled={isPending}
                whileHover={!isPending ? buttonHover : undefined}
                whileTap={!isPending ? buttonTap : undefined}
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-medium text-white',
                  'transition-colors hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed'
                )}
              >
                {isPending ? (
                  <HugeiconsRefreshIcon size={20} className="animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
                <span>{isPending ? 'Sending...' : 'Send Message'}</span>
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </motion.section>
    </article>
  );
}
