import axios from "axios";
import https from "https";

const axiosInstance = axios.create({
  baseURL: "/api/", // Use the proxy path
  withCredentials: true, // This allows sending cookies or credentials
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "multipart/form-data",
  },
});

export default axiosInstance;

const agent = new https.Agent({
  rejectUnauthorized: false,
});

// Helper method to fetch product data
export async function fetchMetaData(apiEndPointUrl) {
  try {
    const response = await fetch(apiEndPointUrl, {
      next: { revalidate: 60 }, // revalidate every 60 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    throw error;
  }
}

export function generateMetadataHelper(data, onCategory) {
  if (onCategory) {
    return {
      metadataBase: new URL("https://umbd.net"), // Change this to your actual domain
      title: data?.name || "United Machinery Bangladesh",
      description: data?.description || "United Machinery Bangladesh",
      keyword: data?.meta_keyword || "United Machinery Bangladesh",
      openGraph: {
        title: data?.name || "United Machinery Bangladesh",
        description: data?.description || "United Machinery Bangladesh",
        images: [
          {
            url: data?.image || "/default-image.jpg",
            width: 1200,
            height: 630,
            alt: data?.name || "Default Image Alt",
          },
        ],
      },
    };
  } else {
    return {
      metadataBase: new URL("https://umbd.net"), // Change this to your actual domain
      title: data?.meta_title || "United Machinery Bangladesh",
      description: data?.meta_description || "United Machinery Bangladesh",
      keyword: data?.meta_keyword || "United Machinery Bangladesh",
      openGraph: {
        title: data?.meta_title || "United Machinery Bangladesh",
        description: data?.meta_description || "United Machinery Bangladesh",
        images: [
          {
            url: data?.featured_image || "/default-image.jpg",
            width: 1200,
            height: 630,
            alt: data?.name || "Default Image Alt",
          },
        ],
      },
    };
  }
}
