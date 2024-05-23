import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const apiUrl = process.env.EXPO_PUBLIC_API_URL;
// Sign In
export async function signIn(username, password) {
  try {
    const response = await axios.post(`${apiUrl}/auth/login`, {
      username: username,
      password: password,
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser(token) {
  try {
    const currentAccount = await axios.get(`${apiUrl}/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!currentAccount) throw Error;

    return currentAccount;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    throw new Error(error);
  }
}
// Get all Products
export async function getAllProducts() {
  try {
    const response = await axios.get(`${apiUrl}/products`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function sortProducts(sort) {
  try {
    const response = await axios.get(`${apiUrl}/products?sort=${sort}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function createProduct(productData) {
  try {
    const response = await axios.post(`${apiUrl}/products`, productData);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
export async function updateProduct(productData, id) {
  try {
    const response = await axios.put(`${apiUrl}/products/${id}`, productData);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
export async function DeleteProduct(id) {
  try {
    const response = await axios.delete(`${apiUrl}/products/${id}`);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProductById(id) {
  try {
    const response = await axios.get(`${apiUrl}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}
