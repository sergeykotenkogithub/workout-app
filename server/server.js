import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import color from 'colors'
import path from 'path'

// Router
import userRoutes from './router/userRoutes.js'
import exerciseRoutes from './router/exerciseRoutes.js'
import workoutRoutes from './router/workoutRoutes.js'

// Config
import { connectDB } from './config/db.js'
// Middleware
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

dotenv.config()
connectDB()
const app = express()

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'))
}

app.use(express.json())

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

app.use('/api/users', userRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/workouts', workoutRoutes)

if (process.env.NODE_ENV === 'production') {
	// Step 1:
	app.use(express.static(path.resolve(__dirname, './client/build')))
	// Step 2:
	app.get('*', function (request, response) {
		response.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
	})
}

// app.use(notFound)
// app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`on prt ${PORT}`.yellow)
})
