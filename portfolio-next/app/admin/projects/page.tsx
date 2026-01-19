import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit2, ExternalLink } from 'lucide-react';
import { getAllProjects } from '@/lib/db/queries';
import { DeleteProjectButton } from './delete-button';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-foreground">Projects</h1>
          <p className="text-foreground-muted mt-1">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-accent text-white font-medium rounded-[14px] hover:bg-accent-hover transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      {/* Projects Table */}
      {projects.length === 0 ? (
        <div className="bg-background border border-background-border rounded-[14px] p-12 text-center">
          <p className="text-foreground-muted mb-4">No projects yet</p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-[14px] hover:bg-accent-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create your first project
          </Link>
        </div>
      ) : (
        <div className="bg-background border border-background-border rounded-[14px] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-background-border bg-surface-1">
                <th className="text-left px-4 py-3 text-sm font-medium text-foreground-muted">
                  Project
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-foreground-muted hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-sm font-medium text-foreground-muted hidden md:table-cell">
                  Year
                </th>
                <th className="text-right px-4 py-3 text-sm font-medium text-foreground-muted">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-background-border last:border-0 hover:bg-surface-1/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-2 shrink-0">
                        {project.image.startsWith('http') || project.image.startsWith('/') ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-foreground-subtle text-xs">
                            No img
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {project.title}
                        </p>
                        <p className="text-sm text-foreground-muted truncate md:hidden">
                          {project.category}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground-muted hidden md:table-cell">
                    {project.category}
                  </td>
                  <td className="px-4 py-3 text-foreground-muted hidden md:table-cell">
                    {project.year}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        target="_blank"
                        className="p-2 text-foreground-subtle hover:text-foreground hover:bg-surface-2 rounded-lg transition-colors"
                        title="View"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="p-2 text-foreground-subtle hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <DeleteProjectButton id={project.id} title={project.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
