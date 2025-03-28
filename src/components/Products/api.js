import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
});
export const fetchproducts = async () => {
  try {
    const response = await api.get("/products");
    const deletedIds =
      JSON.parse(localStorage.getItem("deletedProducts")) || [];
    const localProducts =
      JSON.parse(localStorage.getItem("localProducts")) || [];

    // Filter out  deleted  products
    const apiProducts = response.data.filter((p) => !deletedIds.includes(p.id));

    // Merge  API Products with locally  stored  products
    return [...apiProducts, ...localProducts];
  } catch (error) {
    console.error("error fetching products", error);
    throw error;
  }
};
// Fetch single product by ID (checking local storage first)
export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export default api;
