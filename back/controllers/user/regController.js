import User from '../../models/userModel.js'
import expressAsync from 'express-async-handler'
import { generateToken } from '../../helper/generateToken.js'

// @desc Register user
// @route POST /api/users
// @access Public

export const registerUser = expressAsync(async (req, res) => {
	const { email, password } = req.body

	const isExistUser = await User.findOne({ email })

	if (isExistUser) {
		res.status(400)
		throw new Error('Пользовать уже зарегистрирован')
	}

	const user = await User.create({
		email,
		password,
	})

	const token = generateToken(user._id)

	res.json({ user, token })
})
