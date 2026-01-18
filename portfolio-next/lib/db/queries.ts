import { eq } from 'drizzle-orm';
import { projects, type Project } from './schema';
import { projects as staticProjects, getProjectBySlug as staticGetBySlug, getAllProjectSlugs as staticGetSlugs } from '@/lib/data/projects';

function convertStaticToDbFormat(p: typeof staticProjects[0], id: number): Project {
  return {
    ...p,
    id,
    liveUrl: p.liveUrl ?? null,
    githubUrl: p.githubUrl ?? null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

async function queryWithFallback<T>(
  dbQuery: () => Promise<T>,
  fallback: () => T
): Promise<T> {
  if (!process.env.DATABASE_URL) {
    return fallback();
  }

  try {
    const { db } = await import('./index');
    if (!db) return fallback();
    return await dbQuery();
  } catch (error) {
    console.warn('Database query failed, using static fallback:', error);
    return fallback();
  }
}

export async function getAllProjects(): Promise<Project[]> {
  return queryWithFallback(
    async () => {
      const { db } = await import('./index');
      return db.select().from(projects).orderBy(projects.year);
    },
    () => staticProjects.map((p, i) => convertStaticToDbFormat(p, i + 1))
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return queryWithFallback(
    async () => {
      const { db } = await import('./index');
      const result = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
      return result[0];
    },
    () => {
      const p = staticGetBySlug(slug);
      if (!p) return undefined;
      return convertStaticToDbFormat(p, 1);
    }
  );
}

export async function getProjectById(id: number): Promise<Project | undefined> {
  return queryWithFallback(
    async () => {
      const { db } = await import('./index');
      const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
      return result[0];
    },
    () => {
      const p = staticProjects[id - 1];
      if (!p) return undefined;
      return convertStaticToDbFormat(p, id);
    }
  );
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return queryWithFallback(
    async () => {
      const { db } = await import('./index');
      const result = await db.select({ slug: projects.slug }).from(projects);
      return result.map((r: { slug: string }) => r.slug);
    },
    () => staticGetSlugs()
  );
}
