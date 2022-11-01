import Auth from './components/pages/Auth/Auth'
import Home from './components/pages/Home/Home'
import NewExercise from './components/pages/NewExercise/NewExercise'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'
import Profile from './components/pages/Profile/Profile'
import SingleWorkout from './components/pages/Workout/SingleWorkout'
import ListWorkout from './components/pages/Workout/ListWorkouts'
import SingleExercise from './components/pages/Exercises/SingleExercise'

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
	{
		path: '/profile',
		component: Profile,
		auth: true,
	},
	{
		path: '/workout/:id',
		component: SingleWorkout,
		auth: true,
	},
	{
		path: '/exercise/:id',
		component: SingleExercise,
		auth: true,
	},
	{
		path: '/workouts',
		component: ListWorkout,
		auth: true,
	},
]
