// Determine if we're in development or production
const isDevelopment = typeof window !== 'undefined' && 
                      (window.location.hostname === 'localhost' || 
                       window.location.hostname === '127.0.0.1');

// Set the base URL based on the environment
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:8000' 
  : 'https://bcit-anthony-sh-s.com/lumisenseai/api/v1';

// Function to get the full API URL for a given endpoint
export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
};

export const generateApiKey = async (user_id: number) => {
  try {
    const res = await fetch(getApiUrl('/api/generate'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: user_id }),
      credentials: 'include',
    });
    const result = await res.json();
    if (res.ok) {
      return { success: true, message: result.message || 'API key generated' , key: result.key};
    }
    return { success: false, error: result.message || 'Unknown error' };
  }
  catch (error) {
    console.error(error);
  }
};