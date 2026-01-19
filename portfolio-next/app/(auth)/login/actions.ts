'use server';

import { verifyPassword, createSession } from '@/lib/admin/auth';

interface LoginState {
  success?: boolean;
  error?: string;
}

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const password = formData.get('password') as string;

  if (!password) {
    return { error: 'Password is required' };
  }

  const isValid = await verifyPassword(password);

  if (!isValid) {
    return { error: 'Invalid password' };
  }

  await createSession();
  return { success: true };
}
