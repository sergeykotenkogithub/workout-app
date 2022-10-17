import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const workoutLogModel = mongoose.Schema(
	{
		user: {
			type: ObjectId,
			ref: 'User',
			require: true,
		},
		workout: {
			type: ObjectId,
			ref: 'Workout',
			require: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{
		minimize: false,
		timestamps: true,
	}
)

const WorkoutLog = mongoose.model('WorkoutLog', workoutLogModel)

export default WorkoutLog
