import Card from "../MainSection/Card"
import ShimmerContainer from "../MainSection/ShimmerContainer"
import { useSearchParams } from 'react-router-dom'
import useRelatedVideos from "../../hooks/useRelatedVideos"

const RelatedVideos = () => {
    const [searchParams] = useSearchParams()
    const videoId = searchParams.get('v')
    const [relatedVideos, isLoading] = useRelatedVideos(videoId)
    return (
        <div className="py-8  w-full">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 gap-4">
                {
                    !relatedVideos.length ? <ShimmerContainer/> : relatedVideos.map((item, index) => <Card key={index} item = {item} />)
                }
                {
                    isLoading && <ShimmerContainer/>
                }
                </div>
            </div>
        </div>

    )
}

export default RelatedVideos