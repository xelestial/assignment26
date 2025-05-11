import { SessionOptions } from 'iron-session';

export type SessionContent = {
  id: number;
  username: string;
};

export const sessionOptions: SessionOptions = {
  cookieName: 'user',
  password: process.env.SESSION_SECRET!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
