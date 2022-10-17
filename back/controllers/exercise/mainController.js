import Exercise from '../../models/exerciseModel.js'
import asyncHandler from 'express-async-handler'

// @desc Create new exercises
// @route POST /api/exercises
// @access Private

export const createNewExercise = asyncHandler(async (req, res) => {
	const { name, times, imageId } = req.body

	const exercise = await Exercise.create({
		name,
		times,
		imageId,
	})

	res.json(exercise)
})
