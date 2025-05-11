export type SignupFormState =
  | {
      success: false;
      error?: string;
      fieldErrors: {
        username?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
      };
    }
  | {
      success: true;
    };
