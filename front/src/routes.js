import Auth from './components/pages/Auth/Auth'
import Home from './components/pages/Home/Home'
import NewExercise from './components/pages/NewExercise/NewExercise'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'

export const routes = [
	{
		path: '/',
		component: Home,
		auth: false,
	},
	{
		path: '/auth',
		component: Auth,
		auth: false,
	},
	{
		path: '/new-workout',
		component: NewWorkout,
		auth: true,
	},
	{
		path: '/new-exercise',
		component: NewExercise,
		auth: true,
	},
]
