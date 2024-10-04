const tryCatch = require("../utils/tryCatch")
const prisma = require('../models')


module.exports.getAllPosts = (req, res) => {
	res.json('getAllPost')
}

module.exports.createPost = tryCatch( async (req, res) => {
	const {message } = req.body
	const data = { message, userId : req.user.id }
	const rs = await prisma.post.create({ data })
	res.json(rs)
})

module.exports.editPost = (req, res) => {
	const { id } = req.params
	
	res.json('editPost')
}

module.exports.deletePost = (req, res) => {
	const { id } = req.params

	res.json('deletePost')
}


