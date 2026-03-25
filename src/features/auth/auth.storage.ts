const ACCESS_TOKEN_KEY = "access_token";
const USER = "user";

export const authStorage = {
  setToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },
  getToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  getUser() {
    const user = localStorage.getItem(USER);
    return user ? JSON.parse(user) : { name: 'User', email: '', role: ['User'] }
  },
  clearToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
};
