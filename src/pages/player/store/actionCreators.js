import { getSongDetail, getLyric, getSimiPlaylist, getSimiSong} from '@/services/player'
import { parseLyric } from '@/utils/lyric-format'
//import { getLyric } from '../../../services/player'
import { CHANGE_CURRECT_SONG_INDEX, CHANGE_CURRENT_SONG, CHANGE_LYRICS_LIST, CHANGE_PLAY_LIST, 
  CHANGE_SEQUENCE, CHANGE_SIMI_PLAYLIST, CHANGE_SIMI_SONGS } from './constants'


const changeCurrentSong = (res) =>({
  type:CHANGE_CURRENT_SONG,
  currectSong:res
})

const changePlayList = (playList)=>({
  type:CHANGE_PLAY_LIST,
  playList
})

const changeCurrectSongIndex = (index) =>({
  type:CHANGE_CURRECT_SONG_INDEX,
  index
})

const changeLyricList = (lyricList) =>({
  type:CHANGE_LYRICS_LIST,
  lyricList
})

export const changeSequenceAction = (sequence) =>({
  type:CHANGE_SEQUENCE,
  sequence
})

const changeSimiPlaylistAction = (res) => ({
  type: CHANGE_SIMI_PLAYLIST,
  simiPlaylist: res.playlists
})


const changeSimiSongsAction = (res) => ({
  type: CHANGE_SIMI_SONGS,
  simiSongs: res.songs
})

export const getSongDetailAction = (ids) =>{
  return (dispatch,getState) =>{
     //根据id查找是否存在该歌曲
    let song = null
    const playList = getState().getIn(['player','playList'])
    const songIndex = playList.findIndex(song => song.id == ids)
    if (songIndex !== -1){
      dispatch(changeCurrectSongIndex(songIndex))
      song = playList[songIndex]
      dispatch(changeCurrentSong(song))
      dispatch(getLyricAction(song.id))
    }else{
      getSongDetail(ids).then(res => {
        song = res.songs && res.songs[0]
        if(!song) return 
        const newPlayList = [...playList]
        newPlayList.push(song)
        dispatch(changePlayList(newPlayList))
        dispatch(changeCurrectSongIndex(newPlayList.length-1))
        dispatch(changeCurrentSong(song))
        dispatch(getLyricAction(song.id))
      })
    }
   
  }
}


export const addSongDetailAction = (ids) =>{
  return (dispatch,getState) =>{
    const playList = getState().getIn(['player', 'playList'])
    const songIndex = playList.findIndex(song => song.id == ids)
    if (songIndex == -1){
      getSongDetail(ids).then(res => {
        const song = res.songs && res.songs[0]
        if (!song) return
        const newPlayList = [...playList]
        if (!newPlayList.length){
          dispatch(changeCurrentSong(song))
        }
        newPlayList.push(song)
        dispatch(changePlayList(newPlayList))
    })
  }
}
}

export const changeMusicAction = (tag) =>{
  return (dispatch,getState)=>{
    const playList = getState().getIn(['player','playList'])
    const sequence = getState().getIn(['player','sequence'])
    let currentSongIndex = getState().getIn(['player','currectSongIndex'])

    switch(sequence){
      case 1:
        currentSongIndex = Math.floor(Math.random()*playList.length)
        break
      default:
        currentSongIndex += tag
        console.log(currentSongIndex);
        if(currentSongIndex == playList.length) currentSongIndex = 0
        if(currentSongIndex == -1) currentSongIndex = playList.length -1
    }
     const currentSong = playList[currentSongIndex]
     dispatch(changeCurrentSong(currentSong))
     dispatch(changeCurrectSongIndex(currentSongIndex))
    dispatch(getLyricAction(currentSong.id))
  }
}

export const getLyricAction = (id) =>{
  return dispatch=>{
    getLyric(id).then(res=>{
      const lyric = res.lrc.lyric
      const lyricList = parseLyric(lyric)
      dispatch(changeLyricList(lyricList))
    })
  }
}

export const getSimiPlaylistAction = () => {
  return (dispatch, getState) => {
    const id = getState().getIn(["player", "currentSongs"]).id;
    if (!id) return;

    getSimiPlaylist(id).then(res => {
      dispatch(changeSimiPlaylistAction(res));
    })
  }
}

export const getSimiSongAction = () => {
  return (dispatch, getState) => {
    const id = getState().getIn(["player", "currentSongs"]).id;
    if (!id) return;

    getSimiSong(id).then(res => {
      dispatch(changeSimiSongsAction(res));
    })
  }
}
