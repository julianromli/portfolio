'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  cardHover,
} from '@/lib/animations';

const blogPosts = [
  {
    title: 'Design conferences in 2022',
    category: 'Design',
    date: '2022-02-23',
    dateDisplay: 'Feb 23, 2022',
    excerpt: 'Veritatis et quasi architecto beatae vitae dicta sunt, explicabo.',
    image: '/images/blog-1.jpg',
  },
  {
    title: 'Best fonts every designer',
    category: 'Design',
    date: '2022-02-23',
    dateDisplay: 'Feb 23, 2022',
    excerpt:
      'Sed ut perspiciatis, nam libero tempore, cum soluta nobis est eligendi.',
    image: '/images/blog-2.jpg',
  },
  {
    title: 'Design digest #80',
    category: 'Design',
    date: '2022-02-23',
    dateDisplay: 'Feb 23, 2022',
    excerpt:
      'Excepteur sint occaecat cupidatat no proident, quis nostrum exercitationem ullam corporis suscipit.',
    image: '/images/blog-3.jpg',
  },
  {
    title: 'UI interactions of the week',
    category: 'Design',
    date: '2022-02-23',
    dateDisplay: 'Feb 23, 2022',
    excerpt:
      'Enim ad minim veniam, consectetur adipiscing elit, quis nostrud exercitation ullamco laboris nisi.',
    image: '/images/blog-4.jpg',
  },
  {
    title: 'The forgotten art of spacing',
    category: 'Design',
    date: '2022-02-23',
    dateDisplay: 'Feb 23, 2022',
    excerpt:
      'Maxime placeat, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/images/blog-5.jpg',
  },
  {
    title: 'Design digest #79',
    category: 'Design',
    date: '2022-02-23',
    dateDisplay: 'Feb 23, 2022',
    excerpt:
      'Optio cumque nihil impedit uo minus quod maxime placeat, velit esse cillum.',
    image: '/images/blog-6.jpg',
  },
];

export default function BlogPage() {
  return (
    <article className="bg-background-card border border-background-border rounded-lg p-6 lg:p-8">
      <motion.header variants={fadeInUp} initial="initial" animate="animate">
        <h2 className="text-2xl font-semibold text-foreground mb-6">Blog</h2>
      </motion.header>

      <motion.ul
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {blogPosts.map((post, index) => (
          <motion.li key={index} variants={staggerItem} whileHover={cardHover}>
            <button
              type="button"
              className="group block w-full text-left rounded-lg overflow-hidden bg-surface-1 border border-background-border"
            >
              <figure className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </figure>
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-foreground-subtle mb-2">
                  <span className="text-accent font-medium">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-foreground-subtle" aria-hidden="true" />
                  <time dateTime={post.date}>{post.dateDisplay}</time>
                </div>
                <h3 className="font-medium text-foreground mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-foreground-subtle line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </article>
  );
}
