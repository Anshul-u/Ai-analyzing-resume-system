/**
 * Helper function to construct API endpoints supporting VITE_API_BASE_URL
 */
export const getApiUrl = (path) => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};
