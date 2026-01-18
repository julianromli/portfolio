import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { getProjectBySlug } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found' };
  }

  return {
    title: `${project.title} - Portfolio`,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="bg-background-card border border-background-border rounded-lg p-6 lg:p-8">
      {/* Back Navigation */}
      <nav className="mb-6">
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
      </nav>

      {/* Hero Image */}
      <figure className="relative aspect-video w-full overflow-hidden rounded-lg mb-8 bg-surface-1">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </figure>

      {/* Title & Meta */}
      <header className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-3 font-serif">
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="bg-accent/10 text-accent px-3 py-1 rounded-full font-medium">
            {project.category}
          </span>
          <span className="text-foreground-subtle">{project.year}</span>
        </div>
      </header>

      {/* Description */}
      <section className="mb-8">
        <p className="text-foreground-muted leading-relaxed text-lg">
          {project.description}
        </p>
      </section>

      {/* Tech Stack */}
      <section className="mb-8">
        <h2 className="text-lg font-medium text-foreground mb-4">Tech Stack</h2>
        <ul className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="bg-surface-1 border border-background-border text-foreground-subtle text-sm px-3 py-1.5 rounded-full"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      {/* External Links */}
      {(project.liveUrl || project.githubUrl) && (
        <section className="mb-8">
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                <ExternalLink size={18} aria-hidden="true" />
                <span>View Live Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-surface-1 border border-background-border hover:border-accent text-foreground-muted hover:text-accent font-medium px-5 py-2.5 rounded-lg transition-colors"
              >
                <Github size={18} aria-hidden="true" />
                <span>View on GitHub</span>
              </a>
            )}
          </div>
        </section>
      )}

      {/* Screenshots Gallery */}
      {project.screenshots.length > 1 && (
        <section>
          <h2 className="text-lg font-medium text-foreground mb-4">Screenshots</h2>
          <ul
            className="flex gap-4 overflow-x-auto pb-4 has-scrollbar snap-x snap-mandatory"
            role="region"
            aria-label="Project screenshots"
            tabIndex={0}
          >
            {project.screenshots.map((screenshot, index) => (
              <li key={index} className="shrink-0 snap-start">
                <figure className="relative w-80 aspect-video overflow-hidden rounded-lg bg-surface-1 border border-background-border">
                  <Image
                    src={screenshot}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="320px"
                  />
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
