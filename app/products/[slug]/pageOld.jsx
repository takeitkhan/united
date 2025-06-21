// app/product/[slug].js
import ProductSingleClient from '@/app/ClientsPages/ProductsSingleClient'
import { BASE_URL } from '@/helpers/baseUrl';

export async function generateMetadata({ params }) {
  const { slug } = params;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiEndPointUrl = `${BASE_URL}/api/v1/post?slug=${slug}`;

  try {
    const res = await fetch(apiEndPointUrl);
    if (!res.ok) {
      throw new Error('Failed to fetch product data');
    }

    const data = await res.json();

    const product = data?.data;

    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product does not exist.',
      };
    }

    return {
      title: product.title || 'Product Details',
      description: product.description?.slice(0, 160) || 'View details of this product.',
      openGraph: {
        title: product.name,
        description: product.description,
        images: [
          {
            url: product?.featured_image || '/default-image.jpg',
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: product.description,
        images: [product?.featured_image || '/default-image.jpg'],
      },
    };
  } catch (error) {
    console.error('generateMetadata error:', error);

    return {
      title: 'Product Details',
      description: 'Unable to fetch product metadata.',
    };
  }
}

export default async function ProductSingle({ params }) {
  const { slug } = params;

  return <ProductSingleClient slug={slug} />;
}
