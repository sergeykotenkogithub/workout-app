import Exercise from '../../models/exerciseModel.js'
import asyncHandler from 'express-async-handler'

// @desc Create new exercises
// @route POST /api/exercises
// @access Private

export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, imageName } = req.body

	const exercise = await Exercise.create({
		name,
		times,
		imageName,
	})

	res.json(exercise)
})

// @desc Update exercise
// @route GET /api/exercises
// @access Private

export const updateExercise = asyncHandler(async (req, res) => {
	const { name, times, imageName, exerciseId } = req.body

	const exercise = await Exercise.findById(exerciseId)

	if (!exercise) {
		res.status(404)
		throw new Error('Данное упражнение не найдено')
	}

	exercise.name = name
	exercise.times = times
	exercise.imageName = imageName

	const updateWorkout = await exercise.save()

	res.json(updateWorkout)
})

// @desc Delete exercise
// @route GET /api/exercises
// @access Private

export const deleteExercise = asyncHandler(async (req, res) => {
	const { exerciseId } = req.body

	const exercise = await Exercise.findById(exerciseId)

	if (!exercise) {
		res.status(404)
		throw new Error('Данное упражнение не найдено')
	}

	await exercise.remove()

	res.json({ message: 'Упражнение удалено' })
})

// @desc Get exercises
// @route GET /api/exercises
// @access Private

export const getExercises = asyncHandler(async (req, res) => {
	const exercise = await Exercise.find({})
	res.json(exercise)
})
