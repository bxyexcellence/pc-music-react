import React from 'react'

import Discover from '@/pages/discover';
import Friend from '@/pages/friend'
import Mine from '@/pages/mine'
import { Redirect } from 'react-router-dom';
import Recommend from '@/pages/discover/c-pages/recommend';
import Artist from '@/pages/discover/c-pages/artist'
import Album from '@/pages/discover/c-pages/album'
import Ranking from '@/pages/discover/c-pages/ranking'
import Djradio from '@/pages/discover/c-pages/djradio'
import Songs from '@/pages/discover/c-pages/songs'
import Player from '@/pages/player';

const routes = [
  {
    path: '/',
    exact: true,
    render: () => <Redirect to="/discover" />
  },
  {
    path: '/discover',
    component: Discover,
    routes:[
      {
        path: '/discover',
        exact: true,
        render: () => <Redirect to="/discover/recommend" />
      },
      {
        path:'/discover/recommend',
        component:Recommend
      },
      {
        path: '/discover/artist',
        component: Artist
      },
      {
        path: '/discover/album',
        component: Album
      },
      {
        path:'/discover/djradio',
        component:Djradio
      },
      {
        path: '/discover/ranking',
        component: Ranking
      },
      {
        path: '/discover/songs',
        component: Songs
      },
      {
        path: '/discover/player',
        component: Player
      }
    ]
  },
  {
    path: '/friend',
    exact: true,
    component: Friend
  }, 
  {
    path: '/mine',
    exact: true,
    component: Mine
  }
]

export default routes