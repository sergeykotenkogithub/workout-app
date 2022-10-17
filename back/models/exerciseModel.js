import mongoose from 'mongoose'

const exerciseModel = mongoose.Schema(
	{
		name: { type: String, require: true },
		times: {
			type: Number,
			require: true,
		},
		imageIdx: {
			type: Number,
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
