import { Map } from "immutable"
import { CHANGE_PLAY_LIST, CHANGE_TOP_LIST, CHANGE_CURRENT_INDEX } from "./constants";

const defaultState = Map({
  topList: [],
  playList: {},
  currentIndex: 0,
})

function reducer(state = defaultState,action){
  switch (action.type) {
    case CHANGE_TOP_LIST:
      return state.set('topList', action.topList)
    case CHANGE_PLAY_LIST:
      return state.set('playList', action.playList)
    case CHANGE_CURRENT_INDEX:
      return state.set('currentIndex', action.currentIndex)
    default:
      return state
  }
}

export default reducer