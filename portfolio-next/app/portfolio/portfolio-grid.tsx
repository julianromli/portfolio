'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HugeiconsEyeIcon } from '@/components/ui/hugeicons-eye';
import { cn } from '@/lib/utils';
import {
  staggerContainer,
  staggerItem,
  fadeInUp,
  cardHover,
} from '@/lib/animations';
import type { Project } from '@/lib/db/schema';

const categories = ['All', 'Web design', 'Applications', 'Web development'];

interface PortfolioGridProps {
  projects: Project[];
}

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <article className="bg-background-card border border-background-border rounded-lg p-6 lg:p-8">
      <motion.header variants={fadeInUp} initial="initial" animate="animate">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Portfolio</h2>
      </motion.header>

      {/* Filter */}
      <motion.ul
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Filter projects by category"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {categories.map((category) => (
          <motion.li key={category} variants={staggerItem}>
            <motion.button
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                activeCategory === category
                  ? 'bg-accent text-white'
                  : 'bg-surface-1 text-foreground-muted hover:text-accent'
              )}
            >
              {category}
            </motion.button>
          </motion.li>
        ))}
      </motion.ul>

      {/* Projects Grid */}
      <motion.ul
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.25, 0.46, 0.45, 0.94],
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: { duration: 0.2 },
              }}
              whileHover={cardHover}
            >
              <Link
                href={`/portfolio/${project.slug}`}
                className="group block w-full text-left rounded-lg overflow-hidden bg-surface-1 border border-background-border"
              >
                <figure className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-foreground/60 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HugeiconsEyeIcon size={32} className="text-accent" aria-hidden="true" />
                  </motion.div>
                </figure>
                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground-subtle">{project.category}</p>
                </div>
              </Link>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </article>
  );
}
