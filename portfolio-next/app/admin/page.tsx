import Link from 'next/link';
import { FolderKanban, Plus, Database, Upload, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { getAllProjects, checkDatabaseConnection } from '@/lib/db/queries';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const [projects, dbStatus] = await Promise.all([
    getAllProjects(),
    checkDatabaseConnection(),
  ]);

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      icon: FolderKanban,
      href: '/admin/projects',
    },
  ];

  const getDbStatusDisplay = () => {
    if (!process.env.DATABASE_URL) {
      return {
        text: 'Not Configured',
        color: 'text-foreground-muted',
        icon: XCircle,
        iconColor: 'text-foreground-subtle',
      };
    }
    if (dbStatus.connected) {
      return {
        text: 'PostgreSQL (Connected)',
        color: 'text-success',
        icon: CheckCircle,
        iconColor: 'text-success',
      };
    }
    return {
      text: 'PostgreSQL (Fallback)',
      color: 'text-amber-600',
      icon: AlertTriangle,
      iconColor: 'text-amber-500',
    };
  };

  const dbDisplay = getDbStatusDisplay();
  const DbStatusIcon = dbDisplay.icon;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl text-foreground">Dashboard</h1>
        <p className="text-foreground-muted mt-1">
          Manage your portfolio content
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-background border border-background-border rounded-[14px] p-5 hover:border-accent/30 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground-muted text-sm">{stat.label}</p>
                <p className="text-3xl font-serif text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
              <stat.icon className="w-8 h-8 text-foreground-subtle group-hover:text-accent transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-serif text-xl text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-4 bg-background border border-background-border rounded-[14px] p-5 hover:border-accent/30 transition-colors group"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Plus className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground">Add New Project</p>
              <p className="text-sm text-foreground-muted">
                Create a new portfolio project
              </p>
            </div>
          </Link>

          <Link
            href="/admin/projects"
            className="flex items-center gap-4 bg-background border border-background-border rounded-[14px] p-5 hover:border-accent/30 transition-colors group"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Database className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-medium text-foreground">Manage Projects</p>
              <p className="text-sm text-foreground-muted">
                Edit or delete existing projects
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-background border border-background-border rounded-[14px] p-5">
        <h2 className="font-serif text-xl text-foreground mb-4">System Info</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <DbStatusIcon className={`w-4 h-4 ${dbDisplay.iconColor}`} />
            <span className="text-foreground-muted">Database:</span>
            <span className={dbDisplay.color}>
              {dbDisplay.text}
            </span>
          </div>
          {!dbStatus.connected && dbStatus.error && (
            <p className="text-xs text-foreground-subtle ml-6 truncate" title={dbStatus.error}>
              {dbStatus.error.slice(0, 60)}...
            </p>
          )}
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-foreground-subtle" />
            <span className="text-foreground-muted">Image Storage:</span>
            <span className="text-foreground">
              {process.env.UPLOADTHING_TOKEN ? 'UploadThing (Ready)' : 'Not Configured'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
