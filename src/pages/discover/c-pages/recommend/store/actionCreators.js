import { getTopBanners, getHotRecommend, getNewAlbum, getTopList } from "@/services/recommend"
//import {  } from "../../../../../services/recommend"
//import { getHotRecommend } from "@/services/recommend"
import { CHANGE_HOT_RECOMMEND, CHANGE_NEW_ALBUM, CHANGE_NEW_RANKING, CHANGE_ORIGIN_RANKING, CHANGE_TOP_BANNER, CHANGE_UP_RANKING } from "./constants"

const changeTopBanners = res=>({
  type:CHANGE_TOP_BANNER,
  topbBanners:res.banners
})

const changeHotRecommend= res=>({
  type:CHANGE_HOT_RECOMMEND,
  hotRecommends: res.result
})

const changeNewAlbum = res=>({
  type:CHANGE_NEW_ALBUM,
  newAlbums: res.albums
})

const changeUpRanking = res=>({
  type:CHANGE_UP_RANKING,
  upRanking:res.playlist
})

const changeNewRanking = res => ({
  type: CHANGE_NEW_RANKING,
  newRanking: res.playlist
})

const changeOriginRanking = res => ({
  type: CHANGE_ORIGIN_RANKING,
  orginRanking: res.playlist
})

export const getTopBannerAction = () =>{
  return dispath =>{
    getTopBanners().then(res=>{
      dispath(changeTopBanners(res))
    })
  }
}

export const getHotRecommendAction = limit=>{
  return dispath => {
    getHotRecommend(limit).then(res=>{
      //console.log(res.result);
      dispath(changeHotRecommend(res))
    })
  }
}

export const getNewAlbumAction = limit =>{
  return dispach=>{
    getNewAlbum(limit).then(res=>{
      dispach(changeNewAlbum(res))
    })
  }
}

export const getTopListAction = idx =>{
  return dispach =>{
    getTopList(idx).then(res=>{
      switch (idx) {
        case 0:
          dispach(changeUpRanking(res))
          break;
        case 2:
          dispach(changeNewRanking(res))
          break

        case 3:
          dispach(changeOriginRanking(res))
        default:
          break;
      }
    })
  }
}