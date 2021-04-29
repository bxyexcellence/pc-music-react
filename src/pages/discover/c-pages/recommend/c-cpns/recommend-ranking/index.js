import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual} from 'react-redux'
import ThemeHeaderRcm from '@/components/theme-header-rcm'
import TopRanking from "@/components/top-ranking";

import { RankingWrapper } from './style'
import { getTopListAction } from '../../store/actionCreators'

export default memo(function RecommendRanking() {

  const { topUpList, topNewList, topOriginList} = useSelector((state) => ({
    topUpList: state.getIn(["recommend", "topRanking"]),
    topNewList: state.getIn(["recommend", "newRanking"]),
    topOriginList: state.getIn(["recommend", "originRanking"])
  }), shallowEqual);




  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTopListAction(0))
    dispatch(getTopListAction(2))
    dispatch(getTopListAction(3))

  }, [dispatch])

  return (
    <RankingWrapper>
      <ThemeHeaderRcm title="榜单" />
      <div className="tops">
        <TopRanking info={topUpList} />
        <TopRanking info={topNewList} />
        <TopRanking info={topOriginList} />
      </div>
    </RankingWrapper>
  )
})
