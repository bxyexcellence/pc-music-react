import React, { memo } from 'react'
import { PlayerLeft, PlayerRight, PlayerWrapper } from './style'
import PlayerInfo from './c-cpns/player-info'
import PlayerComment from './c-cpns/player-comment'
import PlayerSongs from './c-cpns/player-songs'
import PlayRelevant from './c-cpns/player-relevant'
export default memo(function Player() {
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <PlayerInfo />
          <PlayerComment />
        </PlayerLeft>
        <PlayerRight>
          <PlayerSongs />
          <PlayRelevant />
          
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
})
