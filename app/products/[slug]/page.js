// app/product/[slug].js
import ProductSingleClient from "@/app/ClientsPages/ProductsSingleClient";
import { BASE_URL } from "@/helpers/baseUrl";
import { getMetaValueFromExtra_Fields } from "@/helpers/metaHelpers";
import { stripHtmlTags } from "@/helpers/stripHtmlTags";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiEndPointUrl = `${BASE_URL}/api/v1/post?slug=${slug}`;
  let product;

  try {
    const res = await fetch(apiEndPointUrl, {
      next: { revalidate: 60 }, // revalidate every 60 seconds
    });
    if (!res.ok) {
      throw new Error("Failed to fetch product data");
    }

    const data = await res.json();
    product = data?.data;

    if (!product) {
      return {
        title: "Product Not Found",
        description: "The requested product does not exist.",
      };
    }

    const cleanDescription = stripHtmlTags(product?.description);
    const short_des = getMetaValueFromExtra_Fields(
      product,
      "product_short_description"
    );

    return {
      title: product?.meta_title || product.name || "Product Details",
      description:
        product.meta_description?.slice(0, 160) ||  short_des?.slice(0, 160) ||
        cleanDescription?.slice(0, 160) ||
        "View details of this product.",
      openGraph: {
        title: product?.meta_title || product.name,
        description:
          product?.meta_description?.slice(0, 160) || short_des?.slice(0, 160) ||
          cleanDescription?.slice(0, 160),
        images: [
          {
            url: product?.featured_image || "/default-image.jpg",
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: product?.meta_title || product.name,
        description:
          product.meta_description?.slice(0, 160) || short_des?.slice(0, 160) ||
          cleanDescription?.slice(0, 160),
        images: [product?.featured_image || "/default-image.jpg"],
      },
    };
  } catch (error) {
    console.error("generateMetadata error:", error);

    return {
      title: "Product Details",
      description: "Unable to fetch product metadata.",
    };
  }
}

export default async function ProductSingle({ params }) {
  const { slug } = params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiEndPointUrl = `${BASE_URL}/api/v1/post?slug=${slug}`;
  let product;

  try {
    const res = await fetch(apiEndPointUrl, {
      next: { revalidate: 60 }, // revalidate every 60 seconds
    });
    if (!res.ok) {
      throw new Error("Failed to fetch product data");
    }

    const data = await res.json();
    product = data?.data;

    const cleanDescription = stripHtmlTags(product?.description);

    const short_des = getMetaValueFromExtra_Fields(
      product,
      "product_short_description"
    );

   

  } catch (error) {}


  return <ProductSingleClient slug={slug} product={product} />;
}
