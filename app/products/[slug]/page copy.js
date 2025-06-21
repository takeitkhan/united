// app/product/[slug].js
import ProductSingleClient from '@/app/ClientsPages/ProductsSingleClient'
import { fetchMetaData, generateMetadataHelper } from '@/helpers/axiosInstance'
import { BASE_URL } from '@/helpers/baseUrl';

export async function generateMetadata ({ params, searchParams }, parent) {
  const { slug } = await params

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
    const apiEndPointUrl = `${BASE_URL}/api/v1/post?slug=${slug}`;

  try {
    const product = await fetchMetaData(apiEndPointUrl)
    return generateMetadataHelper(product)
  } catch (error) {
    return generateMetadataHelper(null)
  }
}

export default async function ProductSingle ({ params }) {
  // Await params and destructure the slug
  const { slug } = await params

  return <ProductSingleClient slug={slug} />
}
