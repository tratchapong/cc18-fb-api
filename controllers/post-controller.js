const tryCatch = require("../utils/tryCatch")
const prisma = require('../models')


module.exports.getAllPosts = tryCatch( async (req,res) => {
	const rs = await prisma.post.findMany({
		orderBy : {createdAt : 'desc'},
		include : {
			user : { 
				select : {
					firstName : true, lastName : true, profileImage : true
				}
			},
		}	
	})
	res.json({posts : rs})
})

module.exports.createPost = tryCatch( async (req, res) => {
	const {message } = req.body
	console.log(req.file)
	// const data = { message, userId : req.user.id }
	// const rs = await prisma.post.create({ data })
	res.json(message)
})

module.exports.editPost = (req, res) => {
	const { id } = req.params
	
	res.json('editPost')
}

module.exports.deletePost = (req, res) => {
	const { id } = req.params

	res.json('deletePost')
}


