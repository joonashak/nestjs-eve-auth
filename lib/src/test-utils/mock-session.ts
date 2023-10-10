import { OAUTH_SESSION_KEY } from "../sso/session.service";

export const mockSessionState = (state: string) => ({
  [OAUTH_SESSION_KEY]: {
    state,
  },
});
