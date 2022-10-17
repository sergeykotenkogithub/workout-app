import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const workoutLogSchema = mongoose.Schema(
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
			default: true,
		},
	},
	{
		minimize: false,
		timestamps: true,
	}
)

const WorkoutLog = mongoose.model('WorkoutLog', workoutLogSchema)

export default WorkoutLog
