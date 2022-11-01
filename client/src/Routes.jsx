import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Error404 from './components/pages/404.jsx'
import { useAuth } from './hooks/useAuth.js'
import { routes } from './routes.js'

const App = () => {
	const { isAuth } = useAuth()
	return (
		<Router>
			<Routes>
				{routes.map(route => {
					if (route.auth && !isAuth) {
						return false
					}
					return (
						<Route
							path={route.path}
							element={<route.component />}
							key={route.component}
						/>
					)
				})}
				<Route path='*' element={<Error404 />} />
			</Routes>
		</Router>
	)
}

export default App
