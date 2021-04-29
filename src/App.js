import React, { memo } from 'react'

import { renderRoutes } from 'react-router-config'
import routes from './router'
import { BrowserRouter } from 'react-router-dom'



import AppHeader from 'components/app-header'
import AppFooter from 'components/app-footer'
import { Provider } from 'react-redux'
import store from './store'
import AppPlayerBar from './pages/player/app-player-bar'



export default memo(function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppHeader />
        {renderRoutes(routes)}
        <AppFooter />
        <AppPlayerBar />
      </BrowserRouter>
    </Provider>
    
  )
})
