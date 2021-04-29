import { Map } from "immutable";
import { CHANGE_HOT_RECOMMEND, CHANGE_NEW_ALBUM, CHANGE_NEW_RANKING, CHANGE_ORIGIN_RANKING, CHANGE_TOP_BANNER, CHANGE_UP_RANKING } from "./constants"

const defaultStore = Map({
  topBanners:[],
  hotRecommends:[],
  newAlbums:[],
  topRanking:{},
  newRanking:{},
  originRanking:{}
})

function reducer(state=defaultStore,action) {
  switch (action.type) {
    case CHANGE_TOP_BANNER:
      return state.set('topBanners', action.topbBanners)
    case CHANGE_HOT_RECOMMEND:
      return state.set('hotRecommends', action.hotRecommends)
    case CHANGE_NEW_ALBUM:
      return state.set('newAlbums', action.newAlbums)
    case CHANGE_UP_RANKING:
      return state.set('topRanking', action.upRanking)
    case CHANGE_NEW_RANKING:
      return state.set('newRanking', action.newRanking)
    case CHANGE_ORIGIN_RANKING:
      return state.set('originRanking', action.orginRanking)
    default:
      return state
  }
}

export default reducer;