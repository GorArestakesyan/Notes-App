import type { INote } from '@types';

export const ROUTES = {
  LOGIN: 'Login',
  SIGN_UP: 'SignUp',
  NOTES_LIST: 'NotesList',
  NOTE_DETAIL: 'NoteDetail',
} as const;

export type RouteName = typeof ROUTES[keyof typeof ROUTES];

export type RootStackParamList = {
  [ROUTES.LOGIN]: undefined;
  [ROUTES.SIGN_UP]: undefined;
  [ROUTES.NOTES_LIST]: undefined;
  [ROUTES.NOTE_DETAIL]: { note?: INote };
} & {
  Login: undefined;
  SignUp: undefined;
  NotesList: undefined;
  NoteDetail: { note?: INote };
};

