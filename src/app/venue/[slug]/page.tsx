import VenueDetail from '../_components/VenueDetail'
import VenueReviews from '../_components/VenueReviews'

export default function VenueDetailPage({
  params
}: {
  params: { slug: string }
}) {
  return (
    <>
      <VenueDetail slug={params.slug} />
      <VenueReviews />
    </>
  )
}
