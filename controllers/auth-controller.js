const prisma = require('../models')
const tryCatch = require('../utils/tryCatch')

module.exports.register = (req,res) => {
	res.json('Register Controller...')
}

module.exports.login = (req, res) => {
	res.json('Login Controller')
}

module.exports.getMe = tryCatch(async (req, res) => {
	const rs = await prisma.user.findMany()
	console.log(rs)
	res.json({result : rs})
})