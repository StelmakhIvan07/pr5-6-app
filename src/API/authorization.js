import { API_URL } from './consts.js';

/**
 * Реєстрація нового користувача.
 * POST /api/users/register
 * Body: { userName, email, password }
 */

export async function registerUser({ userName, email, password }) {
  const response = await fetch(`${API_URL}/api/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    credentials: 'include',            // передаємо/отримуємо куки
    body: JSON.stringify({ userName, email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Authorization error');
  }

  return response.json();
}

/**
 * Вхід в існуючий акаунт.
 * POST /api/users/login
 * Body: { email, password }
 * Сервер встановлює HttpOnly-куку з токеном сесії.
 */
export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': 'true',
    },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Invalid email or password');
  }

  return response;
}

/**
 * Вихід з акаунту.
 * POST /api/users/logout
 * Сервер видаляє сесію та очищає куку.
 */
export async function logoutUser() {
  const response = await fetch(`${API_URL}/api/users/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'ngrok-skip-browser-warning': 'true' },
  });

  if (!response.ok) {
    throw new Error('Error during logout');
  }
}

/**
 * Отримати дані поточного авторизованого користувача.
 * GET /api/users/me
 * Якщо кука відсутня/протерміна — сервер поверне 401.
 */
export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/api/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: { 'ngrok-skip-browser-warning': 'true' },
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Error fetching user data');
  }

  return response.json();
}
