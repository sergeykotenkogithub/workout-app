import mongoose from 'mongoose'

export const connectDB = async () => {
	try {
		const conc = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		})
		console.log(`MongoDB Connected ${conc.connection.host}`.cyan.underline)
	} catch (error) {
		console.error(`Error: ${error.message}`.red.underline.bold)
		process.exit(1)
	}
}
