import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {KeywordBox} from './components'


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <KeywordBox />
    </div>
  )
}

export default App
