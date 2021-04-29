import { Slider } from 'antd'
import React, { memo, useEffect, useRef, useState, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { changeMusicAction, changeSequenceAction, getSongDetailAction } from '../store/actionCreators'
import { getSizeImage, formatMinuteSecond, getPlayUrl } from '@/utils/data-format'
import { Control, Operator, PlaybarWrapper, PlayInfo } from './style'
import { NavLink } from 'react-router-dom'


export default memo(function AppPlayerBar() {
  //props and state

  const [currentTime, setCurrentTime] = useState(0)
  const [isPalying, setIsPalying] = useState(false)
  //let currentProgress = (currentTime / currentSong.dt) * 100
  const [currentProgress, setCurrectProgress] = useState(0)
  const [isChangeing, setIsChangeing] = useState(false)
  const [currentLyric, setCurrentLyric] = useState('')
  const { currentSong, sequence, currentLength, lyricList } = useSelector(state => ({
    currentSong: state.getIn(['player', 'currentSongs']),
    sequence: state.getIn(['player', 'sequence']),
    currentLength: state.getIn(['player', 'playList']).length,
    lyricList: state.getIn(['player', 'lyricList'])
  }), shallowEqual)
  const dirana = currentSong.dt || 0

  const dispatch = useDispatch()

  /* useEffect(() => {
    dispatch(getSongDetailAction(167876))
  }, [dispatch])
   */
  useEffect(() => {
    redioRef.current.src = currentSong.id && getPlayUrl(currentSong.id)
    redioRef.current.play().then(res => {
      setIsPalying(true)
    }).catch(res => {
      setIsPalying(false)
    })
    /*  setIsPalying(true)
     redioRef.current.play() */
  }, [currentSong])

  const redioRef = useRef()

  const playMusic = () => {
    if (redioRef.current.src.indexOf('undefine') !== -1){
      setIsPalying(false) 
      console.log('music is nudefine');
      return
    } 
    isPalying ? redioRef.current.pause() : redioRef.current.play()
    setIsPalying(!isPalying)
  }
  const timeUpdate = (e) => {
    let isPlaytime = e.target.currentTime * 1000
    if (!isChangeing) {
      setCurrectProgress(currentTime / currentSong.dt * 100)
      setCurrentTime(isPlaytime)

    }

    let currentLyricIndex = 0
    for (let i = 0; i < lyricList.length; i++) {
      if (isPlaytime < lyricList[i].time) {
        currentLyricIndex = i
        break
      }
    }
    setCurrentLyric(lyricList[currentLyricIndex-1]&&lyricList[currentLyricIndex-1].content)

  }

  const sliderChange = useCallback((value) => {
    setIsChangeing(true)
    setCurrectProgress(value)
    setCurrentTime(value / 100 * currentSong.dt)
  }, [currentTime])


  const sliderAfterChange = useCallback((value) => {
    setCurrectProgress(value)
    //console.log(value / 100 * currentSong.dt);
    setCurrentTime(value / 100 * currentSong.dt)
    redioRef.current.currentTime = (value / 100 * currentSong.dt) / 1000
    setIsChangeing(false)
    if (!isPalying) {
      playMusic()
    }
  }, [currentSong, isPalying])


  const changeSequence = () => {
    let currrentSequence = sequence + 1
    if (currrentSequence == 3) {
      currrentSequence = 0
    }
    dispatch(changeSequenceAction(currrentSequence))
  }


  const changeMusic = (tag) => {
    dispatch(changeMusicAction(tag))
  }
  const handelMusic = () => {
    if (sequence === 2) {
      redioRef.current.currentTime = 0
      redioRef.current.play()
    } else {
      dispatch(changeMusicAction(1))

    }

  }
  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPalying}>
          <button className="sprite_playbar prev" onClick={e => changeMusic(-1)}></button>
          <button className="sprite_playbar play" onClick={playMusic}></button>
          <button className="sprite_playbar next" onClick={e => changeMusic(1)}></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={getSizeImage(currentSong.al && currentSong.al.picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong.ar && currentSong.ar[0].name}</span>
              <span className="song-content">{currentLyric}</span>
            </div>
            <div className="progress">
              <Slider value={currentProgress}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}

              /*  draggableTrack={true} */
              />
              <div className="time">
                <span className="now-time">{formatMinuteSecond(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatMinuteSecond(dirana) || '00:00'}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop" onClick={e => changeSequence()}></button>
            <button className="sprite_playbar btn playlist">
              {currentLength}
            </button>
          </div>
        </Operator>
      </div>
      <audio ref={redioRef} onTimeUpdate={timeUpdate} onEnded={handelMusic} />
    </PlaybarWrapper>
  )
})
