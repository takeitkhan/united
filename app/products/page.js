// app/product/[slug].js
import ProductsClient from '../ClientsPages/ProductsClient'
import { fetchMetaData, generateMetadataHelper } from '@/helpers/axiosInstance'

export async function generateMetadata ({ params, searchParams }, parent) {
  // Await the params object to ensure you're accessing it properly
  const { slug } = await params

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const apiEndPointUrl = `${apiUrl}/post?slug=${slug}`

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

  return <ProductsClient slug={slug} />
}
