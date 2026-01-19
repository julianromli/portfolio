'use client';

import { useActionState, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, AlertCircle, Upload, X, Plus } from 'lucide-react';
import { useUploadThing } from '@/lib/uploadthing';
import type { Project } from '@/lib/db/schema';

interface ProjectFormProps {
  project?: Project;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  submitLabel: string;
}

interface FormState {
  success?: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

const initialState: FormState = {};

const CATEGORIES = [
  'Full Stack',
  'Frontend',
  'Backend',
  'Mobile',
  'AI/ML',
  'DevOps',
  'Data',
  'Other',
];

export function ProjectForm({ project, action, submitLabel }: ProjectFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  
  const [coverImage, setCoverImage] = useState(project?.image || '');
  const [screenshots, setScreenshots] = useState<string[]>(project?.screenshots || []);
  const [techStack, setTechStack] = useState<string[]>(project?.techStack || []);
  const [newTech, setNewTech] = useState('');
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingScreenshots, setUploadingScreenshots] = useState(false);

  const { startUpload: startCoverUpload } = useUploadThing('projectImage', {
    onClientUploadComplete: (res) => {
      if (res?.[0]) {
        setCoverImage(res[0].ufsUrl);
      }
      setUploadingCover(false);
    },
    onUploadError: (error) => {
      console.error('Upload error:', error);
      setUploadingCover(false);
    },
  });

  const { startUpload: startScreenshotsUpload } = useUploadThing('projectScreenshots', {
    onClientUploadComplete: (res) => {
      if (res) {
        setScreenshots(prev => [...prev, ...res.map(r => r.ufsUrl)]);
      }
      setUploadingScreenshots(false);
    },
    onUploadError: (error) => {
      console.error('Upload error:', error);
      setUploadingScreenshots(false);
    },
  });

  const handleCoverUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploadingCover(true);
    startCoverUpload(Array.from(files));
  }, [startCoverUpload]);

  const handleScreenshotsUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploadingScreenshots(true);
    startScreenshotsUpload(Array.from(files));
  }, [startScreenshotsUpload]);

  const removeScreenshot = (index: number) => {
    setScreenshots(prev => prev.filter((_, i) => i !== index));
  };

  const addTech = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack(prev => [...prev, newTech.trim()]);
      setNewTech('');
    }
  };

  const removeTech = (index: number) => {
    setTechStack(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form action={formAction} className="space-y-6">
      {/* Error Display */}
      {state.error && (
        <div className="flex items-center gap-2 p-4 bg-error-light border border-error/20 rounded-[14px] text-error">
          <AlertCircle className="w-5 h-5 shrink-0" />
          {state.error}
        </div>
      )}

      {/* Hidden fields for arrays */}
      <input type="hidden" name="image" value={coverImage} />
      <input type="hidden" name="techStack" value={techStack.join(',')} />
      <input type="hidden" name="screenshots" value={screenshots.join(',')} />

      {/* Basic Info */}
      <div className="bg-background border border-background-border rounded-[14px] p-6 space-y-5">
        <h2 className="font-serif text-xl text-foreground">Basic Information</h2>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1.5">
            Title <span className="text-error">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={project?.title}
            required
            className="w-full px-4 py-2.5 bg-surface-1 border border-background-border rounded-[10px] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
            placeholder="Project title…"
          />
          {state.fieldErrors?.title && (
            <p className="mt-1.5 text-sm text-error">{state.fieldErrors.title[0]}</p>
          )}
        </div>

        {/* Category & Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1.5">
              Category <span className="text-error">*</span>
            </label>
            <select
              id="category"
              name="category"
              defaultValue={project?.category || ''}
              required
              className="w-full px-4 py-2.5 bg-surface-1 border border-background-border rounded-[10px] text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
            >
              <option value="" disabled>Select category…</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {state.fieldErrors?.category && (
              <p className="mt-1.5 text-sm text-error">{state.fieldErrors.category[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="year" className="block text-sm font-medium text-foreground mb-1.5">
              Year <span className="text-error">*</span>
            </label>
            <input
              type="number"
              id="year"
              name="year"
              defaultValue={project?.year || new Date().getFullYear()}
              required
              min="2000"
              max="2099"
              className="w-full px-4 py-2.5 bg-surface-1 border border-background-border rounded-[10px] text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
            />
            {state.fieldErrors?.year && (
              <p className="mt-1.5 text-sm text-error">{state.fieldErrors.year[0]}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1.5">
            Description <span className="text-error">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            defaultValue={project?.description}
            required
            rows={4}
            className="w-full px-4 py-2.5 bg-surface-1 border border-background-border rounded-[10px] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow resize-none"
            placeholder="Describe the project…"
          />
          {state.fieldErrors?.description && (
            <p className="mt-1.5 text-sm text-error">{state.fieldErrors.description[0]}</p>
          )}
        </div>
      </div>

      {/* Cover Image */}
      <div className="bg-background border border-background-border rounded-[14px] p-6 space-y-4">
        <h2 className="font-serif text-xl text-foreground">Cover Image</h2>
        
        {coverImage ? (
          <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden bg-surface-2">
            <Image
              src={coverImage}
              alt="Cover preview"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => setCoverImage('')}
              className="absolute top-2 right-2 p-1.5 bg-foreground/80 text-white rounded-full hover:bg-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full max-w-md aspect-video border-2 border-dashed border-background-border rounded-lg cursor-pointer hover:border-accent/50 hover:bg-surface-1/50 transition-colors">
            <div className="flex flex-col items-center py-8">
              {uploadingCover ? (
                <Loader2 className="w-8 h-8 text-accent animate-spin" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-foreground-subtle mb-2" />
                  <p className="text-sm text-foreground-muted">Click to upload cover image</p>
                  <p className="text-xs text-foreground-subtle mt-1">PNG, JPG up to 4MB</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="hidden"
              disabled={uploadingCover}
            />
          </label>
        )}
        {state.fieldErrors?.image && (
          <p className="text-sm text-error">{state.fieldErrors.image[0]}</p>
        )}
      </div>

      {/* Tech Stack */}
      <div className="bg-background border border-background-border rounded-[14px] p-6 space-y-4">
        <h2 className="font-serif text-xl text-foreground">Tech Stack</h2>
        
        <div className="flex gap-2">
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTech();
              }
            }}
            placeholder="Add technology…"
            className="flex-1 px-4 py-2 bg-surface-1 border border-background-border rounded-[10px] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
          />
          <button
            type="button"
            onClick={addTech}
            className="px-4 py-2 bg-accent text-white rounded-[10px] hover:bg-accent-hover transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface-2 text-foreground text-sm rounded-full"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(index)}
                  className="text-foreground-subtle hover:text-error transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Screenshots */}
      <div className="bg-background border border-background-border rounded-[14px] p-6 space-y-4">
        <h2 className="font-serif text-xl text-foreground">Screenshots</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {screenshots.map((url, index) => (
            <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-surface-2">
              <Image
                src={url}
                alt={`Screenshot ${index + 1}`}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => removeScreenshot(index)}
                className="absolute top-1.5 right-1.5 p-1 bg-foreground/80 text-white rounded-full hover:bg-foreground transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          
          <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-background-border rounded-lg cursor-pointer hover:border-accent/50 hover:bg-surface-1/50 transition-colors">
            {uploadingScreenshots ? (
              <Loader2 className="w-6 h-6 text-accent animate-spin" />
            ) : (
              <>
                <Plus className="w-6 h-6 text-foreground-subtle" />
                <p className="text-xs text-foreground-subtle mt-1">Add</p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleScreenshotsUpload}
              className="hidden"
              disabled={uploadingScreenshots}
            />
          </label>
        </div>
      </div>

      {/* Links */}
      <div className="bg-background border border-background-border rounded-[14px] p-6 space-y-5">
        <h2 className="font-serif text-xl text-foreground">Links</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="liveUrl" className="block text-sm font-medium text-foreground mb-1.5">
              Live URL
            </label>
            <input
              type="url"
              id="liveUrl"
              name="liveUrl"
              defaultValue={project?.liveUrl || ''}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 bg-surface-1 border border-background-border rounded-[10px] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
            />
          </div>

          <div>
            <label htmlFor="githubUrl" className="block text-sm font-medium text-foreground mb-1.5">
              GitHub URL
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              defaultValue={project?.githubUrl || ''}
              placeholder="https://github.com/…"
              className="w-full px-4 py-2.5 bg-surface-1 border border-background-border rounded-[10px] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        <Link
          href="/admin/projects"
          className="px-5 py-2.5 text-foreground-muted hover:text-foreground transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending || uploadingCover || uploadingScreenshots}
          className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white font-medium rounded-[14px] hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving…
            </>
          ) : (
            submitLabel
          )}
        </button>
      </div>
    </form>
  );
}
