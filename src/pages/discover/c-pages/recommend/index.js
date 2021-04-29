import React, { memo } from 'react'
import { Content, RecommendLeft, RecommendRight, RecommendWrapper } from './style'
import TopBanner from './c-cpns/top-banner'
import HotRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
import RecommendRanking from './c-cpns/recommend-ranking'


function Recommend() {


  
  return (
    <RecommendWrapper>
      <TopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
          <HotRecommend />
          <NewAlbum />
          <RecommendRanking />
        </RecommendLeft>
        <RecommendRight>

        </RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}

export default memo(Recommend)



/* function Recommend(props) {


  const { getBanners, topBanners} = props
  console.log(topBanners);

  useEffect(() => {
    getBanners()
  }, [getBanners])
  return (
    <div>
      <h2>recommend</h2>
    </div>
  )
}

 const mapStateToProps = (state) => {
  return {
    topBanners: state.recommend.topBanners
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getBanners: () => {
      dispatch(getTopBannerAction())
    }
  }
}
 */

