import User from '../../models/userModel.js'
import asyncHandler from 'express-async-handler'
import ExerciseLog from '../../models/exerciseLogModel.js'
import WorkoutLog from '../../models/workoutLogModel.js'

// @desc Get user profile
// @route GET /api/users/profile
// @access Private

export const getUsersProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id).select('-password').lean()

	const exerciseLogByUser = await ExerciseLog.find({
		user: user._id,
		completed: true,
	})

	let countExerciseTimesCompleted = 0
	let kgs = 0

	exerciseLogByUser.forEach(log => {
		countExerciseTimesCompleted += log.times.length

		log.times.forEach(item => {
			kgs += item.weight
		})
	})

	// const minutes = Math.ceil(countExerciseTimesCompleted * 2.3)
	const minutes = (countExerciseTimesCompleted * 2.3).toFixed(2)
	const workouts = await WorkoutLog.find({
		user: user._id,
		completed: true,
	}).countDocuments()

	res.json({
		...user,
		minutes,
		workouts,
		kgs,
	})
})
