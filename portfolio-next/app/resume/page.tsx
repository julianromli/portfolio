'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Briefcase } from 'lucide-react';
import { HugeiconsStarIcon } from '@/components/ui/hugeicons-star';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
} from '@/lib/animations';

const education = [
  {
    title: "Bachelor's Degree in Public Relations, Advertising, and Applied Communication",
    period: '2019 — 2023',
    description:
      'Universitas Islam Negeri Bandung. Served as Chief of the Student Association (PERS Division). Founded the campus film community "CINEMART."',
  },
];

const experience = [
  {
    title: 'Founder | VibeDev ID Community',
    period: 'Sep 2025 — Present',
    description:
      'Providing a platform for developers leveraging AI to share knowledge, brainstorm, and collaborate. Managing 800+ active members, delivering AI Coding education, creating content for social media, and overseeing digital product management.',
  },
  {
    title: 'Visual Communication Design (DKV) | LUMBUNG TOUR HARAMAIN',
    period: 'Aug 2024 — Present',
    description:
      'Managing all design requirements and visual standards. Overseeing digitalization systems for asset management, congregation data, and social media. Handling comprehensive documentation for events and corporate programs.',
  },
  {
    title: 'Personal Assistant to CEO | LUMBUNG GROUP',
    period: 'Dec 2023 — Present',
    description:
      'Multi-tasking and problem-solving to improve organizational performance. Leveraging AI tools to streamline workflows and increase operational efficiency. Managing design needs for the group, subsidiaries, and CEO.',
  },
  {
    title: 'Motion Designer & Videographer | Spread Studios',
    period: 'Dec 2023 — Present',
    description:
      'Managing client requirements for motion graphics, reels, and graphic design. Participating in event execution and management to ensure project success.',
  },
  {
    title: 'Switcher & Camera Operator | AMAVIS',
    period: 'Jan 2023 — Present',
    description:
      'Managing live switching between video sources for broadcast quality. Ensuring accurate display of lower thirds, overlays, and branded graphics. Coordinating with director and audio team.',
  },
];

const certifications = [
  {
    title: 'Mentor Certificate | Kerjapake AI',
    period: 'Nov 2025 — Present',
    description: 'Recognized for excellence in AI mentoring and guidance.',
  },
  {
    title: 'Certified Prompt Optimization Specialist (CPOS) | AI For Productivity',
    period: 'Jul 2025 — Present',
    description: 'Certified in advanced prompt engineering and optimization techniques.',
  },
];

const skills = [
  { name: 'AI Literacy', level: 95, label: 'Expert' },
  { name: 'Video Editor / Videographer', level: 95, label: 'Expert' },
  { name: 'Graphic Design / Photographer', level: 95, label: 'Expert' },
  { name: 'Social Media Specialist', level: 85, label: 'Advanced' },
  { name: 'Full Stack Developer', level: 60, label: 'Intermediate' },
  { name: 'English', level: 90, label: 'Fluent' },
];

type TimelineIcon = 
  | { type: 'static'; icon: React.ComponentType<{ className?: string }> }
  | { type: 'animated'; AnimatedIcon: typeof HugeiconsStarIcon };

interface TimelineProps {
  iconConfig: TimelineIcon;
  title: string;
  items: Array<{
    title: string;
    period: string;
    description: string;
  }>;
  delay?: number;
}

function Timeline({ iconConfig, title, items, delay = 0 }: TimelineProps) {
  return (
    <motion.section
      className="mb-8"
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      transition={{ delay }}
    >
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-1 text-accent"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          {iconConfig.type === 'animated' ? (
            <iconConfig.AnimatedIcon size={20} />
          ) : (
            <iconConfig.icon className="h-5 w-5" />
          )}
        </motion.div>
        <h3 className="text-xl font-medium text-foreground">{title}</h3>
      </div>

      <motion.ol
        className="relative border-l-2 border-surface-2 ml-6 space-y-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {items.map((item, index) => (
          <motion.li
            key={index}
            className="pl-6 relative"
            variants={staggerItem}
          >
            <motion.div
              className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-accent bg-background-card"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
            />
            <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
            <span className="text-sm text-accent mb-2 block">{item.period}</span>
            <p className="text-sm text-foreground-subtle leading-relaxed">
              {item.description}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </motion.section>
  );
}

export default function ResumePage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <article className="bg-background-card border border-background-border rounded-lg p-6 lg:p-8">
      <motion.header variants={fadeInUp} initial="initial" animate="animate">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Resume</h2>
      </motion.header>

      <Timeline iconConfig={{ type: 'static', icon: BookOpen }} title="Education" items={education} delay={0.1} />
      <Timeline iconConfig={{ type: 'static', icon: Briefcase }} title="Experience" items={experience} delay={0.2} />
      <Timeline iconConfig={{ type: 'animated', AnimatedIcon: HugeiconsStarIcon }} title="Certifications" items={certifications} delay={0.3} />

      {/* Skills */}
      <motion.section
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-medium text-foreground mb-6">My Skills</h3>
        <motion.ul
          className="rounded-lg bg-surface-1 border border-background-border p-6 space-y-5"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {skills.map((skill, index) => (
            <motion.li key={skill.name} variants={staggerItem}>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-medium text-foreground">
                  {skill.name}
                </h4>
                <span className="text-sm text-accent">{skill.label}</span>
              </div>
              <div
                role="progressbar"
                aria-label={skill.name}
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuetext={`${skill.name}: ${skill.label} (${skill.level}%)`}
                className="h-2 rounded-full bg-surface-2 overflow-hidden"
              >
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover"
                  initial={prefersReducedMotion ? false : { width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={
                    prefersReducedMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.8,
                          delay: index * 0.1 + 0.5,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }
                  }
                />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>
    </article>
  );
}
