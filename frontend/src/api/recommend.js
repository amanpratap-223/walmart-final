// src/api/recommend.js
export async function getRecommendations(wishlist) {
  const baseUrl = import.meta.env.VITE_AI_RECOMMENDER_URL || "http://localhost:5001";
  const res = await fetch(`${baseUrl}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wishlist }),
  });
  if (!res.ok) throw new Error("Failed to fetch recommendations");
  return res.json();
}
