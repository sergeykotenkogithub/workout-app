import React, { Fragment } from 'react'
import Layout from '../../common/Layout'

import bgImage from '../../../images/home-bg.jpg'

import styles from './SingleWorkout.module.scss'
import stylesLayout from '../../common/Layout.module.scss'

import { useQuery } from 'react-query'
import { $api } from '../../../api/api'
import Header from '../../common/Header/Header'

import Counters from '../../ui/Counters/Counters'
import { Link, useParams } from 'react-router-dom'

import Alert from '../../ui/Alert/Alert'

const SingleWorkout = () => {
	const { id } = useParams()

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
				{isSuccess ? (
					<div className={styles.wrapper}>
						{data.exercises.map((ex, idx) => {
							return (
								<Fragment key={`ex ${idx}`}>
									<div className={styles.item}>
										<Link to={`/exercises/${ex._id}`}>
											<span>{ex.name}</span>
											<img
												src={`/uploads/exercises/${ex.imageName}.svg`}
												height='34'
												alt=''
												draggable={false}
											/>
										</Link>
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
