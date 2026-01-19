import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { projects } from '../lib/db/schema';

config({ path: '.env.local' });

const seedData = [
  {
    slug: 'finance',
    title: 'Finance',
    category: 'Web development',
    description:
      'A comprehensive financial dashboard application designed for tracking investments, analyzing market trends, and managing personal portfolios. Built with a focus on real-time data visualization and intuitive user experience, this platform empowers users to make informed financial decisions through clear, actionable insights.',
    image: '/images/project-1.jpg',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'PostgreSQL'],
    screenshots: ['/images/project-1.jpg'],
    liveUrl: 'https://finance-demo.example.com',
    githubUrl: 'https://github.com/example/finance',
    year: 2024,
  },
  {
    slug: 'orizon',
    title: 'Orizon',
    category: 'Web development',
    description:
      'Orizon is a modern SaaS platform for team collaboration and project management. Features include real-time document editing, task tracking, and integrated communication tools. The clean interface prioritizes productivity while maintaining visual elegance across all device sizes.',
    image: '/images/project-2.png',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'AWS'],
    screenshots: ['/images/project-2.png'],
    liveUrl: 'https://orizon-demo.example.com',
    githubUrl: null,
    year: 2024,
  },
  {
    slug: 'fundo',
    title: 'Fundo',
    category: 'Web design',
    description:
      'Brand identity and web design for Fundo, a crowdfunding platform connecting creative projects with passionate backers. The design language emphasizes trust, community, and creative expression through bold typography and a vibrant color palette that stands out in the fintech space.',
    image: '/images/project-3.jpg',
    techStack: ['Figma', 'Adobe Illustrator', 'Framer'],
    screenshots: ['/images/project-3.jpg'],
    liveUrl: null,
    githubUrl: null,
    year: 2023,
  },
  {
    slug: 'brawlhalla',
    title: 'Brawlhalla',
    category: 'Applications',
    description:
      'A companion mobile application for competitive Brawlhalla players. Features include match history tracking, character statistics, combo guides, and tournament brackets. The interface draws inspiration from the game aesthetic while providing serious analytical tools for improvement.',
    image: '/images/project-4.png',
    techStack: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
    screenshots: ['/images/project-4.png'],
    liveUrl: null,
    githubUrl: 'https://github.com/example/brawlhalla-companion',
    year: 2023,
  },
  {
    slug: 'dsm',
    title: 'DSM.',
    category: 'Web design',
    description:
      'Design system and component library for a major enterprise client. This comprehensive system includes typography scales, color tokens, spacing guidelines, and over 50 reusable components. Built for scalability and consistency across multiple product teams.',
    image: '/images/project-5.png',
    techStack: ['Figma', 'Storybook', 'CSS Custom Properties', 'Documentation'],
    screenshots: ['/images/project-5.png'],
    liveUrl: null,
    githubUrl: null,
    year: 2024,
  },
  {
    slug: 'metaspark',
    title: 'MetaSpark',
    category: 'Web design',
    description:
      'Landing page and brand identity for MetaSpark, an AI-powered content generation startup. The design captures the intersection of creativity and technology through dynamic gradients, geometric patterns, and purposeful micro-interactions that bring the brand story to life.',
    image: '/images/project-6.png',
    techStack: ['Figma', 'After Effects', 'Webflow'],
    screenshots: ['/images/project-6.png'],
    liveUrl: 'https://metaspark-demo.example.com',
    githubUrl: null,
    year: 2024,
  },
  {
    slug: 'summary',
    title: 'Summary',
    category: 'Web development',
    description:
      'An AI-powered document summarization tool that transforms lengthy articles, research papers, and reports into concise, digestible summaries. Features include adjustable summary length, key point extraction, and export to multiple formats.',
    image: '/images/project-7.png',
    techStack: ['Next.js', 'OpenAI API', 'Vercel AI SDK', 'Tailwind CSS'],
    screenshots: ['/images/project-7.png'],
    liveUrl: 'https://summary-demo.example.com',
    githubUrl: 'https://github.com/example/summary',
    year: 2024,
  },
  {
    slug: 'task-manager',
    title: 'Task Manager',
    category: 'Applications',
    description:
      'A minimalist task management application focused on reducing cognitive overhead. Features include smart scheduling, natural language input, and seamless sync across devices. The design philosophy centers on getting out of the way so users can focus on what matters.',
    image: '/images/project-8.jpg',
    techStack: ['Flutter', 'Dart', 'SQLite', 'Provider'],
    screenshots: ['/images/project-8.jpg'],
    liveUrl: null,
    githubUrl: 'https://github.com/example/task-manager',
    year: 2023,
  },
  {
    slug: 'arrival',
    title: 'Arrival',
    category: 'Web development',
    description:
      'E-commerce platform for a premium luggage brand. Features include 3D product visualization, personalization options, and a streamlined checkout experience. The design emphasizes product photography and creates an aspirational shopping experience befitting the brand positioning.',
    image: '/images/project-9.png',
    techStack: ['Next.js', 'Three.js', 'Stripe', 'Sanity CMS', 'Vercel'],
    screenshots: ['/images/project-9.png'],
    liveUrl: 'https://arrival-demo.example.com',
    githubUrl: null,
    year: 2024,
  },
];

async function seed() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error('DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  console.log('Connecting to database...');
  // Logic to determine SSL mode matching lib/db/index.ts
  const isLocal = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');
  const shouldDisableSsl = process.env.DB_SSL === 'false' || isLocal;
  
  const client = postgres(connectionString, { 
    prepare: false, 
    ssl: shouldDisableSsl ? false : 'prefer' 
  });
  const db = drizzle(client);

  console.log('Seeding projects...');

  for (const project of seedData) {
    await db.insert(projects).values(project).onConflictDoNothing();
    console.log(`  - ${project.title}`);
  }

  console.log('Seeding complete!');
  await client.end();
  process.exit(0);
}

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
