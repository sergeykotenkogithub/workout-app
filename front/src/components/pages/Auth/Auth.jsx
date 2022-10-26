import React from 'react'
import Layout from '../../common/Layout'
import bgImage from '../../../images/auth-bg.png'
import Field from '../../ui/Field/Field'
import { useState } from 'react'
import Button from '../../ui/Button/Button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import ReactSelect from 'react-select'
import { optionColor } from '../../ui/optionColor'
import styles from './Auth.module.scss'
import Alert from '../../ui/Alert/Alert'

import { useMutation } from 'react-query'
import { $api } from '../../../api/api'
import Loader from '../../ui/Loader'
import { useAuth } from '../../../hooks/useAuth'

const Auth = () => {
	// e.preventDefault()
	// const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [type, setType] = useState('auth')

	const navigate = useNavigate()
	const { setIsAuth } = useAuth()

	const {
		mutate: register,
		isLoading,
		error,
		data,
	} = useMutation(
		'Registration',
		() =>
			$api({
				url: '/users',
				type: 'POST',
				body: { email, password },
				auth: false,
			}),
		{
			onSuccess(data) {
				localStorage.setItem('token', data.token)

				setIsAuth(true)
				setPassword('')
				setEmail('')

				navigate('/')
			},
		}
	)

	const handleSubmit = e => {
		e.preventDefault()
		if (type === 'auth') {
			console.log('Auth')
		} else {
			register()
		}
	}

	return (
		<>
			<Layout bgImage={bgImage} heading='Auth or Register' />
			<div className='wrapper-inner-page'>
				<form onSubmit={handleSubmit}>
					{error && <Alert type='error' text={error} />}
					{isLoading && <Loader />}
					<Field
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={({ target }) => setEmail(target.value)}
						required
					/>
					<Field
						type='text'
						placeholder='Enter password'
						value={password}
						onChange={({ target: { value } }) => setPassword(value)}
						required
					/>
					<div className={styles.wrapperButtons}>
						<Button text='Sign in' callback={() => setType('auth')} />
						<Button text='Sign up' callback={() => setType('reg')} />
					</div>
				</form>
			</div>
		</>
	)
}

export default Auth
