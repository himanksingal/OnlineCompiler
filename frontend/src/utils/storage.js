export const TOKEN_KEY = 'token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (t) => {
if (t) localStorage.setItem(TOKEN_KEY, t);
};

export const clearToken = () => {
localStorage.removeItem(TOKEN_KEY);
};