import asyncHandler from 'express-async-handler'
import Workout from '../../models/workoutModel.js'

// @desc Add new workout
// @route POST /api/workouts
// @access Private

export const addNewWorkout = asyncHandler(async (req, res) => {
	const { name, exerciseIds } = req.body

	const workout = await Workout.create({
		name,
		exercises: exerciseIds,
		require: true,
	})

	res.json(workout)
})
