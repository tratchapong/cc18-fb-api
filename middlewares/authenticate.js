const createError = require("../utils/createError");
const tryCatch = require("../utils/tryCatch");
const jwt = require('jsonwebtoken')
const prisma = require('../models')


module.exports = tryCatch(async (req, res, next) => {
	const authorization = req.headers.authorization
	if(!authorization || !authorization.startsWith('Bearer ') ){
		createError(401, 'Unauthorized 1')
	} 
	const token = authorization.split(' ')[1]
	if(!token){
		createError(401, 'Unauthorized')
	} 

	const payload = jwt.verify(token, process.env.JWT_SECRET)

	const foundUser = await prisma.user.findUnique( { where : {id: payload.id}})
	if(!foundUser) {
		createError(401, 'Unauthorized')
	}
	// delete foundUser.password
	const { password , createdAt, updatedAt, ...userData } = foundUser
	req.user = userData
	next()
})