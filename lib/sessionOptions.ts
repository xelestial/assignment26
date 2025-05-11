import { SessionOptions } from 'iron-session';

export type SessionContent = {
  id: number;
  username: string;
};
const SESSION_SECRET='Error: iron-session: Bad usage. Password must be at least 32 characters long.'
export const sessionOptions: SessionOptions = {
  cookieName: 'user',
  password: SESSION_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};
