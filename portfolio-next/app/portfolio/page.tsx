import { getAllProjects } from '@/lib/db/queries';
import { PortfolioGrid } from './portfolio-grid';

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const projects = await getAllProjects();

  return <PortfolioGrid projects={projects} />;
}
