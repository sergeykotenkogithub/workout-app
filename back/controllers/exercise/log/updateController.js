import asyncHandler from 'express-async-handler'
import ExerciseLog from '../../../models/exerciseLogModel.js'

// @desc Update new exercises
// @route PUT /api/exercises/log
// @access Private

export const updateExerciseLog = asyncHandler(async (req, res) => {
	const { logId, timeIndex, key, value } = req.body

	const currentLog = await ExerciseLog.findById(logId)

	if (!currentLog) {
		res.status(404)
		throw new Error('Данный лог не найден')
	}

	let newTimes = currentLog.times

	if (!timeIndex || !key || !value) {
		res.status(404)
		throw new Error('Вы не указали все поля!')
	}

	newTimes[timeIndex][key] = value

	currentLog.times = newTimes

	const updateLog = await currentLog.save()

	res.json(updateLog)
})

// ............. Get

// @desc Get exercises
// @route GET /api/exercises/log/:id
// @access Private
