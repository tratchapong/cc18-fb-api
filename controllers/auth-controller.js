const prisma = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const createError = require('../utils/createError')
const tryCatch = require('../utils/tryCatch')

function checkEmailorPhone(identity) {
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
	return identityKey
}

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
	const identityKey = checkEmailorPhone(identity)

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
	const {identity, password} = req.body

	// validation
	if( !(identity.trim() && password.trim()) ) {
		createError(400, "Please fill all data")
	}
	// check identity is mobile or email
	const identityKey = checkEmailorPhone(identity)
	// find user 

	const findUser = await prisma.user.findUnique({
		where : { [identityKey] : identity }
	})
	console.log(findUser)
	if(!findUser) {
		createError(401,'invalid login')
	}
	// check password

	let pwOk = await bcrypt.compare(password, findUser.password)
	if(!pwOk) {
		createError(401,'invalid login')
	}

	const payload = {
		id: findUser.id
	}
	const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn : '30d'})	
	const { password : pw, createdAt, updatedAt, ...userData } = findUser
	res.json({token : token, user: userData})
})

module.exports.getMe = tryCatch(async (req, res) => {
	res.json({user : req.user})
})