import React, { Fragment } from 'react'
import Layout from '../../common/Layout'

import bgImage from '../../../images/home-bg.jpg'

import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Layout.module.scss'

import { useMutation, useQuery } from 'react-query'
import { $api } from '../../../api/api'
import Header from '../../common/Header/Header'

import Counters from '../../ui/Counters/Counters'
import { Link, useNavigate, useParams } from 'react-router-dom'

import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader'

const SingleWorkout = () => {
	const { id } = useParams()

	const navigate = useNavigate()

	const { data, isSuccess } = useQuery(
		'get workout',
		() =>
			$api({
				url: `/workouts/${id}`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const {
		mutate,
		isLoading,
		isSuccess: isSuccessMutate,
		error,
	} = useMutation(
		'Create new ex log',
		({ exId, times }) =>
			$api({
				url: '/exercises/log',
				type: 'POST',
				body: { exerciseId: exId, times },
			}),
		{
			onSuccess(data) {
				navigate(`/exercise/${data._id}`)
			},
		}
	)

	return (
		<>
			<div
				className={`${stylesLayout.wrapper} ${stylesLayout.otherPage} single-workout`}
				style={{
					backgroundImage: `url(${bgImage})`,
					height: 356,
					backgroundPosition: 'inherit',
				}}
			>
				<Header />

				{isSuccess && (
					<div>
						<time className={styles.tme}>{data.minutes + ' min.'}</time>
						<h1 className={stylesLayout.heading}>{data.name}</h1>
					</div>
				)}
			</div>
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				{error && <Alert type='error' text={error} />}
				{isSuccessMutate && <Alert type='info' text='Exercise log created' />}
				{isLoading && <Loader />}
				{isSuccess ? (
					<div className={styles.wrapper}>
						{data.exercises.map((ex, idx) => {
							return (
								<Fragment key={`ex ${idx}`}>
									<div className={styles.item}>
										<button
											aria-label='Move to exercise'
											onClick={() =>
												mutate({
													exId: ex._id,
													times: ex.times,
												})
											}
										>
											<span>{ex.name}</span>
											<img
												src={`/uploads/exercises/${ex.imageName}.svg`}
												height='34'
												alt=''
												draggable={false}
											/>
										</button>
									</div>
									{idx % 2 !== 0 && idx !== data.exerciseLogs.length - 1 && (
										<div className={styles.line}></div>
									)}
								</Fragment>
							)
						})}
					</div>
				) : (
					<Alert type='warning' text='Exercises not found' />
				)}
			</div>
		</>
	)
}

export default SingleWorkout
