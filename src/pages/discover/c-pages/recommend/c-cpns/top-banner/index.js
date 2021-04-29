import React, { memo, useEffect, useRef,useState,useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getTopBannerAction } from '../../store/actionCreators'
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from './style'


import { Carousel } from 'antd';

export default memo(function TopBanner() {

 const [currectIndex, setCurrectIndex] = useState(0)

  const { topBanners } = useSelector(state => ({

    //topBanners:state.get('recommend').get('topBanners')
    topBanners: state.getIn(['recommend', 'topBanners'])
  }), shallowEqual)


  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTopBannerAction())
  }, [dispatch])


  const changeImage = useCallback((from, to)=>{
      setCurrectIndex(to)
    },[])

  //其他业务逻辑

  const bgImage = topBanners[currectIndex] && (topBanners[currectIndex].imageUrl +'?imageView&blur=40x20')



const bannerRef = useRef()

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel effect="fade" autoplay ref={bannerRef} beforeChange={changeImage}>
            {
              topBanners.map((item,index)=>{
                return (
                  <div className="banner-item" key={item.imageUrl}>
                    <img className="image" src={item.imageUrl} alt=""/>
                  </div>
                )
              })
            }
          </Carousel>,
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl >
          <button className="btn left" onClick={e=>bannerRef.current.prev()}></button>
        </BannerControl>
        <BannerControl >
          <button className="btn right" onClick={e => bannerRef.current.next()}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})
