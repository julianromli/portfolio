import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getProjectById } from '@/lib/db/queries';
import { ProjectForm } from '../project-form';
import { updateProject } from '../actions';

export const dynamic = 'force-dynamic';

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const projectId = parseInt(id, 10);

  if (isNaN(projectId)) {
    notFound();
  }

  const project = await getProjectById(projectId);

  if (!project) {
    notFound();
  }

  const boundUpdateAction = updateProject.bind(null, projectId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="p-2 text-foreground-muted hover:text-foreground hover:bg-surface-2 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-foreground">Edit Project</h1>
          <p className="text-foreground-muted mt-1">
            {project.title}
          </p>
        </div>
      </div>

      {/* Form */}
      <ProjectForm
        project={project}
        action={boundUpdateAction}
        submitLabel="Save Changes"
      />
    </div>
  );
}
