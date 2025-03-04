import CategoryClient from '@/app/ClientsPages/CategoryClient'
import { fetchMetaData, generateMetadataHelper } from '@/helpers/axiosInstance'

export async function generateMetadata ({ params, searchParams }, parent) {
  const { slug } = params // No need to await params
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const apiEndPointUrl = `${apiUrl}/category?slug=${slug}`

  try {
    const category = await fetchMetaData(apiEndPointUrl)    
    return generateMetadataHelper(category, 'onCategory')
  } catch (error) {
    console.error('Error fetching data: ', error) // Log error
    return generateMetadataHelper(null)
  }
}

export default async function CategoryPage ({ params }) {
  const { slug } = await params // No need to await params
  return <CategoryClient slug={slug} />
}
