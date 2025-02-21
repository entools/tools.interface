export const BASE_API_URL = '';
export const BASE_AUTH_API_URL = 'https://entools.ru/user-auth-api/auth/';
export const BASE_PROFILE_API_URL = 'https://entools.ru/user-profile-api/';
export const OAUTH_API_URL = '';

export const ESC_CLOSE_ON = true;
export const OVERLAY_CLOSE_ON = true;
export const MODAL_CONFIG = {
  INITIAL: {
    opacity: 0,
    scale: 0.75,
  },
  ANIMATE: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.15,
    },
  },
  EXIT: {
    opacity: 0,
    scale: 0.75,
    transition: {
      ease: 'easeIn',
      duration: 0.15,
    },
  },
};
