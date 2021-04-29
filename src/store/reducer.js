import { combineReducers } from "redux-immutable"

import { reducer as recommendReducer } from '@/pages/discover/c-pages/recommend/store/inedx'
import { reducer as playerReducer } from '../pages/player/store/index'
import {reducer as rankingReducer} from '../pages/discover/c-pages/ranking/store/index'


const cReducer = combineReducers({
  recommend:recommendReducer,
  player: playerReducer,
  ranking: rankingReducer
})

export default cReducer