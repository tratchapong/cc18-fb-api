const prisma = require('../models')
const bcrypt = require('bcryptjs')
const createError = require('../utils/createError')
const tryCatch = require('../utils/tryCatch')

module.exports.register = tryCatch(async (req,res) => {
	const { identity,firstName, lastName, password, confirmPassword } = req.body
	// validation
	if( !(identity.trim() && firstName.trim() && lastName && password && confirmPassword) ) {
		createError(400, "Please fill all data")
	}

	if(password !== confirmPassword) {
		createError(400,"check confirm Password")
	}
	// check identity is mobile or email
	let identityKey = ''
	if(/^[0-9]{10,15}$/.test(identity)) {
		identityKey = 'mobile'
	}
	if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(identity)) {
		identityKey = 'email'
	}
	if(!identityKey) {
		createError(400, 'only email or phone number')
	}

	// check if already email / mobile in User data

	const findIdentity = await prisma.user.findUnique({
		where : { [identityKey] : identity}
	})

	if(findIdentity) {
		createError(409,`Already have this ${identityKey}`)
	}

	// create user in db
	const hashedPassword = await bcrypt.hash(password,10)

	const newUser = {
		[identityKey] : identity,
		password : hashedPassword,
		firstName,
		lastName
	}

	const result = await prisma.user.create({data: newUser})

	res.json({msg: 'Register successful', result})
})





module.exports.login = tryCatch(async (req, res) => {
	res.json('Login Controller')
})

module.exports.getMe = tryCatch(async (req, res) => {
	const rs = await prisma.user.findMany()
	console.log(rs)
	res.json({result : rs})
})