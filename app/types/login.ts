export type LoginFormState =
  | {
      success: true;
    }
  | {
      success: false;
      error?: string;
      fieldErrors: {
        email?: string[];
        password?: string[];
      };
    };