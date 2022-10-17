import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema

const workoutModel = mongoose.Schema(
	{
		name: { type: String, require: true },
		exercises: [
			{
				type: ObjectId,
				ref: 'Exercise',
			},
		],
		images: {
			type: String,
			require: true,
		},
	},
	{
		minimize: false,
		timestamps: true,
	}
)

const Workout = mongoose.model('Workout', workoutModel)

export default Workout
