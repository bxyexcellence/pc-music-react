import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import ThemeHeaderRcm from '@/components/theme-header-rcm'
import { RecommendWrapper } from './style'

import { getHotRecommendAction } from '../../store/actionCreators'
import { HOT_RECOMMEND_LIMIT } from '@/common/constants'

import SongsCover from '@/components/songs-cover'

export default memo(function HotRecommend() {

  //state

  //reduc hooks
  const { hotRecommends } = useSelector(state => ({

    //topBanners:state.get('recommend').get('topBanners')
    hotRecommends: state.getIn(['recommend', 'hotRecommends'])
  }), shallowEqual)

  const dispatch = useDispatch()



  //other hooks
  useEffect(() => {
    dispatch((getHotRecommendAction(HOT_RECOMMEND_LIMIT)))
  }, [dispatch])


  return (
    <RecommendWrapper>
      <ThemeHeaderRcm title="热门推荐" keywords={['华语', '流行', '民谣', '摇滚', '电子']} />
      <div className="recommend-list">
        {
          hotRecommends.map((item, index) => {
            return (
              <SongsCover key={item.id} info={item}></SongsCover>
            )
          })
        }
      </div>
    </RecommendWrapper>
  )
})
