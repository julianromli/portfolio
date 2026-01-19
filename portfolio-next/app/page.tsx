'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Palette, Code, Users, Video } from 'lucide-react';
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  cardHover,
} from '@/lib/animations';

const services = [
  {
    icon: Palette,
    iconSrc: '/images/icon-design.svg',
    title: 'Visual Design',
    description:
      'Expert graphic design, motion graphics, and visual communication for brands and organizations.',
  },
  {
    icon: Code,
    iconSrc: '/images/icon-dev.svg',
    title: 'AI & Development',
    description:
      'Full stack development with AI integration, workflow automation, and digital product management.',
  },
  {
    icon: Users,
    iconSrc: '/images/icon-app.svg',
    title: 'Community Management',
    description:
      'Building and managing developer communities with 800+ active members focused on AI Coding.',
  },
  {
    icon: Video,
    iconSrc: '/images/icon-photo.svg',
    title: 'Videography',
    description:
      'Professional video production, motion design, and live event broadcasting.',
  },
];

const testimonials = [
  {
    name: 'Daniel Lewis',
    avatar: '/images/avatar-1.png',
    text: 'Faiz delivered exceptional work on our corporate identity project. His expertise in visual design and attention to client needs made the collaboration smooth and results outstanding.',
  },
  {
    name: 'Jessica Miller',
    avatar: '/images/avatar-2.png',
    text: 'Working with Faiz on our AI integration project was a great experience. He brought innovative solutions and excellent communication throughout the process.',
  },
  {
    name: 'Emily Evans',
    avatar: '/images/avatar-3.png',
    text: 'The community management skills Faiz demonstrated were impressive. He helped us build an engaged developer community from the ground up.',
  },
  {
    name: 'Henry William',
    avatar: '/images/avatar-4.png',
    text: 'Faiz produced high-quality video content for our events. His technical expertise and creative vision exceeded our expectations.',
  },
];

const clients = [
  { src: '/images/clients/client-1.svg', name: 'Client 1' },
  { src: '/images/clients/client-2.svg', name: 'Client 2' },
  { src: '/images/clients/client-3.svg', name: 'Client 3' },
  { src: '/images/clients/client-4.svg', name: 'Client 4' },
  { src: '/images/clients/client-5.svg', name: 'Client 5' },
  { src: '/images/clients/client-6.svg', name: 'Client 6' },
];

export default function AboutPage() {
  return (
    <article className="bg-background-card border border-background-border rounded-lg p-6 lg:p-8">
      <motion.header variants={fadeInUp} initial="initial" animate="animate">
        <h2 className="text-2xl font-semibold text-foreground mb-6">About me</h2>
      </motion.header>

      {/* About Text */}
      <motion.section
        className="space-y-4 text-foreground-muted leading-relaxed mb-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.p variants={staggerItem}>
          Results-driven Digital Specialist with strong expertise in AI community
          management, visual communication, and digital product development.
          Proven experience as a founder and leader of innovation-driven
          communities, managing over 800 active members and delivering impactful
          educational content on AI Coding across multiple platforms.
        </motion.p>
        <motion.p variants={staggerItem}>
          Skilled in visual design, motion graphics, and videography, supporting
          organizations and clients through high-quality content and strategic
          digitalization. Adept at leveraging AI technologies, streamlining
          workflows, and collaborating with diverse teams in dynamic
          environments. Demonstrated leadership in campus organizations,
          recognized for mentoring and prompt engineering, and fluent in both
          English and Indonesian.
        </motion.p>
      </motion.section>

      {/* Services */}
      <motion.section
        className="mb-8"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
      >
        <h3 className="text-xl font-medium text-foreground mb-6">
          What I&apos;m doing
        </h3>
        <motion.ul
          className="grid gap-4 sm:grid-cols-2"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {services.map((service) => (
            <motion.li
              key={service.title}
              variants={staggerItem}
              whileHover={cardHover}
              className="flex gap-4 rounded-lg bg-surface-1 border border-background-border p-5 cursor-default"
            >
              <div className="shrink-0">
                <Image
                  src={service.iconSrc}
                  alt={service.title}
                  width={40}
                  height={40}
                  className="text-accent"
                />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-1">
                  {service.title}
                </h4>
                <p className="text-sm text-foreground-subtle leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="mb-8"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <h3 className="text-xl font-medium text-foreground mb-6">Testimonials</h3>
        <motion.ul
          className="flex gap-4 overflow-x-auto pb-4 has-scrollbar snap-x snap-mandatory"
          tabIndex={0}
          role="region"
          aria-label="Testimonials carousel"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {testimonials.map((testimonial, index) => (
            <motion.li
              key={testimonial.name}
              variants={staggerItem}
              custom={index}
              whileHover={cardHover}
              className="shrink-0 w-72 snap-start rounded-lg bg-surface-1 border border-background-border p-5 cursor-default"
            >
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
                <h4 className="font-medium text-foreground">{testimonial.name}</h4>
              </div>
              <p className="text-sm text-foreground-subtle leading-relaxed line-clamp-4">
                {testimonial.text}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* Clients */}
      <motion.section variants={fadeInUp} initial="initial" animate="animate">
        <h3 className="text-xl font-medium text-foreground mb-6">Clients</h3>
        <motion.ul
          className="flex gap-4 overflow-x-auto pb-4 has-scrollbar"
          tabIndex={0}
          role="region"
          aria-label="Clients carousel"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {clients.map((client, index) => (
            <motion.li
              key={client.name}
              variants={staggerItem}
              custom={index}
              whileHover={{ scale: 1.05, opacity: 1 }}
              className="shrink-0 flex items-center justify-center rounded-lg bg-surface-1 border border-background-border p-4 h-20 w-36"
            >
              <Image
                src={client.src}
                alt={client.name}
                width={100}
                height={40}
                className="max-h-10 w-auto object-contain opacity-60 transition-opacity hover:opacity-100"
              />
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>
    </article>
  );
}
