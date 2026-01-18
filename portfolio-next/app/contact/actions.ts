'use server';

interface ContactFormState {
  success?: boolean;
  error?: string;
  fieldErrors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const message = formData.get('message') as string;

  // Validation
  const fieldErrors: ContactFormState['fieldErrors'] = {};

  if (!name || name.length < 2) {
    fieldErrors.name = ['Name must be at least 2 characters'];
  }

  if (!email || !email.includes('@')) {
    fieldErrors.email = ['Please enter a valid email address'];
  }

  if (!message || message.length < 10) {
    fieldErrors.message = ['Message must be at least 10 characters'];
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  // Simulate sending email (replace with actual email service)
  console.log('Contact form submission:', { name, email, message });

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true };
}
