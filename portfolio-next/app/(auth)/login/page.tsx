'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Lock, Loader2, AlertCircle } from 'lucide-react';
import { loginAction } from './actions';

interface LoginState {
  success?: boolean;
  error?: string;
}

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.push('/admin');
      router.refresh();
    }
  }, [state.success, router]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-accent" />
          </div>
          <h1 className="font-serif text-2xl text-foreground">Admin Access</h1>
          <p className="text-foreground-muted text-sm mt-2">
            Enter your password to continue
          </p>
        </div>

        {/* Login Form */}
        <form action={formAction} className="space-y-4">
          {state.error && (
            <div className="flex items-center gap-2 p-3 bg-error-light border border-error/20 rounded-[14px] text-error text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {state.error}
            </div>
          )}

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              autoFocus
              autoComplete="current-password"
              className="w-full px-4 py-3 bg-background-card border border-background-border rounded-[14px] text-foreground placeholder:text-foreground-subtle focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-white font-medium rounded-[14px] hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-foreground-subtle text-xs mt-6">
          Protected area for site administration
        </p>
      </div>
    </div>
  );
}
