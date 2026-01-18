'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HugeiconsEyeIcon } from '@/components/ui/hugeicons-eye';
import { cn } from '@/lib/utils';
import { projects } from '@/lib/data/projects';

const categories = ['All', 'Web design', 'Applications', 'Web development'];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <article className="bg-background-card border border-background-border rounded-lg p-6 lg:p-8">
      <header>
        <h2 className="text-2xl font-semibold text-foreground mb-6">Portfolio</h2>
      </header>

      {/* Filter */}
      <ul className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter projects by category">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                activeCategory === category
                  ? 'bg-accent text-white'
                  : 'bg-surface-1 text-foreground-muted hover:text-accent'
              )}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      {/* Projects Grid */}
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/portfolio/${project.slug}`}
              className="group block w-full text-left rounded-lg overflow-hidden bg-surface-1 border border-background-border transition-transform hover:scale-[1.02]"
            >
              <figure className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <HugeiconsEyeIcon size={32} className="text-accent" aria-hidden="true" />
                </div>
              </figure>
              <div className="p-4">
                <h3 className="font-medium text-foreground mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-foreground-subtle">{project.category}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
