import React, { Fragment, useEffect, useState } from 'react'
import Layout from '../../common/Layout'

import bgImage1 from '../../../images/ex-bg-1.jpg'
import bgImage2 from '../../../images/ex-bg-2.jpg'

import checkCompletedImage from '../../../images/exercises/check-completed.svg'
import checkImage from '../../../images/exercises/check.svg'

import styles from './SingleExercise.module.scss'
import stylesLayout from '../../common/Layout.module.scss'

import { useMutation, useQuery } from 'react-query'
import { $api } from '../../../api/api'
import Header from '../../common/Header/Header'

import { useParams } from 'react-router-dom'

import Alert from '../../ui/Alert/Alert'

import cn from 'classnames'

const getRandomInt = (min, max) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const SingleExercise = () => {
	const { id } = useParams()

	const [bgImage, setBgImage] = useState(bgImage1)

	const { data, isSuccess, refetch } = useQuery(
		'get exercise log',
		() =>
			$api({
				url: `/exercises/log/${id}`,
			}),
		{
			refetchOnWindowFocus: false,
		}
	)

	const { mutate: changeState, error: errorChange } = useMutation(
		'Change log state',
		({ timeIndex, key, value }) =>
			$api({
				url: '/exercises/log',
				type: 'PUT',
				body: { timeIndex, key, value, logId: id },
				auth: false,
			}),
		{
			onSuccess(data) {
				refetch()
			},
		}
	)

	useEffect(() => {
		setBgImage(getRandomInt(1, 2) === 1 ? bgImage1 : bgImage2)
	}, [])

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
					<div className={styles.heading}>
						<img
							src={`/uploads/exercises/${data.exercise.imageName}.svg`}
							height='34'
							alt={data.exercise.name}
							draggable={false}
						/>
						<h1 className={stylesLayout.heading}>{data.exercise.name}</h1>
					</div>
				)}
			</div>
			<div
				className='wrapper-inner-page'
				style={{ paddingLeft: 0, paddingRight: 0 }}
			>
				<div style={{ width: '90%', margin: '0 auto' }}>
					{errorChange && <Alert type='error' text={errorChange} />}
				</div>

				{isSuccess ? (
					<div className={styles.wrapper}>
						<div className={styles.row}>
							<div>
								<span>Previous</span>
							</div>
							<div>
								<span>Repeat & Weight</span>
							</div>
							<div>
								<span>Completed</span>
							</div>
						</div>
						{data.times.map((item, idx) => (
							<div
								className={cn(styles.row, {
									[styles.completed]: item.completed,
								})}
								key={`time ${idx}`}
							>
								<div className={styles.opacity}>
									<input
										type='number'
										defaultValue={item.prevWeight}
										disabled
									/>
									<i>kg{item.completed ? '' : ' '}/</i>
									<input
										type='number'
										defaultValue={item.prevRepeat}
										disabled
									/>
								</div>
								<div>
									<input
										type='number'
										defaultValue={item.weight}
										onChange={e =>
											e.target.value &&
											changeState({
												timeIndex: idx,
												key: 'weight',
												value: e.target.value,
											})
										}
										disabled={item.completed}
									/>
									<i>kg /</i>
									<input
										type='number'
										defaultValue={item.repeat}
										onChange={e =>
											e.target.value &&
											changeState({
												timeIndex: idx,
												key: 'repeat',
												value: e.target.value,
											})
										}
										disabled={item.completed}
									/>
								</div>
								<div>
									<img
										src={item.completed ? checkCompletedImage : checkImage}
										className={styles.checkbox}
										alt=''
										onClick={() =>
											changeState({
												timeIndex: idx,
												key: 'completed',
												value: !item.completed,
											})
										}
									/>
								</div>
							</div>
						))}
					</div>
				) : (
					<Alert type='warning' text='Times not found' />
				)}
			</div>
		</>
	)
}

export default SingleExercise
