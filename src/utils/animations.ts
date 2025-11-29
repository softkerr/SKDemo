/**
 * Global CSS animations for the homepage
 * Used for background blobs and floating effects
 */
export const animationStyles = {
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-20px)',
    },
  },
  '@keyframes morph': {
    '0%, 100%': {
      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
    },
    '50%': {
      borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%',
    },
  },
};
