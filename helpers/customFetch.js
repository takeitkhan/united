import { BASE_URL } from "./baseUrl";

export const customFetch = async (endpoint, options = {}) => {
  const url = `${BASE_URL}/api/v1${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    // Check if the response is successful (2xx)
    if (!res.ok) {
      throw new Error(
        `Request failed with status ${res.status}: ${res.statusText}`
      );
    }

    // Check if the response is JSON
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json(); // Parse and return the JSON response
    } else {
      throw new Error("Received non-JSON response");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error for further handling
  }
};
