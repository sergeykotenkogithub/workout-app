import User from '../../models/userModel.js'
import expressAsync from 'express-async-handler'
import { generateToken } from '../../helper/generateToken.js'

// @desc Auth user
// @route POST /api/users/login
// @access Public

export const authUser = expressAsync(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email })

	if (user && (await user.matchPassword(password))) {
		const token = generateToken(user._id)
		res.json({ user, token })
	} else {
		res.status(401)
		throw new Error('Неправильный email или пароль')
	}
})
