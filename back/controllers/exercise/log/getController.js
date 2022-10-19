import asyncHandler from 'express-async-handler'
import { reBuildTimes } from '../../../helper/exerciseLog.js'
import ExerciseLog from '../../../models/exerciseLogModel.js'

export const getExerciseLog = asyncHandler(async (req, res) => {
	const exerciseLog = await ExerciseLog.findById(req.params.id)
		.populate('exercise', 'name imageId')
		.lean()

	if (!exerciseLog) {
		res.status(404)
		throw new Error('Лог не найден')
	}

	const prevExerciseLogs = await ExerciseLog.find({
		user: req.user._id,
		exercise: exerciseLog._id,
	}).sort({ createdAt: 'desc' })

	const prevExLog = prevExerciseLogs[0]

	let newTimes = reBuildTimes(exerciseLog)

	if (prevExLog) newTimes = reBuildTimes(exerciseLog, prevExLog)

	res.json({
		...exerciseLog,
		times: newTimes,
	})
})
