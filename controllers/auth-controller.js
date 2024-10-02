const prisma = require('../models')
const createError = require('../utils/createError')
const tryCatch = require('../utils/tryCatch')

module.exports.register = tryCatch(async (req,res) => {
	const { identity,firstName, lastName, password, confirmPassword } = req.body
	// validation
	if( !(identity.trim() && firstName.trim() && lastName && password && confirmPassword) ) {
		throw(createError(400, "Please fill all data"))
	}

	if(password !== confirmPassword) {
		throw(createError(400,"check confirm Password"))
	}
	res.json('Register Controller...')
})



module.exports.login = tryCatch(async (req, res) => {
	res.json('Login Controller')
})

module.exports.getMe = tryCatch(async (req, res) => {
	const rs = await prisma.user.findMany()
	console.log(rs)
	res.json({result : rs})
})