import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { cookies } from 'next/headers';

const f = createUploadthing();

async function checkAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session?.value) {
    throw new UploadThingError('Unauthorized');
  }
  return {};
}

export const uploadRouter = {
  projectImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      return checkAdminSession();
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
    .middleware(async () => {
      return checkAdminSession();
    })
    .onUploadComplete(async ({ file }) => {
      console.log('Screenshot uploaded:', file.ufsUrl);
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
