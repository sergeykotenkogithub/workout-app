import React from 'react'
import Layout from '../../common/Layout'
import bgImage from '../../../images/new-workout-bg.jpg'
import Field from '../../ui/Field/Field'
import { useState } from 'react'
import Button from '../../ui/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import ReactSelect from 'react-select'
import { optionColor } from '../../ui/optionColor'

const NewWorkout = () => {
	// const navigate = useNavigate()
	const [name, setName] = useState('')
	const [exercises, setExercises] = useState([])

	const handleSubmit = () => {}

	return (
		<>
			<Layout bgImage={bgImage} heading='Create new workout' />
			<div className='wrapper-inner-page'>
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
					<ReactSelect
						classNamePrefix='select2-selection'
						placeholder='Exercises'
						title='Exercises'
						options={[
							{ value: 'sad', label: 'Push-ups' },
							{ value: 'wawda', label: 'Pull-ups' },
						]}
						value={exercises}
						onChange={setExercises}
						isMulti={true}
					/>
					<Button text='Create' callback={() => {}} />
				</form>
			</div>
		</>
	)
}

export default NewWorkout
