import React from 'react'
import Layout from '../../common/Layout'
import bgImage from '../../../images/new-workout-bg.jpg'
import Field from '../../ui/Field/Field'
import { useState } from 'react'
import Button from '../../ui/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import ReactSelect from 'react-select'
import { optionColor } from '../../ui/optionColor'
import { $api } from '../../../api/api'
import { useMutation, useQuery } from 'react-query'
import Alert from '../../ui/Alert/Alert'
import Loader from '../../ui/Loader'

const NewWorkout = () => {
	// const navigate = useNavigate()
	const [name, setName] = useState('')
	const [exercisesCurrent, setExercisesCurrent] = useState([])

	const { data, isSuccess } = useQuery(
		'list exercises',
		() =>
			$api({
				url: '/exercises',
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
		'Create new workout',
		({ exIds }) =>
			$api({
				url: '/workouts',
				type: 'POST',
				body: { name, exerciseIds: exIds },
			}),
		{
			onSuccess() {
				setName('')
				setExercisesCurrent([])
			},
		}
	)

	const handleSubmit = e => {
		e.preventDefault()

		const exIds = exercisesCurrent.map(ex => ex.value)

		mutate({
			exIds,
		})

		console.log(exIds)
	}

	return (
		<>
			<Layout bgImage={bgImage} heading='Create new workout' />
			<div className='wrapper-inner-page'>
				{error && <Alert type='error' text={error} />}
				{isSuccessMutate && <Alert type='info' text='Workout created' />}
				{isLoading && <Loader />}
				<form onSubmit={handleSubmit}>
					<Field
						type='text'
						placeholder='Enter name'
						value={name}
						onChange={({ target }) => setName(target.value)}
						required
					/>
					<Link to='/new-exercise' className='dark-link'>
						Add New exercise
					</Link>
					{isSuccess && data && (
						<ReactSelect
							classNamePrefix='select2-selection'
							placeholder='Exercises'
							title='Exercises'
							options={data.map(ex => ({
								value: ex._id,
								label: ex.name,
							}))}
							value={exercisesCurrent}
							onChange={setExercisesCurrent}
							isMulti={true}
						/>
					)}
					<Button text='Create' callback={() => {}} />
				</form>
			</div>
		</>
	)
}

export default NewWorkout
