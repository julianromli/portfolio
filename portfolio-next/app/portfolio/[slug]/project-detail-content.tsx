'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/lib/db/schema';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  buttonHover,
  buttonTap,
} from '@/lib/animations';

interface ProjectDetailContentProps {
  project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
  return (
    <article className="bg-background-card border border-background-border rounded-lg p-6 lg:p-8">
      {/* Back Navigation */}
      <motion.nav
        className="mb-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-accent transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="transition-transform group-hover:-translate-x-1"
            aria-hidden="true"
          />
          <span>Portfolio</span>
        </Link>
      </motion.nav>

      {/* Hero Image */}
      <motion.figure
        className="relative aspect-video w-full overflow-hidden rounded-lg mb-8 bg-surface-1"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </motion.figure>

      {/* Title & Meta */}
      <motion.header
        className="mb-8"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-3 font-serif">
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">
            {project.category}
          </span>
          <span className="text-foreground-subtle">{project.year}</span>
        </div>
      </motion.header>

      {/* Description */}
      <motion.section
        className="mb-8"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.15 }}
      >
        <p className="text-foreground-muted leading-relaxed text-lg">
          {project.description}
        </p>
      </motion.section>

      {/* Tech Stack */}
      <motion.section
        className="mb-8"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-lg font-medium text-foreground mb-4">Tech Stack</h2>
        <motion.ul
          className="flex flex-wrap gap-2"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {project.techStack.map((tech) => (
            <motion.li
              key={tech}
              variants={staggerItem}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-surface-1 border border-background-border text-foreground-subtle text-sm px-3 py-1.5 rounded-full cursor-default"
            >
              {tech}
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* External Links */}
      {(project.liveUrl || project.githubUrl) && (
        <motion.section
          className="mb-8"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.25 }}
        >
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <ExternalLink size={18} aria-hidden="true" />
                <span>View Live Demo</span>
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-surface-1 border border-background-border hover:border-accent text-foreground-muted hover:text-accent font-medium px-5 py-2.5 rounded-lg transition-colors"
                whileHover={buttonHover}
                whileTap={buttonTap}
              >
                <Github size={18} aria-hidden="true" />
                <span>View on GitHub</span>
              </motion.a>
            )}
          </div>
        </motion.section>
      )}

      {/* Screenshots Gallery */}
      {project.screenshots.length > 1 && (
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-medium text-foreground mb-4">Screenshots</h2>
          <motion.ul
            className="flex gap-4 overflow-x-auto pb-4 has-scrollbar snap-x snap-mandatory"
            role="region"
            aria-label="Project screenshots"
            tabIndex={0}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {project.screenshots.map((screenshot, index) => (
              <motion.li
                key={index}
                className="shrink-0 snap-start"
                variants={staggerItem}
                whileHover={{ scale: 1.02 }}
              >
                <figure className="relative w-80 aspect-video overflow-hidden rounded-lg bg-surface-1 border border-background-border">
                  <Image
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </figure>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>
      )}
    </article>
  );
}
