// ../../utils/auth.ts
import { User } from '../utils/users';

const USERS_KEY = 'users';
const LOGGED_IN_USER_KEY = 'loggedInUser';

export const saveUserToLocalStorage = (user: User) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUsersFromLocalStorage = (): User[] => {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
};

export const deleteUserFromLocalStorage = (username: string) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const updatedUsers = users.filter((user: User) => user.username !== username);
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
};

export const authenticateUser = (username: string, password: string): User | null => {
  const users = getUsersFromLocalStorage();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(user));
    return user;
  }
  return null;
};

export const getLoggedInUser = (): User | null => {
  const user = localStorage.getItem(LOGGED_IN_USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const updateUserInLocalStorage = (updatedUser: User) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  const updatedUsers: User[] = users.map((user: User) =>
    user.username === updatedUser.username ? updatedUser : user
  );
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

  // También actualizar el usuario actualmente autenticado
  localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(updatedUser));
};
