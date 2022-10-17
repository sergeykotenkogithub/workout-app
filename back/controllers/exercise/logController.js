import asyncHandler from 'express-async-handler'
import { reBuildTimes } from '../../helper/exerciseLog.js'
import ExerciseLog from '../../models/exerciseLogModel.js'

// @desc Create new exercises
// @route POST /api/exercises/log
// @access Private

export const createNewExerciseLog = asyncHandler(async (req, res) => {
	const { exerciseId, times } = req.body

	let timesArray = []

	for (let i = 0; i < times; i++) {
		timesArray.push({
			weight: 0,
			repeat: 0,
		})
	}

	const exerciseLog = await ExerciseLog.create({
		user: req.user._id,
		exercise: exerciseId,
		times: timesArray,
	})
	// res.json(true)
	res.json(exerciseLog)
})

// ............. Get

// @desc Get exercises
// @route GET /api/exercises/log/:id
// @access Private

export const getExerciseLog = asyncHandler(async (req, res) => {
	const exerciseLog = await ExerciseLog.findById(req.params.id)
		.populate('exercise', 'name imageId')
		.lean()

	const prevExerciseLogs = await ExerciseLog.find({
		user: req.user._id,
		exercise: exerciseLog._id,
	}).sort('desc')

	const prevExLog = prevExerciseLogs[0]

	let newTimes = reBuildTimes(exerciseLog)

	if (prevExLog) newTimes = reBuildTimes(exerciseLog, prevExLog)

	res.json({
		...exerciseLog,
		times: newTimes,
	})
})
