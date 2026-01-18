import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';

const f = createUploadthing();

export const uploadRouter = {
  projectImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const adminPassword = process.env.ADMIN_PASSWORD;
      const authHeader = req.headers.get('x-admin-auth');

      if (!adminPassword || authHeader !== adminPassword) {
        throw new UploadThingError('Unauthorized');
      }

      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log('Project image uploaded:', file.ufsUrl);
      return { url: file.ufsUrl };
    }),

  projectScreenshots: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 10,
    },
  })
    .middleware(async ({ req }) => {
      const adminPassword = process.env.ADMIN_PASSWORD;
      const authHeader = req.headers.get('x-admin-auth');

      if (!adminPassword || authHeader !== adminPassword) {
        throw new UploadThingError('Unauthorized');
      }

      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log('Screenshot uploaded:', file.ufsUrl);
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
