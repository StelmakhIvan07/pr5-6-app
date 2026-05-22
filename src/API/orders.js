import { API_URL } from "./consts.js";

/**
 * Створити замовлення.
 * POST /api/orders
 * Body: { "productId1": quantity1, "productId2": quantity2, ... }
 */
export async function createOrder(cartItems) {
  // Перетворити масив кошика у формат { id: quantity }
  const body = {};
  for (const item of cartItems) {
    body[item.id] = item.quantity;
  }

  const response = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }
  return response.text();
}

/**
 * Отримати історію замовлень поточного користувача.
 * GET /api/orders/history
 */
export async function getOrderHistory() {
  const response = await fetch(`${API_URL}/api/orders/history`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch order history");
  }
  return response.json();
}
