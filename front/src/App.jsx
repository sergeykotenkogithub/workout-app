import React from 'react'
import Home from './components/pages/Home/Home'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/new-workout' element={<NewWorkout />} />
			</Routes>
		</Router>
	)
}

export default App
