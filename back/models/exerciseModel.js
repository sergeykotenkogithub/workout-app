import mongoose from 'mongoose'

const exerciseModel = mongoose.Schema(
	{
		name: { type: String, require: true },
		times: {
			type: Number,
			require: true,
		},
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

const Exercise = mongoose.model('Exercise', exerciseModel)

export default Exercise
