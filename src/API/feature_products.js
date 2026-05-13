import { API_URL } from "./consts.js";

export async function getFeaturedProducts(limit = 8, isFeatured = true) {
    const response = await fetch(
        `${API_URL}/api/products ? limit = ${ limit } & isFeatured = ${ isFeatured }`,
        {
            method: 'GET',
            credentials: 'include',
            headers: { 'ngrok-skip-browser-warning': 'true' },
        }
    );
    if (!response.ok) {
        throw new Error('Failed to fetch featured products');
    }
    return response.json();
}