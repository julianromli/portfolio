'use client';

import { LogOut, Loader2 } from 'lucide-react';
import { useTransition } from 'react';
import { logoutAction } from './actions';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
    });
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-foreground-muted hover:text-error disabled:opacity-50 transition-colors"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
      Sign Out
    </button>
  );
}
