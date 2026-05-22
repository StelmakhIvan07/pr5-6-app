import { API_URL } from "./consts.js";

export async function getCategories() {
    const response = await fetch(
        `${API_URL}/api/categories`,
        {
            method: 'GET',
            credentials: 'include',
            headers: { 'ngrok-skip-browser-warning': 'true' },
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch categories');
    }
    return response.json();
}

/**
 * Отримати товари за категорією.
 * GET /api/products/category/{categoryId}
 */
export async function getProductsByCategory(categoryId) {
    const response = await fetch(
        `${API_URL}/api/products/category/${categoryId}`,
        {
            method: 'GET',
            credentials: 'include',
            headers: { 'ngrok-skip-browser-warning': 'true' },
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch products');
    }
    return response.json();
}