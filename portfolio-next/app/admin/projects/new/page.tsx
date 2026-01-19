import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ProjectForm } from '../project-form';
import { createProject } from '../actions';

export default function NewProjectPage() {
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
          <h1 className="font-serif text-3xl text-foreground">New Project</h1>
          <p className="text-foreground-muted mt-1">
            Create a new portfolio project
          </p>
        </div>
      </div>

      {/* Form */}
      <ProjectForm action={createProject} submitLabel="Create Project" />
    </div>
  );
}
