import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { AlbumWrapper } from './style'
import ThemeHeaderRcm from '@/components/theme-header-rcm'
import { getNewAlbumAction } from '../../store/actionCreators'
import { NEW_ALBUM_LIMIT } from '@/common/constants'

import { Carousel } from 'antd'
import AlbumCover from '@/components/album-cover'


export default memo(function NewAlbum() {

  const { NewAlbum } = useSelector(state => ({
    NewAlbum: state.getIn(['recommend', 'newAlbums'])
  }), shallowEqual)


  const pageRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNewAlbumAction(NEW_ALBUM_LIMIT))
  }, [dispatch])

  return (
    <AlbumWrapper>
      <ThemeHeaderRcm title="新碟上架" />
      <div className="content">
        <button className="arrow arrow-left sprite_02" onClick={e=>pageRef.current.prev()}></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {
              [0, 1].map(item => {
                return (
                  <div key={item} className="page">
                    {
                      NewAlbum.slice(item * 5, (item + 1) * 5).map(iten => {
                        return <AlbumCover key={iten.id} info={iten} size={100} width={118} bgp="-570px"
                        />
                      })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <button className="arrow arrow-right sprite_02" onClick={e => pageRef.current.next()}></button>
      </div>
    </AlbumWrapper>
  )
})
