import { useState } from 'react'
import Routes from '../Routes.jsx'
import { AuthContext } from '../contexts/AuthContext'

const AppProvider = () => {
	const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'))

	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			<Routes />
		</AuthContext.Provider>
	)
}

export default AppProvider
