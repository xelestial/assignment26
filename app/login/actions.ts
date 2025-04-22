'use server';

type FormState = {
  success: boolean;
  error?: string;
};

export async function onLoginAction(
    _prevState: FormState,
    formData: FormData
): Promise<FormState> {
  const password = formData.get('password');
  if (password === '12345') {
    return { success: true };
  }
  return { success: false, error: 'Incorrect password. Please try again.' };
}
