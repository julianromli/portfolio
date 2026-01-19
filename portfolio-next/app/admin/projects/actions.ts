'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { isAuthenticated } from '@/lib/admin/auth';
import { projects, type NewProject } from '@/lib/db/schema';

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

interface ActionState {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

async function requireAuth(): Promise<boolean> {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect('/admin/login');
  }
  return true;
}

async function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('Database not configured. Add DATABASE_URL to your environment.');
  }
  const { db } = await import('@/lib/db');
  return db;
}

export async function createProject(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAuth();

  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as string;
  const year = parseInt(formData.get('year') as string, 10);
  const techStackRaw = formData.get('techStack') as string;
  const screenshotsRaw = formData.get('screenshots') as string;
  const liveUrl = formData.get('liveUrl') as string || null;
  const githubUrl = formData.get('githubUrl') as string || null;

  const fieldErrors: Record<string, string[]> = {};

  if (!title) fieldErrors.title = ['Title is required'];
  if (!category) fieldErrors.category = ['Category is required'];
  if (!description) fieldErrors.description = ['Description is required'];
  if (!image) fieldErrors.image = ['Cover image is required'];
  if (!year || isNaN(year)) fieldErrors.year = ['Valid year is required'];

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const slug = generateSlug(title);
  const techStack = techStackRaw ? techStackRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
  const screenshots = screenshotsRaw ? screenshotsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

  try {
    const db = await getDb();
    
    const existing = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    if (existing.length > 0) {
      return { error: 'A project with this title already exists' };
    }

    const newProject: NewProject = {
      slug,
      title,
      category,
      description,
      image,
      techStack,
      screenshots,
      liveUrl,
      githubUrl,
      year,
    };

    await db.insert(projects).values(newProject);
    
    revalidatePath('/portfolio');
    revalidatePath('/admin/projects');
  } catch (error) {
    console.error('Failed to create project:', error);
    return { error: 'Failed to create project. Check database connection.' };
  }

  redirect('/admin/projects');
}

export async function updateProject(
  id: number,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await requireAuth();

  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const description = formData.get('description') as string;
  const image = formData.get('image') as string;
  const year = parseInt(formData.get('year') as string, 10);
  const techStackRaw = formData.get('techStack') as string;
  const screenshotsRaw = formData.get('screenshots') as string;
  const liveUrl = formData.get('liveUrl') as string || null;
  const githubUrl = formData.get('githubUrl') as string || null;

  const fieldErrors: Record<string, string[]> = {};

  if (!title) fieldErrors.title = ['Title is required'];
  if (!category) fieldErrors.category = ['Category is required'];
  if (!description) fieldErrors.description = ['Description is required'];
  if (!image) fieldErrors.image = ['Cover image is required'];
  if (!year || isNaN(year)) fieldErrors.year = ['Valid year is required'];

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  const slug = generateSlug(title);
  const techStack = techStackRaw ? techStackRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
  const screenshots = screenshotsRaw ? screenshotsRaw.split(',').map(s => s.trim()).filter(Boolean) : [];

  try {
    const db = await getDb();

    const existing = await db.select().from(projects).where(eq(projects.slug, slug)).limit(1);
    if (existing.length > 0 && existing[0].id !== id) {
      return { error: 'A project with this title already exists' };
    }

    await db.update(projects).set({
      slug,
      title,
      category,
      description,
      image,
      techStack,
      screenshots,
      liveUrl,
      githubUrl,
      year,
      updatedAt: new Date(),
    }).where(eq(projects.id, id));

    revalidatePath('/portfolio');
    revalidatePath(`/portfolio/${slug}`);
    revalidatePath('/admin/projects');
  } catch (error) {
    console.error('Failed to update project:', error);
    return { error: 'Failed to update project. Check database connection.' };
  }

  redirect('/admin/projects');
}

export async function deleteProject(id: number): Promise<ActionState> {
  await requireAuth();

  try {
    const db = await getDb();
    await db.delete(projects).where(eq(projects.id, id));

    revalidatePath('/portfolio');
    revalidatePath('/admin/projects');
    
    return { success: true };
  } catch (error) {
    console.error('Failed to delete project:', error);
    return { error: 'Failed to delete project' };
  }
}
