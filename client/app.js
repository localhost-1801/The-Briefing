import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {RadarChart} from './components'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <RadarChart />
    </div>
  )
}

export default App
