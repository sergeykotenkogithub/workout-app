import React from 'react'
import Hamburger from './Hamburger/Hamburger'
import styles from './Header.module.scss'

import userImage from '../../../images/header/user.svg'
import arrowImage from '../../../images/header/arrow.svg'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
	const location = useLocation()
	const navigate = useNavigate()
	return (
		<header className={styles.header}>
			{location.pathname !== '/' ? (
				<button type='button' onClick={() => navigate(-1)}>
					<img src={arrowImage} alt='Auth' />
				</button>
			) : (
				<button type='button' onClick={() => navigate('/auth')}>
					<img src={userImage} alt='Auth' />
				</button>
			)}
			<Hamburger />
		</header>
	)
}

export default Header
