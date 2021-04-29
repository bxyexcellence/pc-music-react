import  { Map } from "immutable"
import { CHANGE_CURRECT_SONG_INDEX, CHANGE_CURRENT_SONG, CHANGE_PLAY_LIST, CHANGE_SEQUENCE, 
  CHANGE_LYRICS_LIST, CHANGE_SIMI_PLAYLIST, CHANGE_SIMI_SONGS } from "./constants"


const defaultState = Map({
  currentSongs:{},
  playList:[],
  currectSongIndex:0,
  sequence:0, //0:循环,1:随机，2:单曲
  lyricList:[],
  simiPlaylist: [],
  simiSongs: []
})

function reducer(state= defaultState,action){
  switch (action.type) {
    case CHANGE_CURRENT_SONG:
      return state.set('currentSongs', action.currectSong)
    case CHANGE_PLAY_LIST:
      return state.set('playList',action.playList)
    case CHANGE_CURRECT_SONG_INDEX:
      return state.set('currectSongIndex',action.index)
    case CHANGE_SEQUENCE:
      return state.set('sequence', action.sequence)
    case CHANGE_LYRICS_LIST:
      return state.set('lyricList', action.lyricList)
    case CHANGE_SIMI_PLAYLIST:
      return state.set('simiPlaylist', action.simiPlaylist)
    case CHANGE_SIMI_SONGS:
      return state.set('simiSongs', action.simiSongs)
    default:
      return state
  }
}

export default reducer